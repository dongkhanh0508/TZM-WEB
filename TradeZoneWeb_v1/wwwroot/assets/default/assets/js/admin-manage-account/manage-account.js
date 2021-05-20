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
        load.cbRoleOnchangeEvent();
        load.updateEvent();
        load.clickUpdateButton();
        load.parseRole();
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
                url: "/admin-manage-account/details/" + id,
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
                        $('#info-email').text(response.email);
                        $('#info-name').val(response.fullname);                      
                        $('#info-phone').val(response.phoneNumber);
                        $("#info-img").attr("src", response.imageUrl);
                        $('#cb-role option').removeAttr('selected');
                        $('#cb-role option[value=' + response.role + ']').attr('selected', 'selected');

                        if (response.role == 1) {
                            $('#BrandSelector').attr('style', 'display: block');
                        } else {
                            $('#BrandSelector').attr('style', 'display: none');
                        }                        
                        if (response.role == 1) {
                            $('#cb-brand option[value=' + response.brandId + ']').attr('selected', 'selected');
                        } else {
                            $('#cb-brand').attr('disabled', true);
                        }                                         
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
    cbRoleOnchangeEvent: function () {
        $("#cb-role").change(function () {
            var role = $('#cb-role').val();
            if (role == 1) {
                $('#cb-brand').attr('disabled', false);
                $('#BrandSelector').attr('style', 'display: block');
            } else {
                $('#cb-brand').attr('disabled', true);
                $('#BrandSelector').attr('style', 'display: none');
            }
        });
        $("#add-cb-role").change(function () {
            var role = $('#add-cb-role').val();
            if (role == 1) {
                $('#add-cb-brand').attr('disabled', false);
            } else {
                $('#add-cb-brand').attr('disabled', true);
            }
        });
    },
    updateEvent: function () {
        $(".update-info").change(function () {         
            var fullname = $('#info-name').val();
            var phoneNum = $('#info-phone').val();
            if (fullname != "" && phoneNum != "") {
                $('#btn-update').attr('disabled', false);
            } else {
                $('#btn-update').attr('disabled', true);
            }
        });
        $(".update-info").keyup(function () {
            var fullname = $('#info-name').val();
            var phoneNum = $('#info-phone').val();
            if (fullname != "" && phoneNum != "") {
                $('#btn-update').attr('disabled', false);
            } else {
                $('#btn-update').attr('disabled', true);
            }
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
                    //var id = e.currentTarget.attributes[0].value;
                    var id = $(this).data('id');
                    $.ajax({
                        type: "DELETE",
                        url: "/admin-manage-account/delete/" + id,                        
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
    parseRole: function (role) {
        if (role == 0) {
            return "Admin";
        } else if (role == 1) {
            return "Brand";
        } else {
            return "Surveyor";
        }
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
                    var cbRole = $('#cb-role').val();
                    var cbBrand = $('#cb-brand').val();
                    $.ajax({
                        type: "PUT",
                        url: "/admin-manage-account/update/" + id,
                        data: JSON.stringify({
                            Fullname: fullname,
                            PhoneNumber: phoneNum,
                            Role: cbRole,
                            BrandId: cbBrand
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
                            } else if (response == "405") {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Not Allowed',
                                    text: 'You can not change yourself from Admin to Brand',
                                })
                                return;
                            } else {
                                var data = indexTable.data();
                                indexTable.data([
                                    data[0],
                                    data[1],
                                    response.fullname,
                                    response.email,
                                    load.parseRole(response.role),
                                    (response.brandName == null ? "---" : response.brandName),
                                    data[6]
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
                    var cbRole = $('#add-cb-role').val();
                    var cbBrand = $('#add-cb-brand').val();
                    $.ajax({
                        type: "POST",
                        url: "/admin-manage-account/insert",
                        data: JSON.stringify({
                            Email: email,
                            Fullname: fullname,
                            PhoneNumber: phoneNum,
                            Role: cbRole,
                            BrandId: cbBrand
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
                                    text: 'Error from server, request time out, or email is existed in system!',
                                })
                                return;
                            } else {
                                var t = $('#new-cons').DataTable();
                                let rowNode = t.row.add([
                                    "",
                                    '<img class="media-object img-circle" src="' + (response.imageUrl == "" ? "../assets/default/assets/images/error/avatar.png" : response.imageUrl) + '" alt="Error" style="width: 45px;height: 45px;">',
                                    response.fullname,
                                    response.email,
                                    load.parseRole(response.role),
                                    (response.brandName == null ? "---" : response.brandName),
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
                                $(rowNode).find('td').eq(2).css('vertical-align', 'middle');
                                $(rowNode).find('td').eq(3).css('vertical-align', 'middle');
                                $(rowNode).find('td').eq(4).css('vertical-align', 'middle');
                                $(rowNode).find('td').eq(5).addClass('text-center');
                                $(rowNode).find('td').eq(6).addClass('text-center');
                                $(rowNode).find('td').eq(6).css('vertical-align', 'middle');
                                Swal.fire(
                                    'Added!',
                                    'This account has been added.',
                                    'success'
                                );
                                $('#add-email').val("");
                                $('#add-name').val("");
                                $('#add-phone').val("");
                                $('#add-cb-brand option').removeAttr('selected');
                                $('#add-cb-brand option[value=0]').attr('selected', 'selected');
                                $('#add-cb-role option').removeAttr('selected');
                                $('#add-cb-role option[value=0]').attr('selected', 'selected');
                                $('#add-cb-brand').attr('disabled', true);
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

