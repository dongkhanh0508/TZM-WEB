$(document).ready(function () {
    //Set height of view
    document.getElementById("pcoded").style.height = "fit-content";
    $('#spinner').hide();
    load.getData(0,0);
    load.init();   
});
var indexTable;
var load = {
    init: function () {
        load.eventDetail();
        load.updateEvent();
        load.clickUpdateButton();       
        load.parseType();
        load.deleteEvent();
        load.clickAddButton();
        load.filter();
    },
    getData: function (storeId, typeAsset) {
        $.ajax({
            type: "POST",
            url: "/manage-assets/get-assets",
            data: JSON.stringify({
                TypeAsset: typeAsset,
                StoreId: storeId,
            }),
            beforeSend: function () { $('#spinner').show(); },
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            async: true,
        })
            .done(function (response) {
                $('#spinner').hide();
                if (response == null) {
                    var t = $('#new-cons').DataTable();
                    t.clear().draw();
                    return;
                } else {
                    var t = $('#new-cons').DataTable();
                    t.clear().draw();
                    for (var i = 0; i < response.results.length; i++) {
                        let rowNode = t.row.add([
                            "",
                            response.results[i].id,
                            response.results[i].name,
                            load.parseType(response.results[i].type),
                            response.results[i].storeName,
                            '<div class="btn-group btn-group-md" style="float: none;">'
                            + '<button class="btn-details btn btn-primary waves-effect waves-light" data-toggle="modal" data-target="#account-details" data-id=" '
                            + response.results[i].id
                            + '" style="float: none;margin: 5px;"><span class="icofont icofont-ui-edit"></span> Details</button>'
                            + '<button class="btn-delete btn btn-danger waves-effect waves-light" data-id="'
                            + response.results[i].id
                            + '" style="float: none;margin: 5px;"><span class="icofont icofont-ui-delete"></span> Delete</button></div>'

                        ]).draw(false).node();

                        $(rowNode).find('td').eq(0).addClass('text-center');
                        $(rowNode).find('td').eq(0).css('vertical-align', 'middle');

                        $(rowNode).find('td').eq(1).addClass('text-center');
                        $(rowNode).find('td').eq(1).css('vertical-align', 'middle');

                        $(rowNode).find('td').eq(2).addClass('text-center');
                        $(rowNode).find('td').eq(2).css('vertical-align', 'middle');

                        $(rowNode).find('td').eq(3).addClass('text-center');
                        $(rowNode).find('td').eq(3).css('vertical-align', 'middle');

                        $(rowNode).find('td').eq(4).addClass('text-center');
                        $(rowNode).find('td').eq(4).css('vertical-align', 'middle');

                        $(rowNode).find('td').eq(5).addClass('text-center');
                        $(rowNode).find('td').eq(5).css('vertical-align', 'middle');
                        
                    }
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
    eventDetail: function () {
        $("#new-cons").delegate("tbody tr td .btn-details", "click", function (e) {
            var table = $('#new-cons').DataTable();
            indexTable = table.row($(this).parents('tr'));
            e.preventDefault();
            var id = $(this).attr('data-id');
            //var id = $('#btn-approval').attr('data-id');
            console.log(id);
            $.ajax({
                url: "/manage-assets/details/" + id,
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
                       
                        $('#info-name').val(response.name); 
                        $('#info-key').val(response.id);   
                        $('#cb-type option').removeAttr('selected');
                        $('#cb-store-update option').removeAttr('selected');
                        $('#cb-type option[value=' + response.type + ']').attr('selected', 'selected');
                        $('#cb-store-update option[value=' + response.storeId + ']').attr('selected', 'selected');                           
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
    filter: function () {
        $(".cb-filter").change(function () {
            var storeId = $("#store-filter").val();
            var type = $("#type-filter").val();
            load.getData(storeId, type);
        });        
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
                    // Attribute 0 is data-id - id of user
                    //var id = e.currentTarget.attributes[0].value
                    var id = $(this).data('id');;
                    $.ajax({
                        type: "DELETE",
                        url: "/manage-assets/delete/" + id,
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
                                table
                                    .row($(e.currentTarget).parents('tr'))
                                    .remove()
                                    .draw();
                                Swal.fire(
                                    'Deleted!',
                                    'This asset has been deleted.',
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
    parseType: function (type) {
        if (type == 1) {
            return '<h5>Motorcycle</h5><i class="icofont icofont-motor-bike-alt text-success" style="font-size: 25px;"></i>';
        }
        else if (type == 2) {
            return '<h5>Truck</h5><i class="ti-truck text-warning" style="font-size: 25px;"></i>';
        }
        else {
            return '<h5>Other</h5> <i class="ti-package text-success" style="font-size: 25px;"></i>';
        }
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
                    var id = $('#btn-update').data('id');
                    var name = $('#info-name').val();                    
                    var cbType = $('#cb-type').val();  
                    var cbStore = $('#cb-store-update').val();  
                    $.ajax({
                        type: "PUT",
                        url: "/manage-assets/update/" + id,
                        data: JSON.stringify({
                            Name: name,
                            Type: cbType,
                            StoreId: cbStore
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
                            } else {
                                var data = indexTable.data();
                                indexTable.data([
                                    data[0],
                                    data[1],
                                    response.name,
                                    load.parseType(response.type),
                                    response.storeName,
                                    data[5]
                                ]).draw(false);
                                Swal.fire(
                                    'Updated!',
                                    'This asset has been updated.',
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
                }
            });
        });
    },
    clickAddButton: function () {
        $(document).on('submit', '#form-add', function () {
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
                    var name = $('#add-name').val();                   
                    var cbType = $('#add-cb-type').val();
                    var cbStore = $('#add-cb-store').val();
                    $.ajax({
                        type: "POST",
                        url: "/manage-assets/insert",
                        data: JSON.stringify({
                            Name: name,
                            Type: cbType,
                            StoreId: cbStore
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
                            } else {
                                var t = $('#new-cons').DataTable();
                                
                                let rowNode = t.row.add([
                                    "",                                   
                                    response.id,
                                    response.name,
                                    load.parseType(response.type),
                                    response.storeName,
                                    '<div class="btn-group btn-group-md" style="float: none;">'
                                    + '<button class="btn-details btn btn-primary waves-effect waves-light" data-toggle="modal" data-target="#account-details" data-id=" '
                                    + response.id
                                    + '" style="float: none;margin: 5px;"><span class="icofont icofont-ui-edit"></span> Details</button>'
                                    + '<button class="btn-delete btn btn-danger waves-effect waves-light" data-id="'
                                    + response.id
                                    + '" style="float: none;margin: 5px;"><span class="icofont icofont-ui-delete"></span> Delete</button></div>'
                                ]).draw(false).node();

                                $(rowNode).find('td').eq(0).addClass('text-center');
                                $(rowNode).find('td').eq(0).css('vertical-align', 'middle');                               

                                $(rowNode).find('td').eq(1).addClass('text-center');
                                $(rowNode).find('td').eq(1).css('vertical-align', 'middle');

                                $(rowNode).find('td').eq(2).addClass('text-center');
                                $(rowNode).find('td').eq(2).css('vertical-align', 'middle');

                                $(rowNode).find('td').eq(3).addClass('text-center');
                                $(rowNode).find('td').eq(3).css('vertical-align', 'middle');

                                $(rowNode).find('td').eq(4).addClass('text-center');
                                $(rowNode).find('td').eq(4).css('vertical-align', 'middle');

                                $(rowNode).find('td').eq(5).addClass('text-center');
                                $(rowNode).find('td').eq(5).css('vertical-align', 'middle');


                                Swal.fire(
                                    'Added!',
                                    'This asset has been added.',
                                    'success'
                                );
                                $('#add-name').val("");
                                $('#add-cb-type option').removeAttr('selected');
                                $('#add-cb-type option[value=0]').attr('selected', 'selected');
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
                }
            });
        });
    },
}