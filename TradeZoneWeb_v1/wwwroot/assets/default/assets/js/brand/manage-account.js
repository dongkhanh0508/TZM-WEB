$(document).ready(function () {
    //Set height of view
    document.getElementById("pcoded").style.height = "fit-content";
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
            var id = $(this).data('id');
            $.ajax({
                url: "/manage-account/details/" + id,
                dataType: "json",
                beforeSend: function () { $('#spinner').show(); },
                contentType: "application/json;charset=utf-8",
                async: true,
            })
                .done(function (response) {
                    $('#spinner').hide();
                    if (response == null) {
                        return alert('Error from server, or request time out');
                    } else {
                        $('#info-email').text(response.email);
                        $('#info-name').val(response.fullname);                      
                        $('#info-phone').val(response.phoneNumber);
                        $("#info-img").attr("src", response.imageUrl);                                              
                        $('#btn-update').attr('data-id', response.id);
                        $('#btn-update').attr('disabled', true);
                    }
                })
                .fail(function () {
                    $('#spinner').hide();
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
                    var id = $(this).data('id');
                    $.ajax({
                        type: "DELETE",
                        url: "/manage-account/delete/" + id,                        
                        beforeSend: function () { $('#spinner').show(); },
                        dataType: "json",
                        contentType: "application/json;charset=utf-8",
                        async: true,
                    })
                        .done(function (response) {
                            $('#spinner').hide();
                            if (response == "409") {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'The account is currently signed in!',
                                })
                                return;
                            }
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
                                    'This account has been deleted.',
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
        $(document).on('submit', '#form-update-account', function () {  
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
                    var fullname = $('#info-name').val();
                    var phoneNum = $('#info-phone').val();                   
                    $.ajax({
                        type: "PUT",
                        url: "/manage-account/update/" + id,
                        data: JSON.stringify({
                            Fullname: fullname,
                            PhoneNumber: phoneNum                            
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
                                    data[1],
                                    response.fullname,
                                    response.email,
                                    data[4]
                                ]).draw(false);
                                Swal.fire(
                                    'Updated!',
                                    'This account has been updated.',
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
        $(document).on('submit', '#form-add-account', function () {            
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
                    var email = $('#add-email').val();
                    var fullname = $('#add-name').val();
                    var phoneNum = $('#add-phone').val();                    
                    $.ajax({
                        type: "POST",
                        url: "/manage-account/insert",
                        data: JSON.stringify({
                            Email: email,
                            Fullname: fullname,
                            PhoneNumber: phoneNum                           
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
                                    '<img class="media-object img-circle" src="' + (response.imageUrl == "" ? "../assets/default/assets/images/error/avatar.png" : response.imageUrl) + '" alt="Error" style="width: 45px;">',
                                    response.fullname,
                                    response.email,                                   
                                    '<div class="btn-group btn-group-md" style="float: none;">'
                                    + '<button class="btn-details btn btn-primary waves-effect waves-light" data-toggle="modal" data-target="#account-details" data-id=" '
                                    + response.id
                                    + '" style="float: none;margin: 5px;"><span class="icofont icofont-ui-edit"></span> Details</button>'
                                    + '<button class="btn-delete btn btn-danger waves-effect waves-light" data-id="'
                                    + response.id
                                    + '" style="float: none;margin: 5px;"><span class="icofont icofont-ui-delete"></span> Delete</button></div>'
                                ], 0).draw(false).node();
                                $(rowNode).find('td').eq(0).addClass('text-center');
                                $(rowNode).find('td').eq(0).css('vertical-align', 'middle');
                                $(rowNode).find('td').eq(1).addClass('text-center');
                                $(rowNode).find('td').eq(2).css('vertical-align', 'middle');
                                $(rowNode).find('td').eq(3).css('vertical-align', 'middle');
                                
                                $(rowNode).find('td').eq(4).addClass('text-center');
                                $(rowNode).find('td').eq(4).css('vertical-align', 'middle');
                                Swal.fire(
                                    'Added!',
                                    'This account has been added.',
                                    'success'
                                );
                                $('#add-email').val("");
                                $('#add-name').val("");
                                $('#add-phone').val("");
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

