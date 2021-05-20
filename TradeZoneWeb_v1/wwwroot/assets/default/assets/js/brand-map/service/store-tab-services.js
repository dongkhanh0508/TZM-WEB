//Import
import * as mapService from "./map-services.js";
//Load group zone for store Tab filter
export const loadGroupZoneForStoreTabFilter = async () => {
    let data = '<option value="-1">All stores</option>';
    $.ajax({
        url: "/BrandMap/GetGroupZone",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        async: true,
    }).done(function (response) {
        if (response != "Error") {
            L.geoJson(response, {
                onEachFeature: function (feature, layer) {
                    let id = feature.properties.f4;
                    let name = feature.properties.f1;
                    data = data + '<option value="' + id + '\">' + name + '</option>';
                    document.getElementById("filterStoreControlTab").innerHTML = data;
                }
            })
        }
    })

}
//Filter store by group zone
export const filterStoreByGroupZone = (idOfActiveTradeZone) => {
    let layer = new L.LayerGroup();
    let select = document.getElementById("filterStoreControlTab");
    if (select.value != -1) { // Choose group zone
        //set group zone name
        let groupZoneName = select.options[select.selectedIndex].text;
        //Call api for group zone
        layer = mapService.ViewStoreOfGroupZoneFilter(groupZoneName, select.value,
            idOfActiveTradeZone);
    } else { // All stores
        //Load for "all" option
        mapService.loadAllGroupZoneForStoreTab();
    }
    return layer;
}
//Check box for store on change
export const storeCheckBoxChange = (layerStoreOfStoreTab, map) => {
    let showAllStoreCheckBox = document.getElementById("showAllStoreCheckBox");
    if (showAllStoreCheckBox.checked) {
        map.addLayer(layerStoreOfStoreTab);
    } else {
        map.removeLayer(layerStoreOfStoreTab);
    }
}
//Check box for Group zone onchange
export const groupZoneBoxChange = (layerGroupZoneOfStoreTab, map) => {
    let showGroupZoneCheckBox = document.getElementById("showGroupZoneCheckBox");
    if (showGroupZoneCheckBox.checked) {
        map.addLayer(layerGroupZoneOfStoreTab);
    } else {
        map.removeLayer(layerGroupZoneOfStoreTab)
    }
}
//Check box for Group zone onchange
export const tradeZoneBoxChange = (layerTradeZoneOfStoreTab, map) => {
    let showTradeZoneCheckBox = document.getElementById("showTradeZoneCheckBox");
    if (showTradeZoneCheckBox.checked) {
        map.addLayer(layerTradeZoneOfStoreTab);
    } else {
        map.removeLayer(layerTradeZoneOfStoreTab)
    }
}