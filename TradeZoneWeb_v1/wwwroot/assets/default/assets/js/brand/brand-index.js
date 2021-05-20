$(document).ready(function () {
    //Set height of view
    document.getElementById("pcoded").style.height = "fit-content";
    $('#spinner').hide();
    load.init();
    
});
var load = {
    init: function () {
        load.loadData(1, 0);
        load.viewMap();
        load.parserAction();
        load.getAsset();
    },
    loadData: function (pageNum, type) {
        $.ajax({           
            type: "POST",
            url: "/dashboard/history",
            data: JSON.stringify({
                Page: pageNum,
                PageSize: 5,
                KeySearch: "",
                Action: 0,
                Type: type,
                Status: 3
            }),
            beforeSend: function () { $('#spinner').show(); },
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            async: true,
        })
            .done(function (response) {
                $('#spinner').hide();
                if (response.results.length == 0) {                   
                    return $("#tblData").append("<tr><td colspan=26 >No data</td></tr>");
                }
                var rowData = "";
                for (var i = 0; i < response.results.length; i++) {
                    var dateCreate = new Date(response.results[i].createDate);

                    var tmp = i + 1;
                    rowData = rowData + '<tr><th class="text-center" style="vertical-align: middle;" scope="row">' + tmp + '</th><td class="text-center" style="vertical-align: middle;">'
                        + response.results[i].referenceName + '</td><td class="text-center" style="vertical-align: middle;">'                        
                        + dateCreate.toLocaleString() + '</td><td class="text-center" style="vertical-align: middle;">'
                        + load.parserAction(response.results[i].action) + '</td>' + '<td class="text-center" style="vertical-align: middle;">'                        
                        + (response.results[i].status == 5 || response.results[i].status == 6 ? '--</td></tr>' :
                            '<button class="btn-map btn btn-primary btn-icon" data-id="' + response.results[i].id + '" data-map="' + response.results[i].geom + '"><i class="ti-map-alt m-0"></i></button></td></tr>'
                        );
                }
                $("#tblData").append(rowData);               
            })
            .fail(function () {
                $('#spinner').hide();               
                return $("#tblData").append("<tr><td colspan=26 >No data</td></tr>");
            });
    },
    parserAction: function (action) {
        if (action == 1 || action == 2 || action == 3) {
            return "Building";
        } else {
            return "Store";
        }
    },
    viewMap: function () {
        $("#history").delegate("tbody tr td .btn-map", "click", function (e) {
            e.preventDefault();
            var geom = $(this).data('map');
            alert(geom);
        });
    },
    getAsset: function () {
        $.ajax({
            type: "GET",
            url: "/manage-assets/amount",            
            beforeSend: function () { $('#spinner').show(); },
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            async: true,
        })
            .done(function (response) {
                $('#spinner').hide();
                $('#motorcycle').text(response[0].total);
                $('#truck').text(response[1].total);
                $('#other').text(response[2].total);
                
            })
            .fail(function () {
                $('#spinner').hide();
                return ;
            });
    }
}