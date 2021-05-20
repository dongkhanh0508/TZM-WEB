$(document).ready(function () {
    //Set height of view
    document.getElementById("pcoded").style.height = "fit-content";
    //Initially load pagenumber=1
    GetPageData(1, 2);
});
function GetPageData(pageNum, type, pageSize, keySearch, action, status) {
    //After every trigger remove previous data and paging
    $("#tblData").empty();
    $("#paged").empty();

    $.ajax({
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        type: "POST",
        url: "/AdminHistory/GetHistory",
        data: JSON.stringify({
            Page: pageNum,
            PageSize: pageSize,
            KeySearch: keySearch,
            Action: action,
            Type: type,
            Status: status
        }),
        beforeSend: function () { $('#spinner').show(); },
        dataType: "json",
        async: true,
    })
        .done(function (response) {
            $('#spinner').hide();
            if (response.results.length == 0) {
                $('#pagination').twbsPagination('destroy');
                return $("#tblData").append("<tr><td colspan=26 >No data</td></tr>");
            }
            var rowData = "";
            for (var i = 0; i < response.results.length; i++) {
                var dateCreate = new Date(response.results[i].createDate);

                var tmp = i + 1;
                rowData = rowData + '<tr><th class="text-center" style="vertical-align: middle;" scope="row">' + tmp + '</th><td style="vertical-align: middle;">'
                    + response.results[i].referenceName + '</td><td class="text-center" style="vertical-align: middle;">'
                    + response.results[i].accountName + '</td><td class="text-center" style="vertical-align: middle;">'
                    + response.results[i].role + '</td><td class="text-center" style="vertical-align: middle;">'
                    + dateCreate.toLocaleString() + '</td><td class="text-center" style="vertical-align: middle;">'

                    + ActionSurvey(response.results[i].action) + '</td>' + '<td class="text-center" style="vertical-align: middle;">'
                    + '<div class="label-main col-sm-10">'
                    + '<label class="label label-' + ActionStatus(response.results[i].status) + '" style="width: 90%">'
                    + ParseStatus(response.results[i].status)
                    + '</label></div>'
                    + '</td><td class="text-center" style="vertical-align: middle;">'
                    + (response.results[i].status == 5 || response.results[i].status == 6 || response.results[i].status == 4 ? '--</td></tr>' :
                        (
                        '<form method="post" action="/admin-map/move-to-store" class="form-submit">' + 
                        '<input type="hidden" name="Wkt" value="' + response.results[i].geom + '" />' +
                        '<input type="hidden" name="Id" value="' + response.results[i].storeId + '" />' +
                        '<input type="hidden" name="Type" value="Store" />' +
                        '<button class="btn-map btn btn-primary btn-icon" id="' + response.results[i].id + '" onclick="SubmitForm(\'' +
                        response.results[i].id + '\')"><i class="ti-map-alt m-0"></i></button>' +
                        '</form></td></tr>'
                        )
                    );
            }
            $("#tblData").append(rowData);
            PaggingTemplate(response.totalNumberOfPages, response.pageNumber);
        })
        .fail(function () {
            $('#spinner').hide();
            $('#pagination').twbsPagination('destroy');
            return $("#tblData").append("<tr><td colspan=26 >No data</td></tr>");
        });
}
function SubmitForm(id) {
    let form = document.getElementById(id).parentElement;
    form.submit();
}
//This is paging temlpate ,you should just copy paste
function PaggingTemplate(totalPage, currentPage) {
    var template = "<p>Show " + currentPage + " of " + totalPage + " pages</p>"

    $('#pagination').twbsPagination('destroy');
    window.pagObj = $('#pagination').twbsPagination({
        totalPages: totalPage,
        visiblePages: 10,
        startPage: currentPage,
        onPageClick: function (event, page) {
            if (currentPage != page) {
                GetPageData(page, 2, $('#page-size').val(), $('#key-search').val(), $('#action').val(), $('#cb-status').val());
            }
        }
    });
    $("#paged").append(template);

    $('.filter').off('change').on('change', function (e) {
        e.preventDefault();
        GetPageData(1, 2, $('#page-size').val(), $('#key-search').val(), $('#action').val(), $('#cb-status').val());
    });
    //$("#storeTable").delegate("td", "click", function (e) {
    //    e.preventDefault();
    //    if (e.currentTarget.childNodes[0] != null) {
    //        e.currentTarget.childNodes[0].submit();
    //    }
        
    //    //GetPageData(1, 2, $('#page-size').val(), $('#key-search').val(), $('#action').val(), $('#cb-status').val());
    //});
    $("#button-search").on('click', function () {
        GetPageData(1, 2, $('#page-size').val(), $('#key-search').val(), $('#action').val(), $('#cb-status').val());
    });
    $(".btn-map").off('click').on('click', function (e) {
        e.preventDefault();
    });
}
function ActionSurvey(action) {
    if (action == 1 || action == 4) {
        return 'Insert';
    } else if (action == 2 || action == 5) {
        return 'Update';
    } else {
        return 'Delete';
    }
}
function ParseStatus(status) {
    if (status == 1) {
        return 'Surveyed';
    } else if (status == 3) {
        return 'Need Approved';
    } else if (status == 4) {
        return 'Waiting Update';
    } else if (status == 5) {
        return 'Deleted';
    } else if (status == 6) {
        return 'Reject';
    } else {
        return 'NeedSurvey';
    }
}
function ActionStatus(action) {
    if (action == 1) {
        return 'success'
    } else if (action == 2 || action == 3 || action == 4) {
        return 'warning'
    } else {
        return 'danger'
    }
}