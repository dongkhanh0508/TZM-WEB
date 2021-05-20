function LoadMapAgain() {
    setTimeout(function () { mappick.invalidateSize(); }, 500);
}


var sgLocation = [10.772461, 106.698055]; //HCM location
var mappick = L.map("mappick", {
    center: sgLocation,
    zoom: 13,
});

var searchMappickControl = L.esri.Geocoding.geosearch().addTo(mappick);

var resultsMappick = new L.layerGroup().addTo(mappick);

var geocodeMappickService = L.esri.Geocoding.geocodeService();

var addressLocation = new L.marker(sgLocation, { draggable: true })
    .addTo(mappick)
    .bindPopup("HCM");
addressLocation.openPopup();

var confirmLocationButton = document.getElementById("confirmLocation");
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mappick);

searchMappickControl.on("results", function (data) {
    let content = "";
    for (var i = data.results.length - 1; i >= 0; i--) {
        content = data.results[i].text;
        addressLocation.setLatLng(data.results[i].latlng).update();
        addressLocation._popup.setContent(data.results[i].text);
        addressLocation.openPopup();
    }
});

addressLocation.on("dragend", function (e) {
    geocodeMappickService
        .reverse()
        .latlng(addressLocation.getLatLng())
        .run(function (error, result) {
            if (error) {
                return;
            }
            addressLocation.setLatLng(result.latlng).update();
            addressLocation._popup.setContent(result.address.Match_addr);
            addressLocation.openPopup();
        });
});

// function onMapClick(e) {
//   marker = new L.marker(e.latlng, {draggable:'true'});
//   marker.on('dragend', function(event){
//     var marker = event.target;
//     var position = marker.getLatLng();
//     marker.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
//     mappick.panTo(new L.LatLng(position.lat, position.lng))
//   });
//   mappick.addLayer(marker);
// };

// mappick.on('click', onMapClick);
confirmLocationButton.onclick = function () {
    if (addressLocation.getPopup()._content != "HCM") {
        document.getElementById("mapLocation").innerHTML = addressLocation.getPopup()._content;
        document.getElementById("locationPickInput-error").style.display = "none";
        document.getElementById("locationPickInput").style.background = "#fff";
        document.getElementById("locationPickInput").style.border = "1px solid rgba(0,0,0,.15)";
        document.getElementById("locationPickInput").style.color = "#464a4c";
        let geoJsonCreate = addressLocation.toGeoJSON().geometry;
        document.getElementById("wkt").value = Terraformer.WKT.convert(geoJsonCreate);
    }
};

document.getElementById("locationPickInput").onclick = function () {
    LoadMapAgain();
}