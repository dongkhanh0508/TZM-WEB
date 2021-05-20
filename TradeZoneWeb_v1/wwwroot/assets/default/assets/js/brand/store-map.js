document.getElementById("storeOnMap").style.height = "100%";

function LoadStoreLocationOnMapAgain(y, x) {
    let view = [];
    view.push(y);
    view.push(x);
    if (storeLocation != null) {
        storeMap.removeLayer(storeLocation);
        storeLocation = new L.marker(view)
            .addTo(storeMap);
    }
    storeMap.setView(view, 16)
    setTimeout(function () { storeMap.invalidateSize(); }, 500);
}

var storeMap = L.map("storeOnMap", {
    center: [10.772461, 106.698055],
    zoom: 16,
});

var storeLocation = new L.marker([10.772461, 106.698055])
    .addTo(storeMap)

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(storeMap);