$(document).ready(function () {
    //Set height of view
    document.getElementById("pcoded").style.height = "fit-content";
    $('#spinner').hide();
    var firebaseConfig;
    $.ajax({
        type: "POST",
        url: "/config/get-firebase",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        async: false,
    })
        .done(function (response) {
            firebaseConfig = {
                apiKey: response.apiKey,
                authDomain: response.authDomain,
                databaseURL: response.databaseURL,
                projectId: response.projectId,
                storageBucket: response.storageBucket,
                messagingSenderId: response.measurementId,
                appId: response.appId,
                measurementId: response.measurementId
            };
        })
        .fail(function () {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error from server, or request time out!',
            })
            return;
        }); 

    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    load.init();
});
var indexTable;
var load = {
    init: function () {
        load.eventDetail();
        load.updateEvent();
        load.clickUpdateButton();
        load.deleteEvent();
        load.clickAddButton();
        load.parseTimeSlot();
        load.loadTimeSlot();
        load.parseTimeSlotUpdate;
        load.parseStatus();
    },
    eventDetail: function () {
        $("#new-cons").delegate("tbody tr td .btn-details", "click", function (e) {
            var table = $('#new-cons').DataTable();
            indexTable = table.row($(this).parents('tr'));
            e.preventDefault();
            var id = $(this).data('id');
            $.ajax({
                url: "/manage-mystore/details/" + id,
                dataType: "json",
                beforeSend: function () { $('#spinner').show(); },
                contentType: "application/json;charset=utf-8",
                async: true,
            })
                .done(function (response) {
                    $('#spinner').hide();
                    if (response == null) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Error from server, or request time out!',
                        })
                        return;
                    } else {
                        $("#imageResult").attr("src", "http://maps.gstatic.com/tactile/pane/default_geocode-2x.png");
                        $('#file_input').val("Choose file to update");
                        $('#upload').val(null);
                        var dateCreate = new Date(response.createDate);
                        $('#info-create-date').val(dateCreate.toLocaleString());
                        $('#info-name').val(response.name);
                        $('#info-address').val(response.address);
                        $('#info-ability').val(response.abilityToServe);
                        $("#imageResult").attr("src", response.imageUrl);
                        $('#time-slot-1').prop('checked', false);
                        $('#time-slot-2').prop('checked', false);
                        $('#time-slot-3').prop('checked', false);
                        $('#time-slot-4').prop('checked', false);
                        load.parseTimeSlot(response.timeSlot);
                        $('#btn-update').attr('data-id', response.id);
                        $('#btn-update').attr('disabled', true);
                    }
                })
                .fail(function () {
                    $('#spinner').hide();
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error from server, or request time out!',
                    })
                    return;
                });
        });
    },
    updateEvent: function () {
        $(".update-info").change(function () {
            $('#btn-update').attr('disabled', false);
        });
        $(".update-info").keyup(function () {
            $('#btn-update').attr('disabled', false);
        });
    },
    parseStatus: function (status) {
        if (status == 3) {
            return '<div class="label-main col-sm-8"><label class="label label-warning" style="width: 90%">Waiting Approval</label></div>';
        }
        else {
            return '<div class="label-main col-sm-8"><label class="label label-success" style="width: 90%">Surveyed</label></div>';
        }
    },
    deleteEvent: function () {
        $("#new-cons").delegate("tbody tr td .btn-delete", "click", function (e) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#28e1bd',
                cancelButtonColor: '#757575',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    e.preventDefault();
                    var id = $(this).data('id');
                    $.ajax({
                        type: "DELETE",
                        url: "/manage-mystore/delete/" + id,
                        beforeSend: function () { $('#spinner').show(); },
                        dataType: "json",
                        contentType: "application/json;charset=utf-8",
                        async: true,
                    })
                        .done(function (response) {
                            $('#spinner').hide();
                            if (response == null) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Error from server, or request time out!',
                                })
                                return;
                            } else {
                                var table = $('#new-cons').DataTable();
                                var data = table
                                    .row($(e.currentTarget).parents('tr')).data();

                                table
                                    .row($(e.currentTarget).parents('tr')).data([
                                        data[0],
                                        data[1],
                                        data[2],
                                        data[3],
                                        load.parseStatus(response.status),
                                        data[5]
                                    ]).draw(false);
                                Swal.fire(
                                    'Success!',
                                    'The store has been switched to awaited approval, and you must be approved by the administrator before it can be deleted!!!',
                                    'success'
                                );
                            }
                        })
                        .fail(function () {
                            $('#spinner').hide();
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Error from server, or request time out!',
                            })
                            return;
                        });
                }
            });
        });
    },
    clickUpdateButton: function () {
        $(document).on('submit', '#form-update', function () {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#28e1bd',
                cancelButtonColor: '#d757575',
                confirmButtonText: 'Yes, update it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    var ref = firebase.storage().ref();
                    const file = document.querySelector("#upload").files[0];
                    if (document.querySelector("#upload").files[0] != undefined) {
                        const name = +new Date() + "-" + file.name;
                        const metadata = {
                            contentType: file.type
                        };
                        const task = ref.child(name).put(file, metadata);
                        task.on(
                            firebase.storage.TaskEvent.STATE_CHANGED,
                            function (snapshot) {
                                $('#spinner').show();
                                switch (snapshot.state) {
                                    case firebase.storage.TaskState.PAUSED:
                                        break;
                                    case firebase.storage.TaskState.RUNNING:
                                        $('#spinner').show();
                                        break;
                                };
                            },
                            function (error) {
                                switch (error.code) {
                                    case 'storage/unauthorized':
                                        $('#spinner').hide();
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'Error from server, or request time out!',
                                        })
                                        break;
                                    case 'storage/canceled':
                                        $('#spinner').hide();
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'Error from server, or request time out!',
                                        })
                                        break;

                                    case 'storage/unknown':
                                        $('#spinner').hide();
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'Error from server, or request time out!',
                                        })
                                        break;
                                }
                            },
                            function () {
                                task.snapshot.ref.getDownloadURL().then(function (url) {
                                    load.updateSubmit(url);
                                });

                            }

                        );
                    } else {
                        load.updateSubmit("");
                    }
                }
            });
        });
    },
    clickAddButton: function () {
        

        $(document).on('submit', '#form-add', function () {
            //Check map location is choose 
            let mapLocation = document.getElementById("mapLocation");
            if (mapLocation.innerHTML == "Choose location on map") {
                document.getElementById("locationPickInput-error").style.display = 'block';
                return false;
            }
            //Check success
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#28e1bd',
                cancelButtonColor: '#d757575',
                confirmButtonText: 'Yes, add it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    //Hide the danger if have
                    document.getElementById("locationPickInput-error").style.display = 'none';
                    //Set the default value for Map pick
                    mapLocation.innerHTML == "Choose location on map";
                    var ref = firebase.storage().ref();
                    const file = document.querySelector("#upload-add").files[0];
                    if (document.querySelector("#upload-add").files[0] != undefined) {
                        const name = +new Date() + "-" + file.name;
                        const metadata = {
                            contentType: file.type
                        };
                        const task = ref.child(name).put(file, metadata);
                        task.on(
                            firebase.storage.TaskEvent.STATE_CHANGED,
                            function (snapshot) {
                                $('#spinner').show();
                                switch (snapshot.state) {
                                    case firebase.storage.TaskState.PAUSED:
                                        break;
                                    case firebase.storage.TaskState.RUNNING:
                                        $('#spinner').show();
                                        break;
                                };
                            },
                            function (error) {
                                switch (error.code) {
                                    case 'storage/unauthorized':
                                        $('#spinner').hide();
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'Error from server, or request time out!',
                                        })
                                        break;
                                    case 'storage/canceled':
                                        $('#spinner').hide();
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'Error from server, or request time out!',
                                        })
                                        break;

                                    case 'storage/unknown':
                                        $('#spinner').hide();
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'Error from server, or request time out!',
                                        })
                                        break;
                                }
                            },
                            function () {
                                task.snapshot.ref.getDownloadURL().then(function (url) {
                                    load.addSubmit(url);
                                });

                            }

                        );
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Image cannot be empty!!!',
                        })
                        return;
                    }
                }
            });
        });
    },
    parseTimeSlot: function (data) {
        if (data == null) return "";

        var res = data.toString().split("");
        if (res[0] == "1") {
            $('#time-slot-1').prop('checked', true);
        }
        if (res[1] == "1") {
            $('#time-slot-2').prop('checked', true);
        }
        if (res[2] == "1") {
            $('#time-slot-3').prop('checked', true);
        }
        if (res[3] == "1") {
            $('#time-slot-4').prop('checked', true);
        }
    },
    loadTimeSlot: function (data) {
        if (data == null) return "";
        //if (data.length < 4) return "";
        var results = "";
        var res = data.toString().split("");
        if (res[0] == "1") {
            results = results + '<label class="label label-success">0-6h</label>';
        }
        if (res[1] == "1") {
            results = results + '<label class="label label-success">0-12h</label>';
        }
        if (res[2] == "1") {
            results = results + '<label class="label label-success">12-18h</label>';
        }
        if (res[3] == "1") {
            results = results + '<label class="label label-success">18-0h</label>';
        }
        return results;
    },
    updateSubmit: function (url) {
        var id = $('#btn-update').attr('data-id');
        var name = $('#info-name').val();
        var timeslot = load.parseTimeSlotUpdate($('#time-slot-1').is(":checked"), $('#time-slot-2').is(":checked"), $('#time-slot-3').is(":checked"), $('#time-slot-4').is(":checked"));
        var ability = $('#info-ability').val();
        var address = $('#info-address').val();
        $.ajax({
            type: "PUT",
            url: "/manage-mystore/update/" + id,
            data: JSON.stringify({
                Name: name,
                Address: address,
                ImageUrl: url,
                AbilityToServe: ability,
                TimeSlot: timeslot
            }),
            beforeSend: function () { $('#spinner').show(); },
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            async: true,
        })
            .done(function (response) {
                $('#spinner').hide();
                if (response == null) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error from server, or request time out!',
                    })
                    return;
                }
                else {
                    var data = indexTable.data();
                    indexTable.data([
                        data[0],
                        response.name,
                        load.loadTimeSlot(response.timeSlot),
                        response.address,
                        data[4],
                        data[5]
                    ]).draw(false);
                    Swal.fire(
                        'Updated!',
                        'This store has been updated.',
                        'success'
                    );
                    $('#close-update').click();
                }
            })
            .fail(function () {
                $('#spinner').hide();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error from server, or request time out!',
                })
                return;
            });
    },
    addSubmit: function (url) {
        var name = $('#add-name').val();
        var timeslot = load.parseTimeSlotUpdate($('#add-time-slot-1').is(":checked"), $('#add-time-slot-2').is(":checked"), $('#add-time-slot-3').is(":checked"), $('#add-time-slot-4').is(":checked"));
        console.log(timeslot);
        var ability = $('#add-ability').val();
        var address = $('#add-address').val();
        let coor = document.getElementById("wkt").value;
        coor = coor.substring(coor.indexOf("(") + 1, coor.indexOf(")"));
        $.ajax({
            type: "POST",
            url: "/manage-mystore/insert/",
            data: JSON.stringify({
                Name: name,
                Address: address,
                CoordinateString: coor,
                ImageUrl: url,
                AbilityToServe: ability,
                TimeSlot: timeslot
            }),
            beforeSend: function () { $('#spinner').show(); },
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            async: true,
        })
            .done(function (response) {
                $('#spinner').hide();
                if (response == null) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error from server, or request time out!',
                    })
                    return;
                }
                else {
                    var t = $('#new-cons').DataTable();
                    let view = [];
                    view.push();
                    view.push(response.geom.coordinates[0]);
                    let rowNode = t.row.add([
                        "",
                        response.name,
                        load.loadTimeSlot(response.timeSlot),
                        response.address,
                        load.parseStatus(response.status),
                        '<div class="btn-group btn-group-md" style="float: none;">'
                        + '<button class="btn-details btn btn-primary waves-effect waves-light" data-toggle="modal" data-target="#store-details" data-id=" '
                        + response.id
                        + '" style="float: none;margin: 5px;" onclick="LoadStoreLocationOnMapAgain(\''
                        + response.geom.coordinates[1]
                        + '\', \'' + response.geom.coordinates[0] + '\'' 
                        + ')"><span class="icofont icofont-ui-edit"></span> Details</button>'
                        + '<button class="btn-delete btn btn-danger waves-effect waves-light" data-id="'
                        + response.id
                        + '" style="float: none;margin: 5px;"><span class="icofont icofont-ui-delete"></span> Delete</button></div>'
                    ], 0).draw(false).node();
                    $(rowNode).find('td').eq(0).addClass('text-center');
                    $(rowNode).find('td').eq(0).css('vertical-align', 'middle');
                    $(rowNode).find('td').eq(1).addClass('text-center');
                    $(rowNode).find('td').eq(1).css('vertical-align', 'middle');
                    $(rowNode).find('td').eq(2).addClass('text-center');
                    $(rowNode).find('td').eq(2).css('vertical-align', 'middle');
                    $(rowNode).find('td').eq(3).css('vertical-align', 'middle');
                    $(rowNode).find('td').eq(3).addClass('text-center');
                    $(rowNode).find('td').eq(4).addClass('text-center');
                    $(rowNode).find('td').eq(4).css('vertical-align', 'middle');
                    $(rowNode).find('td').eq(5).addClass('text-center');
                    $(rowNode).find('td').eq(5).css('vertical-align', 'middle');
                    Swal.fire(
                        'Added!',
                        'The store has been switched to awaited approval, and you must be approved by the administrator before it can be created!!!',
                        'success'
                    );
                    $("#imageResult-add").attr("src", "http://maps.gstatic.com/tactile/pane/default_geocode-2x.png");
                    $('#file_input_add').val("Choose file to update");
                    $('#upload-add').val(null);
                    $('#add-ability').val("");
                    $('#add-address').val("");
                    $('#add-name').val("");
                    $('#add-time-slot-1').prop('checked', false);
                    $('#add-time-slot-2').prop('checked', false);
                    $('#add-time-slot-3').prop('checked', false);
                    $('#add-time-slot-4').prop('checked', false);
                    $('#close-add').click();
                }
            })
            .fail(function () {
                $('#spinner').hide();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error from server, or request time out!',
                })
                return;
            });
    },
    parseTimeSlotUpdate: function (tl1, tl2, tl3, tl4) {
        var rs = "";
        if (tl1) {
            rs = rs + "1";
        } else rs = rs + "0";
        if (tl2) {
            rs = rs + "1";
        } else rs = rs + "0";
        if (tl3) {
            rs = rs + "1";
        } else rs = rs + "0";
        if (tl4) {
            rs = rs + "1";
        } else rs = rs + "0";
        return rs;
    },
}
ResetChooseLocation = () => {
    //Hide the danger if have
    document.getElementById("locationPickInput-error").style.display = 'none';
    //Set the default value for Map pick
    document.getElementById("mapLocation").innerHTML = "Choose location on map";
}