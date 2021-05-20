var sgLocation = [10.772461, 106.698055];
var map = L.map("map").setView(sgLocation, 13);
var layerViolationLine = new L.LayerGroup();
//Add title to map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 20,
    maxNativeZoom: 18,
    zoomControl: false
}).addTo(map);

function LoadStoreLocationOnMapAgain(id) {
    if (layerViolationLine != null) {
        layerViolationLine.eachLayer(function (layer) {
            map.removeLayer(layer);
            layerViolationLine.removeLayer(layer);
        });
    }
    $.ajax({
        url: "/violation-logs/details/" + id,
        dataType: "json",
        beforeSend: function () { $('#spinner').show(); },
        contentType: "application/json;charset=utf-8",
        async: true,
    }).done(function (response) {
        let layer = L.geoJson(response.geometry, {
            style: {
                color: dominos_red_icon_color
            },
            onEachFeature: function (feature, layer) {
                let center = layer.getBounds().getCenter();
                map.setView(center, 16);
            }
        });
        layerViolationLine.addLayer(layer);
        layerViolationLine.addTo(map);
    })
    //let view = [];
    //view.push(y);
    //view.push(x);
    //if (storeLocation != null) {
    //    storeMap.removeLayer(storeLocation);
    //    storeLocation = new L.marker(view)
    //        .addTo(storeMap);
    //}
    //storeMap.setView(view, 16)
    setTimeout(function () { map.invalidateSize(); }, 500);
}
