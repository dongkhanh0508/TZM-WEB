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
        load.demoImg();
    },
    eventDetail: function () {
        $("#new-cons").delegate("tbody tr td .btn-details", "click", function (e) {
            var table = $('#new-cons').DataTable();
            indexTable = table.row($(this).parents('tr'));
            e.preventDefault();
            var id = $(this).data('id');
            $.ajax({
                url: "/admin-manage-brands/details/" + id,
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
                        $("#info-image-url").attr("src", response.imageUrl);
                        $("#info-icon").attr("src", response.iconUrl);
                        $('#info-name').val(response.name);
                        $('#text-img-url').val(response.imageUrl);
                        $('#text-icon-url').val(response.iconUrl);
                        $('#cb-cat option').removeAttr('selected');
                        $('#cb-cate option[value=' + response.segmentId + ']').attr('selected', 'selected');
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
                    //var id = e.currentTarget.attributes[1].value;
                    var id = $(this).data('id');
                    $.ajax({
                        type: "DELETE",
                        url: "/admin-manage-brands/delete/" + id,
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
                                    'This brand has been deleted.',
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
    demoImg: function (status) {
        $("#add-icon").change(function () {
            $('#demo-icon').attr('src', $("#add-icon").val());
        });
        $("#add-img").change(function () {
            $('#demo-img').attr('src', $("#add-img").val());
        });
        $("#text-img-url").change(function () {
            $('#info-image-url').attr('src', $("#text-img-url").val());
        });
        $("#text-icon-url").change(function () {
            $('#info-icon').attr('src', $("#text-icon-url").val());
        });
    },
    clickUpdateButton: function () {
        $(document).on('submit', '#form-update-brand', function () {
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
                    var brandName = $('#info-name').val();
                    var cbCate = $('#cb-cate').val();
                    var textImgUrl = $('#text-img-url').val();
                    var textIconUrl = $('#text-icon-url').val();
                    $.ajax({
                        type: "PUT",
                        url: "/admin-manage-brands/update/" + id,
                        data: JSON.stringify({
                            Name: brandName,
                            SegmentId: cbCate,
                            ImageUrl: textImgUrl,
                            IconUrl: textIconUrl
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
                                    text: 'Error from server, request time out, or the brand name is existed in system!',
                                })
                                return;
                            } else {
                                var data = indexTable.data();
                                indexTable.data([
                                    data[0],
                                    '<img class="media-object img-circle" src="' + response.iconUrl + '" onerror="this.src = ' + '../assets/default/assets/images/error/brand-icon-default.png' + ';" alt="Error" style="width: 45px;">',
                                    response.name,
                                    (response.segmentName != null ? response.segmentName : ""),                                  
                                    data[4]
                                ]).draw(false);
                                Swal.fire(
                                    'Updated!',
                                    'This brand has been updated.',
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
        $(document).on('submit', '#form-add-brand', function () {
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
                    var imgUrl = $('#add-img').val();
                    var iconUrl = $('#add-icon').val();
                    var brandName = $('#add-brand').val();
                    var cbCate = $('#cb-add-cate').val();

                    $.ajax({
                        type: "POST",
                        url: "/admin-manage-brands/insert",
                        data: JSON.stringify({
                            Name: brandName,
                            IconUrl: iconUrl,
                            ImageUrl: imgUrl,
                            SegmentId: cbCate
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
                                    text: 'Error from server, request time out, or the brand name is existed in system!',
                                })
                                return;
                            } else {
                                var t = $('#new-cons').DataTable();
                                let rowNode = t.row.add([
                                    "",
                                    '<img class="media-object img-circle" src="' + response.iconUrl + '" onerror="this.src = ' + '../assets/default/assets/images/error/brand-icon-default.png' + ';" alt="Error" style="width: 45px;">',
                                    response.name,
                                    (response.segmentName != null ? response.segmentName : ""),
                                    '<div class="btn-group btn-group-md" style="float: none;">'
                                    + '<button class="btn-details btn btn-primary waves-effect waves-light" data-toggle="modal" data-target="#brand-details" data-id="'
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
                                $(rowNode).find('td').eq(2).css('vertical-align', 'middle');
                                $(rowNode).find('td').eq(3).addClass('text-center');
                                $(rowNode).find('td').eq(3).css('vertical-align', 'middle');
                                $(rowNode).find('td').eq(4).css('vertical-align', 'middle');
                                $(rowNode).find('td').eq(4).addClass('text-center');                                
                                Swal.fire(
                                    'Added!',
                                    'This brand has been added.',
                                    'success'
                                );
                                $('#demo-icon').attr('src', "~/assets/default/assets/images/icon-add-img.png");
                                $('#demo-img').attr('src', "~/assets/default/assets/images/icon-add-img.png");
                                $('#add-img').val("");
                                $('#add-icon').val("");
                                $('#add-brand').val("");
                                $('#cb-add-cate option').removeAttr('selected');
                                $('#cb-add-cate option[value=""]').attr('selected', 'selected');
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