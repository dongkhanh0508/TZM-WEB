$(document).ready(function () {
    //Set height of view
    document.getElementById("pcoded").style.height = "fit-content";
    $('#spinner').hide();
    load.init();

});
var load = {
    init: function () {
        load.loadData(1, 1);
        load.actionStatus();
        load.parserStatus();
        load.viewMap();
        load.actionSurvey;
    },
    loadData: function (pageNum, type) {
        $.ajax({
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            type: "POST",
            url: "/AdminHistory/GetHistory",
            data: JSON.stringify({
                Page: pageNum,
                PageSize: 10,
                KeySearch: "",
                Action: 0,
                Type: 0,
                Status: 3,
                SortType: 1
            }),
            beforeSend: function () { $('#spinner').show(); },
            dataType: "json",
            async: true,
        })
            .done(function (response) {
                $('#spinner').hide();
                if (response.results.length == 0) {
                    return $("#tblData").append("<tr><td colspan=26 >No data</td></tr>");
                }
                var rowData = "";
                for (var i = 0; i < response.results.length; i++) {
                    let buildingId = response.results[i].buildingId;
                    var dateCreate = new Date(response.results[i].createDate);

                    var tmp = i + 1;
                    rowData = rowData + '<tr><th class="text-center" style="vertical-align: middle;" scope="row">' + tmp + '</th><td style="vertical-align: middle;">'
                        + response.results[i].referenceName + '</td><td class="text-center" style="vertical-align: middle;">'
                        + response.results[i].accountName + '</td><td class="text-center" style="vertical-align: middle;">'
                        + response.results[i].role + '</td><td class="text-center" style="vertical-align: middle;">'
                        + dateCreate.toLocaleString() + '</td><td class="text-center" style="vertical-align: middle;">'

                        + load.actionSurvey(response.results[i].action) + '</td>' + '<td class="text-center" style="vertical-align: middle;">'
                        + '<div class="label-main col-sm-10">'
                        + '<label class="label label-' + load.actionStatus(response.results[i].status) + '" style="width: 90%">'
                        + load.parserStatus(response.results[i].status)
                        + '</label></div>'
                        + '</td><td class="text-center" style="vertical-align: middle;">'
                        + (response.results[i].status == 5 || response.results[i].status == 6 ? '--</td></tr>' :
                            (buildingId != null)
                                ?
                                ('<form method="post" action="/admin-map/move-to-building" class="form-submit">'
                                    + '<input type="hidden" name="Wkt" value="' + response.results[i].geom + '" />'
                                    + '<input type="hidden" name="Id" value="' + response.results[i].buildingId + '" />'
                                    + '<button class="btn-map btn btn-primary btn-icon" id="' + response.results[i].id + '" data-map="' + response.results[i].geom + '" onclick="SubmitForm(\''
                                    + response.results[i].id + '\')"><i class="ti-map-alt m-0"></i></button>'
                                    + '</form>'
                                    + '</td></tr>')
                                :
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
            })
            .fail(function () {
                $('#spinner').hide();
                return $("#tblData").append("<tr><td colspan=26 >No data</td></tr>");
            });
    },
    actionStatus: function (action) {
        if (action == 1) {
            return 'success'
        } else if (action == 2 || action == 3 || action == 4) {
            return 'warning'
        } else {
            return 'danger'
        }
    },
    actionSurvey: function (action) {
        if (action == 1 || action == 4) {
            return 'Insert';
        } else if (action == 2 || action == 5) {
            return 'Update';
        } else {
            return 'Delete';
        }
    },
    parserStatus: function (status) {
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
    },
    viewMap: function () {
        //$("#history").delegate("tbody tr td .btn-map", "click", function (e) {
        //    e.preventDefault();
        //    var geom = $(this).data('map');
        //    alert(geom);
        //});
    },
}
function SubmitForm(id) {
    let form = document.getElementById(id).parentElement;
    form.submit();
}