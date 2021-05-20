$(document).ready(function () {
    //Set height of view
    document.getElementById("pcoded").style.height = "fit-content";
    $('#spinner').hide();
    load.getData(0);
    load.init();
});
var indexTable;
var load = {
    init: function () {
        load.filter();
        load.partOfContent();
        load.partServerity();
        load.partType();
        load.eventDetail();
        load.partServerityString();
    },
    eventDetail: function () {
        $("#new-cons").delegate("tbody tr td .btn-details", "click", function (e) {
            $('#info-asset-name').val("");
            $('#info-asset-key').val("");
            $('#info-store').val("");
            $('#info-start').val("");
            $('#info-end').val("");
            $('#info-type-violation').val("");
            $('#info-severity').val("");
            $('#info-des').val("");
            e.preventDefault();
            var id = $(this).data('id');
            $.ajax({
                url: "/violation-logs/details/" + id,
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

                        var start = new Date(response.startTime);
                        var end = new Date(response.endTime);
                        $('#info-asset-name').val(response.storeName);
                        $('#info-asset-key').val(response.assetId);
                        $('#info-store').val(response.storeName);
                        $('#info-start').val(start.toLocaleString());
                        $('#info-end').val(end.toLocaleString());
                        $('#info-type-violation').val(load.partType(response.typeViolation));
                        $('#info-severity').val(load.partServerityString(response.severity));
                        $('#info-des').val(response.description);


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
    getData: function (storeId) {
        $.ajax({
            type: "POST",
            url: "/violation-logs/get-violation-logs",
            data: JSON.stringify({
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
                        var start = new Date(response.results[i].startTime);
                        var end = new Date(response.results[i].endTime);
                        let rowNode = t.row.add([
                            "",
                            response.results[i].assetName,
                            start.toLocaleString(),
                            end.toLocaleString(),
                            response.results[i].storeName,
                            load.partType(response.results[i].typeViolation),
                            load.partServerity(response.results[i].severity),
                            '<div class="btn-group btn-group-md" style="float: none;">'
                            + '<button class="btn-details btn btn-primary waves-effect waves-light" onclick="LoadStoreLocationOnMapAgain(' + response.results[i].id + ')" data-toggle="modal" data-target="#details" data-id=" '
                            + response.results[i].id
                            + '" style="float: none;margin: 5px;"><span class="icofont icofont-ui-edit"></span> Details</button>'
                            + '</div>'
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

                        $(rowNode).find('td').eq(6).addClass('text-center');
                        $(rowNode).find('td').eq(6).css('vertical-align', 'middle');

                        $(rowNode).find('td').eq(7).addClass('text-center');
                        $(rowNode).find('td').eq(7).css('vertical-align', 'middle');


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
    filter: function () {
        $(".cb-filter").change(function () {
            var storeId = $("#store-filter").val();
            load.getData(storeId);
        });
    },
    partOfContent: function (str) {
        if (str == undefined) str = "No content";
        if (str.length > 36) {
            return (str.substring(0, 36) + "...");
        }
        else {
            return str;
        }
    },
    partType: function (type) {
        if (type == 1) {
            return 'Move out of trade zone';
        }
        else {
            return 'other';
        }
    },
    partServerity: function (action) {
        if (action == 1) {
            return '<div class="label-main col-sm-8"><label class="label label-danger" style="width: 90%">High</label></div>';
        }
        else if (action == 2) {
            return '<div class="label-main col-sm-8"><label class="label label-warning" style="width: 90%">Medium</label></div>';
        } else {
            return '<div class="label-main col-sm-8"><label class="label label-success" style="width: 90%">Low</label></div>';
        }
    },
    partServerityString: function (action) {
        if (action == 1) {
            return 'High';
        }
        else if (action == 2) {
            return 'Medium';
        } else {
            return 'Low';
        }
    },
}