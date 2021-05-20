$(document).ready(function () {
    //Set height of view
    document.getElementById("pcoded").style.height = "fit-content";
    $('#spinner').hide();
    var newcs = $('#tbl-data').DataTable(
        {
            "columnDefs": [{
                "searchable": false,
                "orderable": false,
                "targets": 0
            }],
            "paging": false,
            "searching": false,
            "ordering": false,
            "info": false,
            "columns": [
                { "width": "5%" },
                { "width": "15%" },
                { "width": "15%" },
                { "width": "10%" },
                { "width": "30%" },
                { "width": "10%" },
                { "width": "15%" },
            ],
            "order": [[1, 'asc']]
        }
    );   
    load.init();
    load.getData(0);
    
});
var indexTable;
var load = {
    init: function () {        
        load.clickUpdateButton();       
        load.currentVersion();
        load.cbChange();
        load.valueChange();
        load.clickChange();
        load.cb();
        load.parseActive();
    },
    getData: function (version) {
        $.ajax({
            type: "POST",
            url: "/admin-configuration/get-data",
            data: JSON.stringify({
                Version: version
            }),
            beforeSend: function () { $('#spinner').show(); },
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            async: true,
        })
            .done(function (response) {
                $('#spinner').hide();
                if (response == null) {
                    var t = $('#tbl-data').DataTable();
                    t.clear().draw();
                    return;
                } else {
                    var t = $('#tbl-data').DataTable();
                    t.clear().draw();
                    for (var i = 0; i < response.length; i++) {
                        var tmp = i + 1;
                        let rowNode = t.row.add([
                            tmp,
                            response[i].name,
                            '<div class="input-group">' +
                            '<input type="number" data-id=' + response[i].id + ' data-value="" class="form-control text-center value" value="' + response[i].value + '" style="z-index: unset;">' +
                            '</div >',
                            response[i].version,
                            (response[i].description == null ? "N/A" : response[i].description),
                            load.parseActive(response[i].active),
                            '<div class="btn-group btn-group-md" style="float: none;">' +
                            '<button data-id="' + response[i].id + '" class="btn-save' + response[i].id + ' btn btn-click btn-info waves-effect waves-light" style="float: none;margin: 5px; z-index: unset;" disabled>' +
                                    '<span class="icofont icofont-save"></span> Save'+
                                 '</button>'+
                            '</div>'
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
                        
                    }
                }
            })
            .fail(function () {
                $('#spinner').hide();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error from server, or request time out!!!',
                })
                return;
            });
    },
    cbChange: function () {
        $(".filter").change(function () {           
            var version = $('#cb-version-filter').val();
            load.getData(version);
        });
    },
    cb: function () {
        $("#cb-change-version").change(function () {
            var current = $('#current-version').val();
            var version = $('#cb-change-version').val();
            if (current == version) {
                $('#btn-submit').attr('disabled', true);
            } else {
                $('#btn-submit').attr('disabled', false);
            }
            
        });
    },
    parseActive: function (active) {
        if (active) {
            return '<i class="ion-checkmark-circled f-20" style="color: #2ecc71"></i>';
        } else {
            return '<i class="ion-close-circled f-20" style="color: #e74c3c"></i>';
        }
    },
    currentVersion: function (type) {
        $('#btn-change').on('click', function () {
            var current = $('#current-version').val();
            $("#cb-change-version").val(current).change();
        });
    },
    clickUpdateButton: function () {
        $("#tbl-data").delegate("tbody tr td .btn-click", "click", function (e) {
            var id = $(this).attr('data-id');
            var value = $(this).attr('data-value');
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#28e1bd',
                cancelButtonColor: '#d757575',
                confirmButtonText: 'Yes, updated it!'
            }).then((result) => {
                if (result.isConfirmed) {                  
                    $.ajax({
                        type: "PUT",
                        url: "/admin-configuration/update/" + id,
                        data: JSON.stringify({
                            Value: value
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
                                $('.btn-save' + id).attr('disabled', true);
                                Swal.fire(
                                    'Updated!',
                                    'This value has been updated.',
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
    valueChange: function () {
        $("#tbl-data").delegate("tbody tr td .value", "keyup", function (e) {
            var id = $(this).data('id');
            var value = $(this).val();
            $('.btn-save' + id).attr('disabled', false);
            $('.btn-save' + id).attr('data-value', value);
        });
        $("#tbl-data").delegate("tbody tr td .value", "change", function (e) {
            var id = $(this).data('id');
            var value = $(this).val();
            $('.btn-save' + id).attr('disabled', false);
            $('.btn-save' + id).attr('data-value', value);
        });
    },
    clickChange: function () {
        $("#btn-submit").on("click", function (e) {
            var version = $("#cb-change-version").val();            
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#28e1bd',
                cancelButtonColor: '#d757575',
                confirmButtonText: 'Yes, updated it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        type: "PUT",
                        url: "/admin-configuration/change-version",
                        data: JSON.stringify({
                            Version: version
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
                                Swal.fire(
                                    'Updated!',
                                    'This version has been updated.',
                                    'success'
                                );
                                $('#current-version').val(version);
                                $('#close-change').click();  
                                $('#cb-version-filter option').removeAttr('selected');
                                $('#cb-version-filter option[value=' + version + ']').attr('selected', 'selected');
                                load.getData(0);
                            }
                        })
                        .fail(function () {
                            $('#spinner').hide();
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Error from server, or request time out!',
                            });
                            return;
                        });
                }

            });
        });
    },
}