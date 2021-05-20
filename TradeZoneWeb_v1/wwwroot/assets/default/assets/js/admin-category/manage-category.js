$(document).ready(function () {
    //Set height of view
    document.getElementById("pcoded").style.height = "fit-content";
    var newcs = $('#new-cons').DataTable(
        {
            "columnDefs": [{
                "searchable": false,
                "orderable": false,
                "targets": 0
            }],
            "columns": [
                null,
                null,
                { "width": "20%" },
            ],
            "order": [[1, 'asc']]
        }
    );
    newcs.on('order.dt search.dt', function () {
        newcs.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();    
    $('#spinner').hide();
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
    },
    eventDetail: function () {
        $("#new-cons").delegate("tbody tr td .btn-details", "click", function (e) {
            var table = $('#new-cons').DataTable();
            indexTable = table.row($(this).parents('tr'));
            e.preventDefault();
            var id = $(this).attr('data-id');
            $.ajax({
                url: "/admin-manage-segment/details/" + id,
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
                        url: "/admin-manage-segment/delete/" + id,
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
                                    text: 'It is not possible to delete a segment when it is in use, error from server, or request time out!',
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
                                    'This segment has been deleted.',
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
                confirmButtonText: 'Yes, updated it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    var id = $('#btn-update').data('id');
                    var name = $('#info-name').val();                                                     
                    $.ajax({
                        type: "PUT",
                        url: "/admin-manage-segment/update/" + id,
                        data: JSON.stringify({
                            Name: name                          
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
                                    response.name,
                                    data[2]
                                ]).draw(false);
                                Swal.fire(
                                    'Updated!',
                                    'This segment has been updated.',
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
                    $.ajax({
                        type: "POST",
                        url: "/admin-manage-segment/insert",
                        data: JSON.stringify({
                            Name: name,                                          
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
                                    text: 'Error from server, request time out, or segment name is existed in system!',
                                })
                                return;
                            } else {
                                var t = $('#new-cons').DataTable();
                                
                                let rowNode = t.row.add([
                                    "",                                                                     
                                    response.name,                                   
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

                                Swal.fire(
                                    'Added!',
                                    'This segment has been added.',
                                    'success'
                                );
                                $('#add-name').val("");                               
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