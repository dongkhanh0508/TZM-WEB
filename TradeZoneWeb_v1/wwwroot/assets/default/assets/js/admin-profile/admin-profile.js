
function profile(id) {
    
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
                $('#profile-email').text(response.email);
                $('#profile-name').val(response.fullname);
                $('#profile-phone').val(response.phoneNumber);
                $("#profile-img").attr("src", response.imageUrl);
                $("#profile-role").val(parseRole(response.role))
               /* $('#btn-update-profile').attr('data-id', response.id);*/

                /*$('#btn-update-profile').attr('disabled', true);*/
            }
        })
        .fail(function () {
            $('#spinner').hide();
            return;
        });
}
function parseRole(role) {
    if (role == 0) {
        return "Admin";
    } else if (role == 1) {
        return "Brand";
    } else {
        return "Surveyor";
    }
}
