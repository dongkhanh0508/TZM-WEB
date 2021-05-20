//Import
import { sgCoordinates, sgLatLngLocation } from "../../config/config.js";
import * as locationService from "./service/location-services.js";

//Create map and create load function
export var map = L.map("map").setView(sgLatLngLocation, 13);
//create layer for store
export var layerStoreGroup = new L.LayerGroup();
//Create geo service from GeoCoding
var geocodeService = L.esri.Geocoding.geocodeService();
////Create geosearch control from GeoCoding
var searchControl = L.esri.Geocoding.geosearch().addTo(map);
//Finish search and show result
searchControl.on("results", function (data) {
    if (map.getMarkerById("OCL1")) {
        map.removeLayer(map.getMarkerById("OCL1"));
    }
    for (let i = data.results.length - 1; i >= 0; i--) {
        let latlng = data.results[i].latlng;
        onclickLocation = L.marker(latlng, {
            id: "OCL1",
        })
            .addTo(map)
            .bindPopup(data.results[i].text
                + '</br></br>'
                + '<div class="text-right">\
                    <button class="btn btn-mini btn-info"\
                            data-toggle="modal"\
                            data-target="#seeSystemZoneDetail"\
                            onclick="InitLocaton(\'' + latlng.lng + ' ' + latlng.lat + '\')">Check</button>')
            .openPopup();
    }
});
//Init onclick loction variable
var onclickLocation = [];

//Add title to map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 20,
    maxNativeZoom: 18,
    zoomControl: false
}).addTo(map);
//Define function to get Marker by idea
L.Map.include({
    getMarkerById: function (id) {
        let marker = null;
        this.eachLayer(function (layer) {
            if (layer instanceof L.Marker) {
                if (layer.options.id == id) {
                    marker = layer;
                }
            }
        });
        return marker;
    }
});
//Add shoo location button control
L.control.locate({
    position: 'topleft',
    strings: {
        title: "Show your location"
    }
}).addTo(map);
//Set style for locate button
document.getElementsByClassName("fa fa-map-marker")[0].style.marginTop = 5;
//Click to show location on click on the map
map.on("click", function (e) {

    if (map.getMarkerById("OCL1")) {
        map.removeLayer(map.getMarkerById("OCL1"));
    }
    geocodeService
        .reverse()
        .latlng(e.latlng)
        .run(function (error, result) {
            let latlng = result.latlng;
            if (error) {
                return;
            }
            onclickLocation = L.marker(result.latlng, {
                id: "OCL1",
            })
                .addTo(map)
                .bindPopup(result.address.Match_addr
                    + '</br></br>'
                    + '<div class="text-right">\
                    <button class="btn btn-mini btn-info"\
                            data-toggle="modal"\
                            data-target="#addLocationModal"\
                            onclick="InitLocaton(\'' + latlng.lng + ' ' + latlng.lat + '\')">Check</button>')
                .openPopup();
        });
});
//Init location
window.InitLocaton = (latlng) => {
    document.getElementById("latLng").value = latlng;
}
//Check location function 
window.CheckLocation = () => {
    let time = document.getElementById("timePicker").value;
    let day = document.getElementById("dayPicker").value;
    let latlng = document.getElementById("latLng").value;
    locationService.checkLocation(latlng, time, day);
}
//onload
window.onload = () => {
    let date = new Date();
    let currentTime = date.toISOString().substring(11, 16);
    document.getElementById("timePicker").value = currentTime;
    document.getElementById("footerBrandMap").style.display = "none";
}