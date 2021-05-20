//Import
import { sgCoordinates, sgLatLngLocation } from "../../config/config.js";
import * as mapService from "./service/map-services.js";
import * as dashboardService from "./service/brand-dashboard-services.js";
import * as storeTabService from "./service/store-tab-services.js";
//Onload window
window.onload = () => {
    document.getElementById("footerBrandMap").style.display = "none";
}
//Variable
//SG view
var sgView = sgCoordinates;
//SG location
var sgLocation = sgLatLngLocation;
//Layer of brand store
var layerBrandStore = new L.LayerGroup();
//Layer of district
var layerDistrict = new L.LayerGroup();
//Layer of ward
var layerWard = new L.LayerGroup();
//Layer of campus
var layerCampus = new L.LayerGroup();
//Layer of store 
var layerStore = new L.LayerGroup();
//Layer of building
var layerBuilding = new L.LayerGroup();
//Layer of store of store tab
export var layerStoreOfTradeZone = new L.LayerGroup();
//Layer of trade zone
export var layerTradeZone = new L.LayerGroup();
//layer Of Group Zone border 
export var layerGroupZoneBorder = new L.LayerGroup();
//layer of group zone
var layerGroupZone = new L.LayerGroup();
//Id of Active TradeZone
var idOfActiveTradeZone = -1;
//Id of default trade zone
var idOfDefaultTradeZone = -1;
//Day detail List - 7 days
export var dayDetailList = [0, 0, 0, 0, 0, 0, 0];
//time slot detail List - 4 slot
export var timeSlotDetailList = [0, 0, 0, 0];
//Variable for checking is loaded trade zone tab
export var isLoadedTradeZoneTab = false;


//Create map and create load function
export var map = L.map("map").on('load', async function () {
    //set layer brand store
    layerBrandStore = mapService.loadBrandStoreLayer();
    //set layer district
    layerDistrict = mapService.loadDistrictLayer(sgView);
    //set layer ward
    layerWard = mapService.loadWardLayer(sgView);
    //set layer campus
    layerCampus = mapService.loadCampusLayer(sgView);
    //set id of active Trade Zone by load trade zone
    let setOfIdTradeZone = await mapService.loadTradeZone();
    idOfActiveTradeZone = setOfIdTradeZone.idActive;
    idOfDefaultTradeZone = setOfIdTradeZone.idDefault;
    //Load group zone for filter of store tab on the dashboard control
    storeTabService.loadGroupZoneForStoreTabFilter();
    //Load layers for store tab
    mapService.loadAllGroupZoneForStoreTab();

}).setView(sgLocation, 13);


//Create geosearch control from GeoCoding
var searchControl = L.esri.Geocoding.geosearch(
    {
        position: 'bottomright'
    }
).addTo(map);
//Create geo service from GeoCoding
var geocodeService = L.esri.Geocoding.geocodeService();
//Result of search value on search control from GeoCoding
var results = new L.layerGroup().addTo(map);
//Add title to map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 20,
    maxNativeZoom: 18,
    zoomControl: false
}).addTo(map);
L.control.locate({
    position: 'bottomright',
    strings: {
        title: "Show your location"
    }
}).addTo(map);
//Finish search and show result
searchControl.on("results", function (data) {
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng).bindPopup(data.results[i].text).openPopup());
    }
});
//Add zoom level
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update(map);
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (map) {
    this._div.innerHTML = '<b>Zoom level: </b>' + map.getZoom() + '<br>'
        + 'Building - Zoom 16+' + "<br>" + 'Store - Zoom 18+';
};
info.addTo(map);
//Map event
//Get zoom end event 
map.on('zoomend', function () {
    info.update(map);
});
//Catch event move end on map to show store location
map.on("moveend", async function () {
    if (map.getZoom() >= 18) {
        //Get store by getting api

    }
});
//Set zoom control location
map.zoomControl.remove();
L.control.zoom({
    position: 'bottomright'
}).addTo(map);
//Create Stack layer to show building, wards, stores, campus
var overlayMaps = {
    District: layerDistrict,
    Ward: layerWard,
    Campus: layerCampus
};
//Add layer control for map
L.control.layers(null, overlayMaps).addTo(map);
//Function for clicking on dashboard store control button
window.ShowStores = dashboardService.ShowStores;

//STORE TAB SERVICE
//Function for onchange on filter of group zone
window.FilterStoreByGroupZone = () => {
    storeTabService.filterStoreByGroupZone(idOfActiveTradeZone, map, layerStoreOfTradeZone, layerGroupZoneBorder, layerTradeZone);
}
//Function for onchange of store check box - Show option
window.StoreCheckBoxChange = () => {
    storeTabService.storeCheckBoxChange(layerStoreOfTradeZone, map);
}
//Function for onchange of group zone check box - Show option
window.GroupZoneBoxChange = () => {
    storeTabService.groupZoneBoxChange(layerGroupZoneBorder, map);
}
//Function for onchange of trade zone check box - Show option
window.TradeZoneBoxChange = () => {
    storeTabService.tradeZoneBoxChange(layerTradeZone, map);
}
//Function for set view for store of group zone
window.SetViewForStoreOfGroupZone = (lat, lng, id) => {
    mapService.setViewForStoreOfGroupZone(lat, lng, id, layerTradeZone, map);
}