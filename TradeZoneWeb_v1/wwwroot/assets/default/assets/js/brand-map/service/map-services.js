//Import
import * as layerStyle from "./layer-style-services.js"
import * as tradeZoneTabService from "./trade-zone-tab-services.js";
import { SetOfIdTradeZone } from "../class/set-of-id-trade-zone.js";
import { map, layerStoreOfTradeZone, layerGroupZoneBorder, layerTradeZone, isLoadedTradeZoneTab } from "../brand-map-module.js";
//Variable
//Create format icon for brand store location
var LeafIconBrandStore = L.Icon.extend({
    options: {
        iconSize: [42, 56],
        popupAnchor: [-3, -56],
        iconAnchor: [22, 56], // point of the icon which will correspond to marker's location
    },
});
//Create format icon for building location
var LeafIconBuilding = L.Icon.extend({
    options: {
        iconSize: [33, 44],
        popupAnchor: [-3, -44],
        iconAnchor: [22, 44], // point of the icon which will correspond to marker's location
    },
});
//layer trade zone postal
var layerTradeZonePostal;
//Create Brand store location icon
var brand_store_icon = new LeafIconBrandStore({
    iconUrl: "/assets/default/assets/images/building-icon-md/brand_store_icon_blue.svg"
})
//Create Store of trade zone icon
var store_of_trade_zone_icon = new LeafIconBrandStore({
    iconUrl: "/assets/default/assets/images/building-icon-md/brand_store_icon_red.svg"
})
//Create Building location icon
var building_default_icon = new LeafIconBuilding({
    iconUrl: "/assets/default/assets/images/building-icon-md/building_default_icon.svg",
});

//Load Brand Store layer
export const loadBrandStoreLayer = () => {
    let layerBrandStoreGroup = new L.LayerGroup();
    $.ajax({
        url: "/BrandMap/GetAllBrandStore",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        async: true,
    }).done(function (response) {
        if (response != null) {
            for (let i = 0; i < response.length; i++) {
                if (response[i].status == 1 || response[i].status == 2 || response[i].status == 4) {
                    let layerBrandStorePostal =
                        L.marker([response[i].geome.coordinates[1], response[i].geome.coordinates[0]])
                            .bindPopup(response[i].name)
                            .on('click', function (e) {
                                document.getElementById('seeStoreDetailButton').click();
                                initStoreModal(response[i].id);
                            })
                            .on('mouseover', function (e) {
                                e.target.openPopup();
                            })
                            .on('mouseout', function (e) {
                                e.target.closePopup();
                            })
                    layerBrandStorePostal.setIcon(brand_store_icon);
                    //let detail_button = '<div class="text-right"><button class="btn btn-mini btn-info" data-toggle="modal" data-target="#seeStoreDetail" onclick="initStoreModal(\'' +
                    //    response[i].id +
                    //    "'" +
                    //    ')" >Detail</button></div>';
                    //layerBrandStorePostal.bindPopup(response[i].name + "<br><br>" + detail_button);
                    layerBrandStoreGroup.addLayer(layerBrandStorePostal);
                }
            }
        }

    });
    return layerBrandStoreGroup;
}
//Load district by getting Api
export const loadDistrictLayer = (sgView) => {
    let layerDistrictGroup = new L.LayerGroup();
    $.ajax({
        url: "/BrandMap/LoadDistrictForBrandMap",
        method: 'POST',
        data: JSON.stringify({
            CoordinateString: `${sgView}`
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        async: true,
    }).done(function (response) {
        let layerDistrictPostal = L.geoJson(response, {
            onEachFeature: function (feature, layer) {
                layer.setStyle({
                    color: "black",
                    weight: 2
                }).bindPopup(feature.properties.f2).on("click", function () {
                });
            },
        });
        layerDistrictGroup.addLayer(layerDistrictPostal);
    });
    return layerDistrictGroup;
}
//Load district by getting api
export const loadWardLayer = (sgView) => {
    let layerWardGroup = new L.LayerGroup();
    //Load wards by get Api
    $.ajax({
        url: "/BrandMap/LoadWardForBrandMap",
        method: 'POST',
        data: JSON.stringify({
            CoordinateString: `${sgView}`
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        async: true,
    }).done(function (response) {
        let layerWardPostal = L.geoJson(response, {
            onEachFeature: function (feature, layer) {
                layer.setStyle({
                    color: "red",
                    weight: 1
                }).bindPopup(feature.properties.f2).on("click", function () {
                });
            },
        });
        layerWardGroup.addLayer(layerWardPostal);
    });
    return layerWardGroup;
}
//Load Campus by getting api
export const loadCampusLayer = (sgView) => {
    let layerCampusGroup = new L.LayerGroup();
    //Get Campus by getting api
    $.ajax({
        url: "/BrandMap/LoadCampusForBrandMap",
        method: 'POST',
        data: JSON.stringify({
            CoordinateString: `${sgView}`
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        async: true,
    }).done(function (response) {
        let layerCampusPostal = L.geoJson(response, {
            onEachFeature: function (feature, layer) {
                layer.setStyle({
                    color: "green",
                }).bindPopup(feature.properties.f2).on("click", function () {
                });
            },
        });
        layerCampusGroup.addLayer(layerCampusPostal);
    });
    return layerCampusGroup;
}
//Load trade zone by getting api
export const loadTradeZone = async () => {
    let idOfDefaultTradeZone = -1;
    let idOfActiveTradeZone = -1;
    await $.ajax({
        url: "/BrandMap/GetTradeZone",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        async: true,
    }).done(function (response) {
        //Set variable for data of body
        let data = "";
        //Set variable for data of filter
        let dataForSelection = "";
        //Check if response's length > 0
        if (response.length > 0) {
            for (var i = 0; i < response.length; i++) {
                let isActive = response[i].isActive;
                let id = response[i].id;
                let name = response[i].name;
                //Set default active trade zone 
                if (i == 0) {
                    idOfDefaultTradeZone = id;
                }
                //Check if avtive
                if (isActive) {
                    //Set data for filter - verions selection
                    dataForSelection = dataForSelection + '<option value="' + id + '">' + name + ' (Active)</option>';
                    idOfActiveTradeZone = id;
                } else {
                    dataForSelection = dataForSelection + '<option value="' + id + '">' + name + '</option>';
                }
            }
        }
        document.getElementById("filterVersionTradeZone").innerHTML = dataForSelection;
        //ProcessingResponseForEachTradeZone(response, layerTradeZoneSlot1, tableSlot);
        
    })
    if (!isLoadedTradeZoneTab) {
        await tradeZoneTabService.viewTradeZoneVersionDetail(idOfDefaultTradeZone);
        isLoadedTradeZoneTab == true;
    }
    let setId = new SetOfIdTradeZone(idOfDefaultTradeZone, idOfActiveTradeZone)
    return setId;
}
//Load store 
export const loadStoreLayer = () => {
    let bot = map.getBounds()._southWest.lat;
    let left = map.getBounds()._southWest.lng;
    let top = map.getBounds()._northEast.lat;
    let right = map.getBounds()._northEast.lng;
    let coor = `${right} ${top}, ${left} ${top}, ${left} ${bot}, ${right} ${bot}, ${right} ${top}`;
    $.ajax({
        url: "/BrandMap/GetStoreForBrandMap",
        method: 'POST',
        data: JSON.stringify({
            CoordinateString: `${coor}`
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        async: true,
    }).done(function (response) {
        L.geoJson(response, {
            onEachFeature: function (feature, layer) {
                let coor = feature.geometry.coordinates;
                let lat = coor[1];
                let lng = coor[0]
                let marker = L.marker([lat, lng], { id: feature.properties.f4 })
                //let detail_button = '<div class="text-right"><button class="btn btn-mini btn-info" data-toggle="modal" data-target="#seeStoreDetail" onclick="initStoreModal(\'' +
                //    feature.properties.f4 +
                //    "'" +
                //    ')" >Detail</button></div>';
                marker = SetIconForLocationStore(feature.properties.f1, marker)
                    .bindPopup(feature.properties.f2)
                    .on('click', function () {
                        document.getElementById("seeStoreDetailButton").click();
                        initStoreModal(feature.properties.f4);
                    })
                    .on('mouseover', function (e) {
                        e.target.openPopup();
                    })
                    .on('mouseout', function (e) {
                        e.target.closePopup();
                    });;
                //marker.bindPopup(feature.properties.f2 + "<br><br>" + detail_button);
                layerStorePostal.addLayer(marker);

            },
        });
        layerStoreGroup.addLayer(layerStorePostal);
    });
}
//View store of group zone filter
export const ViewStoreOfGroupZoneFilter = async (nameGz, idGz, idOfActiveTradeZone) => {
    //Call api
    $.ajax({
        url: "/BrandMap/GetStoreByGroupZoneId",
        data: {
            IdGroupZone: idGz,
            IdTradeZoneVer: idOfActiveTradeZone
        },
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
            document.getElementById("loadingMainScreen").style.display = "flex";
        },
        async: true,
    }).done(function (response) {
        //Reset layer of store, group, trade zone by remove
        removeLayerGroup(layerStoreOfTradeZone);
        removeLayerGroup(layerGroupZoneBorder);
        removeLayerGroup(layerTradeZone);
        //Let cen
        //Create variable for store and trade zone of store
        let { groupZoneBoundary, listStoreTradeZone } = response;
        //Create data variable for table
        let data = "";
        //Processing for response of store and trade zone of store
        if (listStoreTradeZone != null && listStoreTradeZone.length > 0) {
            //Set display for table
            document.getElementById("tableOfStoreOfGroupZone").style.display = "block";
            document.getElementById("noActiveTradeZoneNotification").style.display = "none";
            //Line of group zone that is watching
            let layerGroupZonePostal = L.geoJson(groupZoneBoundary, {
                style: {
                    color: dominos_red_icon_color,
                },
                onEachFeature: function (feature, layer) {
                    let center = layer.getBounds().getCenter();
                    layer.type = 'line';
                    //Set view by flying
                    map.flyTo([center.lat, center.lng], 14);
                }
            });
            //Process list store trade zone
            for (var i = 0; i < listStoreTradeZone.length; i++) {
                let { store, tradeZone } = listStoreTradeZone[i];
                let name = store.name;
                let id = tradeZone.id;
                let weight = tradeZone.weight;
                let center;
                //Layer of store
                let layerStorePostal = L.geoJson(store.geom, {
                    onEachFeature: function (feature, layer) {
                        center = layer._latlng;
                        layer.setIcon(store_of_trade_zone_icon).bindPopup(name);
                        layer.on({
                            mouseover: function (e) {
                                e.target.openPopup();
                            },
                            mouseout: function (e) {
                                e.target.closePopup();
                            }
                        });


                    }
                });
                //Layer of trade zone of store
                layerTradeZonePostal = L.geoJson(tradeZone.geom, {
                    style: layerStyle.styleTradeZone,
                    onEachFeature: function (feature, layer) {
                        //Center 

                        layer.bindPopup(id + '. ' + name + '<br>Weight: ' + weight)
                        layer.on({
                            mouseover: layerStyle.highlightFeatureOfTradeZone,
                            mouseout: resetHighlightTradeZone
                        });
                        layer.id = id;
                        //For the data of table
                        data = data + '<tr>\
                                    <th class="text-center" scope = \"row\">'+ (i + 1) + '</th>\
                                    <td class="tabledit-view-mode">\
                                        <span class="tabledit-span">'+ name + '</span>\
                                    </td>\
                                    <td class="tabledit-view-mode">\
                                        <span class="tabledit-span">'+ weight + '</span>\
                                    </td>\
                                    <td style="white-space: nowrap; width: 1%; text-align: center">\
                                        <div class="btn-group btn-group-sm" style="float: none">\
                                            <button type = "button"\
                                                    class="tabledit-edit-button btn-mini btn btn-primary waves-effect waves-light"\
                                                    title="Move to location on the map"\
                                                    style = "float: none"\
                                                    onclick = "SetViewForStoreOfGroupZone(\''+ center.lat + '\'' + ", '" + center.lng + '\', \'' + id + '\')">\
                                                <span class="icofont icofont-location-arrow"></span>\
                                            </button>\
                                        </div>\
                                    </td>\
                                </tr>';
                    }
                });
                //Add Line, store, trade zone to a big layer 
                layerGroupZoneBorder.addLayer(layerGroupZonePostal);
                layerStoreOfTradeZone.addLayer(layerStorePostal);
                layerTradeZone.addLayer(layerTradeZonePostal);
                //Add data
                document.getElementById("tbodyOfStoreOfGroupZone").innerHTML = data;
                //Set title for tab
                //document.getElementById("titleOfStoreTradeZone").innerHTML = "Store of Group zone <b>" + nameGz + "</b>";
                //Set coverage 
                //document.getElementById("coverageOfGroupZone").innerHTML = "Coverage: <b>" + coverage + "%</b>";
            }
        } else {
            document.getElementById("tableOfStoreOfGroupZone").style.display = "none";
            document.getElementById("noActiveTradeZoneNotification").style.display = "block";
        }
        checkCheckBoxForShowing(layerStoreOfTradeZone, layerGroupZoneBorder, layerTradeZone, map);
        document.getElementById("loadingMainScreen").style.display = "none";
    })
}
//Remove layer group 
export const removeLayerGroup = (layerGroup) => {
    if (layerGroup != null) {
        layerGroup.eachLayer(function (layer) {
            map.removeLayer(layer);
            layerGroup.removeLayer(layer);
        });
    }
}
//Reset feature of trade zone
const resetHighlightTradeZone = (e) => {
    layerTradeZonePostal.resetStyle(e.target);
}
//Load all group zone for store tab when filter option is "All"
export const loadAllGroupZoneForStoreTab = async () => {
    //Call api
    $.ajax({
        url: "/BrandMap/GetAllElementOfTradeZoneVersion",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
            document.getElementById("loadingMainScreen").style.display = "flex";
        },
        async: true,
    }).done(function (response) {
        if (response == 204) {
            //Set display for table
            document.getElementById("tableOfStoreOfGroupZone").style.display = "none";
            document.getElementById("noActiveTradeZoneNotification").style.display = "block";
        } else {
            removeLayerGroup(layerStoreOfTradeZone);
            removeLayerGroup(layerGroupZoneBorder);
            removeLayerGroup(layerTradeZone);
            //Set display for table
            document.getElementById("tableOfStoreOfGroupZone").style.display = "block";
            document.getElementById("noActiveTradeZoneNotification").style.display = "none";
            //Process response
            if (response.length > 0) {
                let data = "";
                for (var i = 0; i < response.length; i++) {
                    let center;
                    //Set variable
                    let { geom: geom, stores: stores, tradeZones: tradeZones } = response[i];
                    //Create layer for group zone
                    let layerGroupZonePostal = L.geoJson(geom, {
                        style: {
                            color: dominos_red_icon_color,
                        }
                    });
                    //Add to layer Group Zone
                    layerGroupZoneBorder.addLayer(layerGroupZonePostal);
                    //Process store
                    if (stores.length > 0) {
                        for (var i = 0; i < stores.length; i++) {
                            let name = stores[i].name;
                            let { geom: geometry, id: id, name: tradeZoneName, totalWeight: weight } = tradeZones[i];
                            //Create layer for store
                            let layerStorePostal = L.geoJson(stores[i].geom, {
                                onEachFeature: function (feature, layer) {
                                    center = layer._latlng;
                                    layer.setIcon(store_of_trade_zone_icon).bindPopup(name);
                                    layer.on({
                                        mouseover: function (e) {
                                            e.target.openPopup();
                                        },
                                        mouseout: function (e) {
                                            e.target.closePopup();
                                        }
                                    });
                                }
                            });
                            //Add Store
                            layerStoreOfTradeZone.addLayer(layerStorePostal);
                            layerTradeZonePostal = L.geoJson(geometry, {
                                style: layerStyle.styleTradeZone,
                                onEachFeature: function (feature, layer) {
                                    //Center 

                                    layer.bindPopup(id + '. ' + name + '<br>Weight: ' + weight)
                                    layer.on({
                                        mouseover: layerStyle.highlightFeatureOfTradeZone,
                                        mouseout: resetHighlightTradeZone
                                    });
                                    layer.id = id;
                                    //For the data of table
                                    data = data + '<tr>\
                                    <th class="text-center" scope = \"row\">'+ (i + 1) + '</th>\
                                    <td class="tabledit-view-mode">\
                                        <span class="tabledit-span">'+ name + '</span>\
                                    </td>\
                                    <td class="tabledit-view-mode">\
                                        <span class="tabledit-span">'+ weight + '</span>\
                                    </td>\
                                    <td style="white-space: nowrap; width: 1%; text-align: center">\
                                        <div class="btn-group btn-group-sm" style="float: none">\
                                            <button type = "button"\
                                                    class="tabledit-edit-button btn-mini btn btn-primary waves-effect waves-light"\
                                                    title="Move to location on the map"\
                                                    style = "float: none"\
                                                    onclick = "SetViewForStoreOfGroupZone(\''+ center.lat + '\'' + ", '" + center.lng + '\', \'' + id + '\')">\
                                                <span class="icofont icofont-location-arrow"></span>\
                                            </button>\
                                        </div>\
                                    </td>\
                                </tr>';
                                }
                            });
                            //Add to layer trade zone
                            layerTradeZone.addLayer(layerTradeZonePostal);
                        }
                    }
                }
                //
                document.getElementById("tbodyOfStoreOfGroupZone").innerHTML = data;
                document.getElementById("loadingMainScreen").style.display = "none";
            }
            checkCheckBoxForShowing(layerStoreOfTradeZone, layerGroupZoneBorder, layerTradeZone, map);
        }
    }).fail(function (response) {
    })
}
//Check if check boxes are check or not for showing layer
const checkCheckBoxForShowing = () => {
    //Stores checkbox
    let showAllStoreCheckBox = document.getElementById("showAllStoreCheckBox");
    if (showAllStoreCheckBox.checked) {
        map.addLayer(layerStoreOfTradeZone);
    } else {
        map.removeLayer(layerStoreOfTradeZone);
    }
    //Group check box
    let showGroupZoneCheckBox = document.getElementById("showGroupZoneCheckBox");
    if (showGroupZoneCheckBox.checked) {
        map.addLayer(layerGroupZoneBorder);
    } else {
        map.removeLayer(layerGroupZoneBorder)
    }
    //Trade check box
    let showTradeZoneCheckBox = document.getElementById("showTradeZoneCheckBox");
    if (showTradeZoneCheckBox.checked) {
        map.addLayer(layerTradeZone);
    } else {
        map.removeLayer(layerTradeZone)
    }
}
//Set view for store of group zone
export const setViewForStoreOfGroupZone = (lat, lng, id) => {
    layerTradeZone.eachLayer(function (layer) {
        if (layer._layers[layer._leaflet_id - 1].type != 'line') {
            layer.setStyle(layerStyle.styleTradeZone);
        }
        if (layer._layers[layer._leaflet_id - 1].id == id) {
            layer.setStyle({
                fillColor: dominos_red_icon_color,
                weight: 5,
                color: dominos_red_icon_color,
                dashArray: '',
                fillOpacity: 0.7
            });
        }
    })

    map.flyTo([lat, lng], 16);
}