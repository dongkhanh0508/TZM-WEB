//window onload
window.onload = function () {
    document.getElementById("footerBrandMap").style.display = "none";
    $('#storeSelect').multiSelect();

}
//load the first time
var isLoad = false;
//Viewing asset
var isViewing = false;
//Asset id that is viewing
var assetIdViewing = -1;
//Tracking asset
var tracking
//Init Map by location and zoom
var sgView = "107.8890380356461 11.183987034480577, 105.7796630356461 11.183987034480577, 105.7796630356461 10.361050008948766, 107.8890380356461 10.361050008948766, 107.8890380356461 11.183987034480577";
var sgLocation = [10.772461, 106.698055]; //HCM location
var current_position, current_accuracy;
var map = L.map("map").on('load', loadMap).setView(sgLocation, 13);
var layerPostal;
var layerGroup;
//Layer for free ward - Group Zone
var layerFreeWardPostal;
var layerFreeWardGroup = new L.LayerGroup();
//Layer for district
var layerDistrictPostal;
var layerDistrictGroup = new L.LayerGroup();
//Layer for ward
var layerWardPostal;
var layerWardGroup = new L.LayerGroup();
//layer for building
var layerBuildingPostal;
var layerBuildingGroup = new L.LayerGroup();
//Layer for center building
var layerCenterPostal;
var layerCenterGroup = new L.LayerGroup();
//Layer for Campus
var layerCampusPostal;
var layerCampusGroup = new L.LayerGroup();
//Layer for store
var layerStorePostal = new L.LayerGroup();
var layerStoreGroup = new L.LayerGroup();
//Layer for Brand store
var layerBrandStorePostal;
var layerBrandStoreGroup = new L.LayerGroup();
var layerBrandStoreGroupSlot1 = new L.LayerGroup();
var layerBrandStoreGroupSlot2 = new L.LayerGroup();
var layerBrandStoreGroupSlot3 = new L.LayerGroup();
var layerBrandStoreGroupSlot4 = new L.LayerGroup();
//Create variable for initing layer trade zone
var layerInitingTradeZonePostal
var layerInitingTradeZone1 = new L.LayerGroup();
var layerInitingTradeZone2 = new L.LayerGroup();
var layerInitingTradeZone3 = new L.LayerGroup();
var layerInitingTradeZone4 = new L.LayerGroup();
//Create variable for layer trade zone
var layerTradeZonePostal
var layerStoreOfTradeZonePostal
var layerTradeZoneActive = new L.LayerGroup();
var layerTradeZoneSlot1 = new L.LayerGroup();
var layerTradeZoneSlot2 = new L.LayerGroup();
var layerTradeZoneSlot3 = new L.LayerGroup();
var layerTradeZoneSlot4 = new L.LayerGroup();
//Create variable for layer system zone
var layerSystemZonePostal;
var layerSystemZoneGroup = new L.LayerGroup();
//Create variable for layer asset 
var layerAsset = new L.LayerGroup();
//Create variable for layer remain zone
var layerRemainZonePostal;
var layerRemainZone = new L.LayerGroup();
//Create variable for layer detail trade zone
var layerDetailTradeZonePostal;
var layerDetailTradeZone = new L.LayerGroup();
//Create variable for group zone of tradezone version
var layerGroupZoneOfTradeZonePostal;
var layerGroupZoneOfTradeZone = new L.LayerGroup();
//Create variable for layers of store tab
var layerStoreOfStoreTab = new L.LayerGroup();
var layerGroupZoneOfStoreTab = new L.LayerGroup();
var layerTradeZoneOfStoreTab = new L.LayerGroup();
//Create layer for group zone
var layerGroupZone;
//Create format icon
var LeafIcon = L.Icon.extend({
    options: {
        iconSize: [15, 15],
    },
});
//Get element by id 
var descriptionTextArea = document.getElementById("descriptionTextArea");
//Create format icon for store location
var LeafIconStore = L.Icon.extend({
    options: {
        iconSize: [24, 32],
    },
});
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
//Create format icon for asset location
var LeafIconAsset = L.Icon.extend({
    options: {
        iconSize: [24, 32]
    },
});
//Create motor location icon
var motor_icon = new LeafIconAsset({
    iconUrl: "/assets/default/assets/images/assets-icon/motor_location.png"
})
//Create truck location icon
var truck_icon = new LeafIconAsset({
    iconUrl: "/assets/default/assets/images/assets-icon/car_location.png"
})
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
//Create store location icon
//Bakery - 1,2
var bakery_location = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/bakery-default.png"
})
//Barber - 3
var barber_location = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/barber-default.png"
});
//book shop - 4
var book_location = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/book-shop-default.png"
});
//car showrom - 5
var car_location = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/car-showroom-default.png"
});
//clothes shop - 6
var clothes_location = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/clothes-shop-default.png"
});
//Cafe - 7
var cafe_location = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/coffee-default.png"
});
//fastfood - 8 
var fastfood_location = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/fastfood-default.png"
});
//Grocery store - 9
var grocery_location = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/grocery-default.png"
});
//bike - 10
var bike_location = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/bike-default.png"
});
//Petrol station - 11
var petrol_location = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/petrol-default.png"
});
//Pet shop - 12
var pet_shop_location = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/pet-shop-default.png"
});
//Pharmacy - 13
var pharmacy_location = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/pharmacy-need-survey.png"
});
//Restaurant - 14
var restaurant_location = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/restaurant-default.png"
});
//Stationer - 15
var stationer_location = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/stationer-default.png"
});
//default 
var default_location = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/default-store-surveyed.png"
});
//Create GPS location icon
var gpsLocation = new LeafIcon({
    iconUrl: "/assets/default/assets/images/gps-icon.png",
});
//Create onclick location icon
var onclickLocation_icon = new LeafIcon({
    iconUrl: "/assets/default/assets/images/onClickPoint.png",
});
var btnShowLocation = document.getElementById("btnShowLocation");
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
//Init onclick loction variable
var onclickLocation = [];
//Create HCM district information variable
var districtInformation;
//Create variable for list group zone id
var listElementOfGroupZoneId = [];
//Create variable for list group zone name
var listElementOfGroupZoneName = [];
//Data for group zone
var dataForGroupZoneTable = "";
//Time slot variable
var timeSlot = 1;
//Day pick list - 7 days
var dayPickList = [0, 0, 0, 0, 0, 0, 0];
//Time slot list - 4 slot
var timeSlotPickList = [0, 0, 0, 0];
//Day detail List - 7 days
var dayDetailList = [0, 0, 0, 0, 0, 0, 0];
//time slot detail List - 4 slot
var timeSlotDetailList = [0, 0, 0, 0];
//Create variable for id of trade zone active
var idOfActiveTradeZone = -1;
var idOfDefaultTradeZone = -1;
//--------------------------------------------------------------------

//function set icon 
function SetIconForLocationStore(type, marker) {
    switch (type) {
        case "Baker": // 1 2
            return marker.setIcon(bakery_location);
            break;
        case "Barbers": // 3
            return marker.setIcon(barber_location);
            break;
        case "Bookshop": // 4
            return marker.setIcon(book_location);
            break;
        case "Car showroom": // 5
            return marker.setIcon(car_location);
            break;
        case "Clothes shop": // 6
            return marker.setIcon(clothes_location);
            break;
        case "Coffee": //7
            return marker.setIcon(cafe_location);
            break;
        case "Fast food": //8
            return marker.setIcon(fastfood_location);
            break;
        case "Grocery store": //9
            return marker.setIcon(grocery_location);
            break;
        case "Motobycle shop": //10 
            return marker.setIcon(bike_location);
            break;
        case "Petrol station": //11
            return marker.setIcon(petrol_location);
            break;
        case "Petshop": //12
            return marker.setIcon(pet_shop_location);
            break;
        case "Pharmacy": //13
            return marker.setIcon(pharmacy_location);
            break;
        case "Restaurant": //14
            return marker.setIcon(restaurant_location);
            break;
        case "Stationer": //15
            return marker.setIcon(stationer_location);
            break;
        default:
            return marker.setIcon(default_location);
    }
}

//Add title to map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 20,
    maxNativeZoom: 18,
    zoomControl: false
}).addTo(map);
//Add show location control
L.control.locate({
    position: 'bottomright',
    strings: {
        title: "Show your location"
    }
}).addTo(map);
//Set style for locate button
document.getElementsByClassName("fa fa-map-marker")[0].style.marginTop = 5;
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
//Get zoom end event 
map.on('zoomend', function () {
    info.update(map);
});
//Set zoom control location
map.zoomControl.remove();
L.control.zoom({
    position: 'bottomright'
}).addTo(map);

//define function to check layer
async function checkLayer() {
    await layerCenterGroup.clearLayers();
    await layerBuildingGroup.clearLayers();
    await layerStoreGroup.clearLayers();
}
function StyleGroupZone() {
    return {
        fillColor: dominos_blue_icon_color,
        weight: 3,
        opacity: 1,
        color: dominos_blue_icon_color,
        dashArray: '3',
        fillOpacity: 0.3
    }
}
function ZoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
function HighlightGroupZone(e) {
    let layer = e.target;
    layer.setStyle({
        fillColor: '#1ABC9C',
        weight: 5,
        color: '#13866F',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
function ResetHighlightGroupZone(e) {
    layerGroupZone.resetStyle(e.target);
}
function OnEachFeatureGroupZone(feature, layer) {
    let center = layer.getBounds().getCenter();
    dataForGroupZoneTable = dataForGroupZoneTable + '<tr>\
        <th class="text-center" scope = "row" >'+ feature.properties.f4 + '</th >\
        <td class="tabledit-view-mode">\
            <span class="tabledit-span">'+ feature.properties.f1 + '</span>\
        </td>\
        <td style="white-space: nowrap; width: 1%">\
        <div class="tabledit-toolbar btn-toolbar" style="text-align: left;">\
        <div class="btn-group btn-group-sm" style = "float: none" >\
            <button type="button"\
                    class="tabledit-edit-button btn-mini btn btn-info waves-effect waves-light"\
                    title="View on map"\
                    style = "float: none; margin: 5px"\
                    onclick = "SetViewBrandGroupZone(\''+ center.lat + '\'' + ", '" + center.lng + '\')">\
                    <span class="icofont icofont-location-arrow"></span>\
            </button>\
            <button type="button"\
                    class="tabledit-edit-button btn-mini btn btn-primary waves-effect waves-light"\
                    style = "float: none; margin: 5px" >\
                    <span class="icofont icofont-ui-edit"></span>\
            </button>\
            <button type="button"\
                    class="tabledit-delete-button btn-mini btn btn-danger waves-effect waves-light"\
                    onclick="DeleteGroupZone('+ feature.properties.f4 + ')"\
                    style = "float: none; margin: 5px" >\
                    <span class="icofont icofont-ui-delete"></span>\
            </button>\
        </div>\
        </div>\
        </td>\
    </tr> ';
    let delete_button = '<div class="text-right"><button class="btn btn-mini btn-danger" onclick="DeleteGroupZone(' +
        feature.properties.f4 +
        ')" >Delete</button></div>';
    layer.on({
        click: ZoomToFeature,
        mouseover: HighlightGroupZone,
        mouseout: ResetHighlightGroupZone,
    }).bindPopup(feature.properties.f4 + ". " + feature.properties.f1 + "<br><br>" + delete_button);

}
function DeleteGroupZone(id) {
    Swal.fire({
        title: 'Do you want to delete it?',
        text: "If this group zone has a trade zone, the trade zone will disappear. Make sure that you know it!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1abc9c',
        cancelButtonColor: '#9ca5ab',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/BrandMap/DeleteGroupZone",
                dataType: "json",
                method: 'POST',
                data: JSON.stringify({
                    Id: id
                }),
                contentType: "application/json;charset=utf-8",
                beforeSend: function () {
                    document.getElementById("loadingMainScreen").style.display = "flex";
                },
                async: true,
            }).done(function () {
                //Load trade zone again 
                //set isLoad
                isLoad = false;
                LoadTradeZone();
                //
                document.getElementById("loadingMainScreen").style.display = "none";
                LoadGroupZone();
                Swal.fire({
                    showConfirmButton: true,
                    confirmButtonColor: "#1ABC9C",
                    icon: 'success',
                    title: 'Delete success!'
                });
            }).fail(function () {
                document.getElementById("loadingMainScreen").style.display = "none";
                Swal.fire({
                    showConfirmButton: true,
                    confirmButtonColor: "#1ABC9C",
                    icon: 'error',
                    title: 'Server error!'
                });
            });
        }
    });

}
function SetViewBrandGroupZone(lat, lng) {
    let showAllGroupZoneCheckBox = document.getElementById("showAllGroupZoneCheckBox");
    if (!showAllGroupZoneCheckBox.checked) {
        showAllGroupZoneCheckBox.click();
    }
    map.flyTo([lat, lng], 13);
}
//Load group zone
async function LoadGroupZone() {
    dataForGroupZoneTable = "";
    if (layerGroupZone != null) {
        map.removeLayer(layerGroupZone);
        layerGroupZone.eachLayer(function (layer) {
            layerGroupZone.removeLayer(layer)
        })
    }
    $.ajax({
        url: "/BrandMap/GetGroupZone",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        async: true,
    }).done(function (response) {
        if (response != "Error") {
            layerGroupZone = L.geoJson(response, {
                style: StyleGroupZone,
                onEachFeature: OnEachFeatureGroupZone
            })
            if (document.getElementById("showAllGroupZoneCheckBox").checked) {
                layerGroupZone.addTo(map);
            } else {
                map.removeLayer(layerGroupZone);
            }
        }
        document.getElementById("bodyGroupZoneTable").innerHTML = dataForGroupZoneTable;
    })
}
//Show all Group Zone by checked
document.getElementById("showAllGroupZoneCheckBox").onchange = function () {
    let checkBox = document.getElementById("showAllGroupZoneCheckBox");
    if (checkBox.checked) {
        layerGroupZone.addTo(map);
    } else {
        map.removeLayer(layerGroupZone);
    }
}
//Remove layer Group
function RemoveLayerGroup(layerGroup) {
    if (layerGroup != null) {
        layerGroup.eachLayer(function (layer) {
            map.removeLayer(layer);
            layerGroup.removeLayer(layer);
        });
    }
}
//Set StyleTradeZone
function StyleTradeZone() {
    return {
        fillColor: dominos_blue_icon_color,
        weight: 3,
        opacity: 1,
        color: 'grey',
        dashArray: '3',
        fillOpacity: 0.3
    }
}
function highlightFeatureOfTradeZone(e) {
    let layer = e.target;
    layer.setStyle({
        fillColor: dominos_blue_icon_color,
        weight: 5,
        color: dominos_blue_icon_color,
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
//Reset highlight
function resetHighlightTradeZone(e) {
    layerTradeZonePostal.resetStyle(e.target);
}
//Load trade zone active 
function LoadActiveTradeZone() {
    $.ajax({
        url: "/BrandMap/GetTradeZoneActive",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        async: true,
    }).done(function (response) {
        ProcessingResponseForEachTradeZone(response, layerTradeZoneActive);
    })
}
//Load all trade zone for all time slot
async function LoadTradeZone() {
    await $.ajax({
        url: "/BrandMap/GetTradeZone",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        async: true,
    }).done(function (response) {
        let data = "";
        let dataForSelection = "";
        for (let i = 0; i < response.length; i++) {
            let isActice = response[i].isActive;
            let id = response[i].id;
            let name = response[i].name;
            //Set default active trade zone 
            if (i == 0) {
                idOfDefaultTradeZone = id;
            }
            //Set id of active trade zone
            if (isActice) {
                dataForSelection = dataForSelection + '<option value="' + id + '" selected>' + name + ' (Active)</option>';
                document.getElementById("detailTradeZoneStatus").checked = true;
                document.getElementById("activeTradeZoneButton").style.display = "none";
                idOfDefaultTradeZone = id;
                idOfActiveTradeZone = id;
            } else {
                dataForSelection = dataForSelection + '<option value="' + id + '">' + name + '</option>';
            }
            //Set data for selection

            //Set data for table
            data = data + '<tr>\
                <th class="text-center" scope = \"row\">' + id + '</th>\
                                    <td class="tabledit-view-mode">\
                                        <span class="tabledit-span">'+ name + '</span>\
                                    </td>\
                                    <td style="white-space: nowrap; text-align: center; width: 1%">' +
                '<div class="checkbox-fade fade-in-primary" style="margin-right: 0px !important;">\
                                                <label class="m-b-0">'
                + (isActice ?
                    '<input type="checkbox" value="" id="" checked onclick="return false;">'
                    : '<input type="checkbox" id="tradeZoneCheckBox'
                    + id
                    + '" onchange="ActiveTradeZoneVersion(\'' + id + '\')">') +
                '<span class="cr" style="margin-right: 0px !important;">\
                                                        <i class="cr-icon icofont icofont-ui-check txt-primary"></i>\
                                                    </span>\
                                                </label>\
                                            </div>' +
                '</td>\
                                    <td style="white-space: nowrap; text-align: center; width: 1%">\
                                        <div class="btn-group btn-group-sm" style="float: none">\
                                            <button type = "button"\
                                                    class="tabledit-edit-button btn-mini btn btn-info waves-effect waves-light"\
                                                    title="See detail"\
                                                    style = "float: none"\
                                                    onclick = "ViewTradeZoneVersionDetail(\'' + id + '\')">\
                                                <span class="icofont icofont-ui-file"></span>\
                                            </button>\
                                            <button type = "button"\
                                                    class="tabledit-edit-button btn-mini btn btn-info waves-effect waves-light"\
                                                    title="See group zone"\
                                                    style = "float: none"\
                                                    onclick = "ViewGroupZoneOfTradeZoneDetail(\'' + id + '\', \'' + name + '\')">\
                                                <span class="icofont icofont-ui-map"></span>\
                                            </button>\
                                            <button type = "button"\
                                                    class="tabledit-edit-button btn-mini btn btn-danger waves-effect waves-light"\
                                                    title="Delete trade zone"\
                                                    style = "float: none"\
                                                    onclick = "DeleteTradeZoneVersionDetail(\'' + id + '\')">\
                                                <span class="icofont icofont-ui-delete"></span>\
                                            </button>\
                                        </div>\
                                    </td>\
                                </tr>';
        }
        document.getElementById("filterVersionTradeZone").innerHTML = dataForSelection;
        //ProcessingResponseForEachTradeZone(response, layerTradeZoneSlot1, tableSlot);
    })
    if (isLoad) {
        document.getElementById("filterVersionTradeZone").value = idOfDefaultTradeZone;
        //
        let value = document.getElementById("filterVersionTradeZone").value;
        //
        ViewTradeZoneVersionDetail(value);
        //
        isLoad = true;
    }

}
//Set highlight remain zone
function highlightFeatureOfRemainZone(e) {
    let layer = e.target;
    layer.setStyle({
        fillColor: 'red',
        weight: 5,
        color: 'red',
        dashArray: '',
        fillOpacity: 0.7
    });
    layer.openPopup();
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
//Reset highlight remain zone
function resetHighlightRemainZone(e) {
    layerRemainZonePostal.resetStyle(e.target);
    e.target.closePopup();
}
//Processing respose for each time slot
function ProcessingResponseForEachTradeZone(response, layerTradeZone) {
    RemoveLayerGroup(layerTradeZone);
    if (response != "Error") {
        let tradeZone = response.tradeZones;
        for (let i = 0; i < tradeZone.length; i++) {
            layerTradeZonePostal = L.geoJson(tradeZone[i].tradeZoneGeom, {
                style: StyleTradeZone,
                //onEachFeature: OnEachFeatureGroupZone
                onEachFeature: function (feature, layer) {
                    let id = tradeZone[i].tradeZoneId;
                    let name = tradeZone[i].name;
                    let weight = tradeZone[i].totalWeight;
                    layer.bindPopup(id + '. ' + name + '<br>Weight: ' + weight)
                    layer.on({
                        mouseover: highlightFeatureOfTradeZone,
                        mouseout: resetHighlightTradeZone
                    });
                }

            })
            layerStoreOfTradeZonePostal = L.geoJson(tradeZone[i].storeGeom, {
                onEachFeature: function (feature, layer) {
                    let name = tradeZone[i].name;
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
            layerTradeZone.addLayer(layerTradeZonePostal);
            layerTradeZone.addLayer(layerStoreOfTradeZonePostal);
        }


    }
}
//Load buidling, wards, stores, campus for map
async function loadMap() {
    //Get wards for information add
    //$.ajax({
    //    url: "/BrandMap/GetWardInformation",
    //    dataType: "json",
    //    contentType: "application/json;charset=utf-8",
    //    async: true,
    //}).done(function (response) {
    //    districtInformation = response[60].districts;
    //    let dataDistrict = "";
    //    for (let i = 0; i < districtInformation.length; i++) {
    //        dataDistrict = dataDistrict
    //            + '<option value="'
    //            + districtInformation[i].name
    //            + '">' + districtInformation[i].name
    //            + '</option>';
    //    }
    //    document.getElementById("districtSelector").innerHTML = dataDistrict;
    //    let wardInformation = districtInformation[0].wards;
    //    let dataWard = "";
    //    for (let i = 0; i < wardInformation.length; i++) {
    //        dataWard = dataWard 
    //            + '<option value="'
    //            + wardInformation[i].name
    //            + '">' + wardInformation[i].name
    //            + '</option>';
    //    }
    //    document.getElementById("wardSelector").innerHTML = dataWard;
    //});

    document.getElementById("mappick").style.height = "100%";

    //Load Brand store
    $.ajax({
        url: "/BrandMap/GetAllBrandStore",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        async: true,
    }).done(function (response) {
        if (response != null) {
            for (let i = 0; i < response.length; i++) {
                if (response[i].status == 1 || response[i].status == 2 || response[i].status == 4) {
                    layerBrandStorePostal =
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

    })
    //Load district by getting Api
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
        layerDistrictPostal = L.geoJson(response, {
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
        layerWardPostal = L.geoJson(response, {
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
        layerCampusPostal = L.geoJson(response, {
            onEachFeature: function (feature, layer) {
                layer.setStyle({
                    color: "green",
                }).bindPopup(feature.properties.f2).on("click", function () {
                });
            },
        });
        layerCampusGroup.addLayer(layerCampusPostal);
    });
    //Load group Zone
    await LoadGroupZone();
    //Load trade zone
    await LoadTradeZone();
    //Load system zone
    LoadSystemZone();
    //Load trade zone active 
    LoadActiveTradeZone();
    //Load group zone for filter of store tab on the dashboard control
    LoadGroupZoneForStoreTabFilter();
    //Load all group zone and store and trade zone for filter of store tab with value is "All"
    LoadAllGroupZoneForStoreTab();
};
//Style for SystemZone 
function StyleSystemZone() {
    return {
        fillColor: dominos_blue_icon_color,
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '',
        fillOpacity: 0.7
    }
}
//Highlight
function highlightFeatureOfSystemZone(e) {
    let layer = e.target;
    layer.setStyle({
        fillColor: dominos_red_icon_color,
        weight: 5,
        color: dominos_red_icon_color,
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
//reset highlight
function resetHighlightSystemZone(e) {
    layerSystemZonePostal.resetStyle(e.target);
}
//Load system zone for map
LoadSystemZone = () => {
    $.ajax({
        url: "/BrandMap/LoadSystemZone",
        method: 'POST',
        data: JSON.stringify({
            CoordinateString: `${sgView}`
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        async: true,
    }).done(function (response) {
        layerSystemZonePostal = L.geoJson(response, {
            style: StyleSystemZone,
            onEachFeature: function (feature, layer) {
                let name = feature.properties.f2;
                let id = feature.properties.f1;
                let assign_button =
                    '<div class="text-right"><button class="btn btn-mini btn-info" data-toggle="modal" data-target="#seeSystemZoneDetail" onclick="mapIdAndName(\'' +
                    name +
                    "', " +
                    "'" +
                    id +
                    '\')" >Detail</button>' +
                    '<button class="btn btn-mini btn-danger" onclick="DeleteSystemZone(\'' +
                    id +
                    '\')">Delete</button>' +
                    '</div>';
                layer.bindPopup(
                    name +
                    "<br>" +
                    "<br>" +
                    assign_button
                );
                layer.on({
                    mouseover: highlightFeatureOfSystemZone,
                    mouseout: resetHighlightSystemZone
                });
            },
        });
        layerSystemZoneGroup.addLayer(layerSystemZonePostal);
    });
}
//
async function LoadGroupZoneForStoreTabFilter() {
    let data = '<option value="-1">All</option>';
    $.ajax({
        url: "/BrandMap/GetAllElementOfTradeZoneVersion",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        async: true,
    }).done(function (response) {
        if (response != "Error") {
            for (let i = 0; i < response.length; i++) {
                let id = response[i].id;
                let name = response[i].name;
                data = data + '<option value="' + id + '\">' + name + '</option>';
                document.getElementById("filterStoreControlTab").innerHTML = data;
            }
            //layerGroupZone = L.geoJson(response, {
            //    onEachFeature: function (feature, layer) {

            //        let id = feature.properties.f4;
            //        let name = feature.properties.f1;
            //        data = data + '<option value="' + id + '\">' + name + '</option>';
            //        document.getElementById("filterStoreControlTab").innerHTML = data;
            //    }
            //})
        }
    })

}
//Create Stack layer to show building, wards, stores, campus
var overlayMaps = {
    District: layerDistrictGroup,
    Wards: layerWardGroup,
    Building: layerBuildingGroup,
    Store: layerStoreGroup,
    BrandStore: layerBrandStoreGroup,
    Campus: layerCampusGroup,
    Systemzone: layerSystemZoneGroup
};

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

//Add layer control for map
var layerscontrol = L.control.layers(null, overlayMaps).addTo(map);

//Finish search and show result
searchControl.on("results", function (data) {
    results.clearLayers();
    for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng).bindPopup(data.results[i].text).openPopup());
    }
});
//Catch event move end on map to show store location
map.on("moveend", async function () {
    //set assetId view
    assetIdViewing = -1;
    //
    checkLayer();
    let bot = map.getBounds()._southWest.lat;
    let left = map.getBounds()._southWest.lng;
    let top = map.getBounds()._northEast.lat;
    let right = map.getBounds()._northEast.lng;
    let coor = `${right} ${top}, ${left} ${top}, ${left} ${bot}, ${right} ${bot}, ${right} ${top}`;

    if (map.getZoom() >= 18) {
        //Get store by getting api
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

    if (map.getZoom() >= 16) {
        //Get building by getting api
        $.ajax({
            url: "/BrandMap/GetBuildingForBrandMap",
            method: 'POST',
            data: JSON.stringify({
                CoordinateString: `${coor}`
            }),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            async: true,
        }).done(function (response) {
            layerBuildingPostal = L.geoJson(response, {
                onEachFeature: function (feature, layer) {
                    let center = layer.getBounds().getCenter();
                    let detail_button;
                    let marker
                    switch (feature.properties.f3) {
                        case 1: //Surveyed
                            layer.setStyle({
                                color: "grey",
                            });
                            marker = L.marker(center, { id: feature.properties.f4 })
                                .setIcon(building_default_icon)
                                .bindPopup(feature.properties.f2)
                                .on('click', function () {
                                    document.getElementById("seeBuildingDetailButton").click();
                                    initBuilding(feature.properties.f4);
                                })
                                .on('mouseover', function (e) {
                                    e.target.openPopup();
                                })
                                .on('mouseout', function (e) {
                                    e.target.closePopup();
                                });
                            layerCenterGroup.addLayer(marker);
                            break;
                        case 4: // Waiting update
                            layer.setStyle({
                                color: "grey",
                            });
                            detail_button =
                                '<div class="text-right"><button class="btn btn-mini btn-info" data-toggle="modal" data-target="#seeBuildingDetail" onclick="initBuilding(\'' +
                                feature.properties.f4 +
                                "'" +
                                ')" >Detail</button></div>';
                            marker = L.marker(center, { id: feature.properties.f4 })
                                .setIcon(building_default_icon)
                                .bindPopup(feature.properties.f2 + "<br><br>" + detail_button);
                            layerCenterGroup.addLayer(marker);
                            break;
                    }
                },
            });
            layerBuildingGroup.addLayer(layerBuildingPostal);
            layerBuildingGroup.addLayer(layerCenterGroup);
        });
    }
});
map.on("move", function (e) {
    if (map.getMarkerById("OCL1")) {
        map.removeLayer(map.getMarkerById("OCL1"));
    }
});


//Click to show location on click on the map
map.on("click", function (e) {

    if (map.getMarkerById("OCL1")) {
        map.removeLayer(map.getMarkerById("OCL1"));
    }
    geocodeService
        .reverse()
        .latlng(e.latlng)
        .run(function (error, result) {
            if (error) {
                return;
            }
            onclickLocation = L.marker(result.latlng, {
                id: "OCL1",
                icon: onclickLocation_icon,
            })
                .addTo(map)
                .bindPopup(result.address.Match_addr)
                .openPopup();
        });
});
//Show stores list
function ShowStores() {
    let listStores = document.getElementById("listStores");
    let width = listStores.style.width;
    if (listStores.style.left == `-${width}`) {
        document.getElementById("iconListStores").className = "zmdi zmdi-chevron-left";
        listStores.style.left = "0px";
    } else {
        document.getElementById("iconListStores").className = "zmdi zmdi-chevron-right";
        listStores.style.left = `-${width}`;
    }

}
//Catch districtSelector onchange to set wards information
//document.getElementById("districtSelector").onchange = function () {
//    let index = document.getElementById("districtSelector").selectedIndex;
//    let wardInformation = districtInformation[index].wards;
//    let dataWard = "";
//    for (let i = 0; i < wardInformation.length; i++) {
//        dataWard = dataWard
//            + '<option value="'
//            + wardInformation[i].name
//            + '">' + wardInformation[i].name
//            + '</option>';
//    }
//    document.getElementById("wardSelector").innerHTML = dataWard;
//}
//Click on button "Send" to send request survey
descriptionTextArea.oninput = function () {
    let descriptionRegex = /^\s*$/;
    let validDescriptionRegex = descriptionTextArea.value.match(descriptionRegex);
    if (validDescriptionRegex != null) {
        descriptionTextArea.style.background = "#fbe3e4";
        descriptionTextArea.style.border = "1px solid #fbc2c4";
        descriptionTextArea.style.color = "#8a1f11";
        document.getElementById("descriptionTextArea-error").style.display = "block";
    } else {
        descriptionTextArea.style.background = "#fff";
        descriptionTextArea.style.border = "1px solid rgba(0,0,0,.15)";
        descriptionTextArea.style.color = "#464a4c";
        document.getElementById("descriptionTextArea-error").style.display = "none";
    }
}
//Click on button send request to survey store
function SendRequestSurvey() {
    let descriptionRegex = /^\s*$/;
    let validDescriptionRegex = descriptionTextArea.value.match(descriptionRegex);
    let isMapLocation = false;
    if (document.getElementById("mapLocation").innerHTML != "Choose location on map") {
        isMapLocation = true;
    } else {
        document.getElementById("locationPickInput-error").style.display = "block";
        document.getElementById("locationPickInput").style.background = "#fbe3e4";
        document.getElementById("locationPickInput").style.border = "1px solid #fbc2c4";
        document.getElementById("locationPickInput").style.color = "#8a1f11";
    }
    if (validDescriptionRegex != null) {
        descriptionTextArea.style.background = "#fbe3e4";
        descriptionTextArea.style.border = "1px solid #fbc2c4";
        descriptionTextArea.style.color = "#8a1f11";
        document.getElementById("descriptionTextArea-error").style.display = "block";
    }
    if (isMapLocation && validDescriptionRegex == null) {
        Swal.fire({
            title: 'Do you confirm your input?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1abc9c',
            cancelButtonColor: '#9ca5ab',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/BrandMap/SendRequestToSurveyStore",
                    data: {
                        desciption: document.getElementById("descriptionTextArea").value,
                        wkt: document.getElementById("wkt").value
                    },
                    dataType: "json",
                    contentType: "application/json;charset=utf-8",
                    async: true,
                }).done(function (response) {
                    if (response == "200") {
                        document.getElementById("closeAddLocationModalButton").click();
                        Swal.fire(
                            {
                                title: 'Request sent!',
                                text: 'Your request is sent successfully.',
                                icon: 'success',
                                confirmButtonColor: '#1abc9c'
                            }
                        )
                    } else {
                        Swal.fire(
                            {
                                title: 'Server error!',
                                text: 'Your request is unsent.',
                                icon: 'error',
                                confirmButtonColor: '#1abc9c'
                            }
                        )
                    }
                });
            }
        })

    } else {
        return false;
    }
}
//Click on button "Create Request" to show the modal
function InitRequestModal() {
    //Init desrcription
    descriptionTextArea.style.background = "#fff";
    descriptionTextArea.style.border = "1px solid rgba(0,0,0,.15)";
    descriptionTextArea.style.color = "#464a4c";
    document.getElementById("descriptionTextArea-error").style.display = "none";
    //Init location pick
    document.getElementById("locationPickInput-error").style.display = "none";
    document.getElementById("locationPickInput").style.background = "#fff";
    document.getElementById("locationPickInput").style.border = "1px solid rgba(0,0,0,.15)";
    document.getElementById("locationPickInput").style.color = "#464a4c";
}
//Show all store on map
function StoreCheckBoxChange() {
    let showAllStoreCheckBox = document.getElementById("showAllStoreCheckBox");
    if (showAllStoreCheckBox.checked) {
        map.addLayer(layerStoreOfStoreTab);
    } else {
        map.removeLayer(layerStoreOfStoreTab)
    }
}
//Check box for Group zone onchange
function GroupZoneBoxChange() {
    let showGroupZoneCheckBox = document.getElementById("showGroupZoneCheckBox");
    if (showGroupZoneCheckBox.checked) {
        map.addLayer(layerGroupZoneOfStoreTab);
    } else {
        map.removeLayer(layerGroupZoneOfStoreTab)
    }
}
//Check box for Group zone onchange
function TradeZoneBoxChange() {
    let showTradeZoneCheckBox = document.getElementById("showTradeZoneCheckBox");
    if (showTradeZoneCheckBox.checked) {
        map.addLayer(layerTradeZoneOfStoreTab);
    } else {
        map.removeLayer(layerTradeZoneOfStoreTab)
    }
}
//Init store detail modal
function initStoreModal(id) {
    //cal api
    $.ajax({
        url: "/BrandMap/InitStoreDetail",
        method: 'POST',
        data: JSON.stringify({
            StoreId: `${id}`
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
            document.getElementById("storeModalPreloader").style.display = "flex";
        },
        async: true,
    }).done(function (response) {
        (response.imageUrl)
            ? document.getElementById("storeImage").src = response.imageUrl
            : document.getElementById("storeImage").src = "http://maps.gstatic.com/tactile/pane/default_geocode-2x.png";

        document.getElementById("modalStoreId").value = response.id;
        document.getElementById("modalStoreName").innerHTML = response.name;
        document.getElementById("modalStoreType").innerHTML = response.type;
        document.getElementById("modalStoreAddress").value = response.address;
        document.getElementById("modalStoreCreateDay").value = response.createDate;
        document.getElementById("modalStoreBrand").value = response.brandName;
        document.getElementById("storeModalPreloader").style.display = "none";
        //Set time slot
        let timeSlot = response.timeSlot;
        if (timeSlot != null) {
            document.getElementById("timeSlotList").style.display = "grid";
            timeSlot = timeSlot.replaceAll(' ', '');
            if (timeSlot.charAt(0) == "1") {
                document.getElementById("timeSlot1").checked = true;
            } else {
                document.getElementById("timeSlot1").checked = false;
            }
            if (timeSlot.charAt(1) == "1") {
                document.getElementById("timeSlot2").checked = true;
            } else {
                document.getElementById("timeSlot2").checked = false;
            }
            if (timeSlot.charAt(2) == "1") {
                document.getElementById("timeSlot3").checked = true;
            } else {
                document.getElementById("timeSlot3").checked = false;
            }
            if (timeSlot.charAt(3) == "1") {
                document.getElementById("timeSlot4").checked = true;
            } else {
                document.getElementById("timeSlot4").checked = false;
            }
        } else {
            document.getElementById("timeSlotList").style.display = "none";
        }
    });
}
//highlightFeatureOfInitingTradeZone
function highlightFeatureOfInitingTradeZone(e) {
    let layer = e.target;
    layer.setStyle({
        fillColor: '#3a6eff',
        weight: 5,
        color: '#3a6eff',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
//Reset highlight
function resetHighlightInitingTradeZone(e) {
    layerInitingTradeZonePostal.resetStyle(e.target);
}
//Validate for initting trade zone
function ValidateInittingTradeZone() {
    //Validate Distance
    let distanceService = document.getElementById("distanceService");
    let distanceServiceErrorText = document.getElementById("distanceService-error");
    if (distanceService.value <= 0 || distanceService.value == "") {
        distanceServiceErrorText.style.display = 'block';
        distanceService.style.background = "#fbe3e4";
        distanceService.style.border = "1px solid #fbc2c4";
        distanceService.style.color = "#8a1f11";
        return false;
    } else {
        distanceServiceErrorText.style.display = 'none';
        distanceService.style.background = "#fff";
        distanceService.style.border = "1px solid rgba(0,0,0,.15)";
        distanceService.style.color = "#464a4c";
    }
    //Validate Store
    let storeSelect = document.getElementById("storeSelect");
    let storeSelectError = document.getElementById("storeSelect-error");
    if (storeSelect.value == "") {
        storeSelectError.style.display = 'block';
        return false;
    } else {
        storeSelectError.style.display = 'none';
    }
    //Validate day
    let dayIsPick = false;
    for (let i = 0; i < dayPickList.length; i++) {
        if (dayPickList[i] == 1) {
            dayIsPick = true;
            break;
        }
    }
    if (!dayIsPick) {
        document.getElementById("pickDay-error").style.display = 'block';
        return false;
    } else {
        document.getElementById("pickDay-error").style.display = 'none';
    }
    //Validate timeSlot
    let timeIsPick = false;
    for (let i = 0; i < timeSlotPickList.length; i++) {
        if (timeSlotPickList[i] == 1) {
            timeIsPick = true;
            break;
        }
    }
    if (!timeIsPick) {
        document.getElementById("pickTimeSlot-error").style.display = 'block';
        return false;
    } else {
        document.getElementById("pickTimeSlot-error").style.display = 'none';
    }
    return true;
}
//Store selectore on change
document.getElementById("storeSelect").onchange = function () {
    let storeSelect = document.getElementById("storeSelect");
    let storeSelectError = document.getElementById("storeSelect-error");
    if (storeSelect.value == "") {
        storeSelectError.style.display = 'block';
    } else {
        storeSelectError.style.display = 'none';
    }
}
//Input distance on input 
document.getElementById("distanceService").oninput = function () {
    let distanceService = document.getElementById("distanceService");
    let distanceServiceErrorText = document.getElementById("distanceService-error");
    if (distanceService.value <= 0 || distanceService.value == "") {
        distanceServiceErrorText.style.display = 'block';
        distanceService.style.background = "#fbe3e4";
        distanceService.style.border = "1px solid #fbc2c4";
        distanceService.style.color = "#8a1f11";
    } else {
        distanceServiceErrorText.style.display = 'none';
        distanceService.style.background = "#fff";
        distanceService.style.border = "1px solid rgba(0,0,0,.15)";
        distanceService.style.color = "#464a4c";
    }
}
//Init new trade zone
function InitTradeZone() {
    //remove trade zone layer 
    map.removeLayer(layerDetailTradeZone);
    //Create distance request
    let distance = document.getElementById("distanceService").value;
    //Create slot request
    let timeSlotRequest = "";
    for (let i = 0; i < timeSlotPickList.length; i++) {
        timeSlotRequest = timeSlotRequest + timeSlotPickList[i].toString();
    };
    //Create store pick list request
    let storePickList = [];
    for (var option of document.getElementById('storeSelect').options) {
        if (option.selected) {
            storePickList.push(option.value);
        }
    }
    //Check validate
    if (!ValidateInittingTradeZone()) {
        return false;
    }
    $.ajax({
        url: "/BrandMap/InitTradeZone",
        method: 'POST',
        data: JSON.stringify({
            Distance: distance,
            TimeSlot: timeSlotRequest,
            StoresId: storePickList
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
            document.getElementById("loadingMainScreen").style.display = "flex";
            document.getElementById("closeTradeZoneModalButton").click();
        },
        async: true,
    }).done(function (res) {
        //Reset remain zone
        RemoveLayerGroup(layerRemainZone);
        //Show confirm group and hide init new Button
        //SetTradeZoneByTimeSlot(timeSlot, res);
        let bodyInitingTZTable = document.getElementById("bodyInitingTradeZone");
        let center = ProcessingReponseForInitingTradeZone(layerInitingTradeZone1, bodyInitingTZTable, res);
        //Show initing tab
        document.getElementById("initingTradeZoneTab").style.left = 0;
        //Hide the row of trade zone verion
        document.getElementById("tradeZoneVersionRow").style.display = "none";
        //Show remain zone
        let remainZone = res.remainZones
        if (remainZone != null) {
            layerRemainZonePostal = L.geoJson(remainZone, {
                style: {
                    fillColor: 'red',
                    color: 'grey'
                },
                onEachFeature: function (feature, layer) {
                    layer.bindPopup("Red zones on the map are suitable for openning a new store with your present service's distance");
                    layer.on({
                        mouseover: highlightFeatureOfRemainZone,
                        mouseout: resetHighlightRemainZone
                    })
                }
            });
            layerRemainZone.addLayer(layerRemainZonePostal).addTo(map);
            Swal.fire({
                showConfirmButton: true,
                confirmButtonColor: "#1ABC9C",
                icon: 'success',
                title: 'Init success!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        showConfirmButton: true,
                        confirmButtonColor: "#1ABC9C",
                        icon: 'warning',
                        title: 'You have remain zone',
                        text: 'Red zones on the map are suitable for openning a new store with your present service\'s distance'
                    });
                }
            })
        } else {
            Swal.fire({
                showConfirmButton: true,
                confirmButtonColor: "#1ABC9C",
                icon: 'success',
                title: 'Init success!'
            });
        }
        //set view for map
        if (center != null) {
            map.setView(center, 13);
        }
        //Close preloader
        document.getElementById("loadingMainScreen").style.display = "none";
    }).fail(function () {
        document.getElementById("loadingMainScreen").style.display = "none";
        Swal.fire({
            showConfirmButton: true,
            confirmButtonColor: "#1ABC9C",
            icon: 'error',
            title: 'Server error!'
        });
    })
}
//Choose time slot for processing response
function SetTradeZoneByTimeSlot(timeSlot, res) {
    let table = "";
    switch (timeSlot) {

        case 1:
            table = document.getElementById("bodyTradeZoneTableSlot1");
            ProcessingReponseForInitingTradeZone(layerInitingTradeZone1, table, res);
            break;
        case 2:
            table = document.getElementById("bodyTradeZoneTableSlot2");
            ProcessingReponseForInitingTradeZone(layerInitingTradeZone2, table, res);
            break;
        case 3:
            table = document.getElementById("bodyTradeZoneTableSlot3");
            ProcessingReponseForInitingTradeZone(layerInitingTradeZone3, table, res);
            break;
        case 4:
            table = document.getElementById("bodyTradeZoneTableSlot4");
            ProcessingReponseForInitingTradeZone(layerInitingTradeZone4, table, res);
            break;
    }
}
//Processing response for the new trade zone by each time slot
function ProcessingReponseForInitingTradeZone(layerInitingTradeZone, table, res) {
    //Set data for table
    let data = "";
    //Reset layer init trade zone
    RemoveLayerGroup(layerInitingTradeZone);
    //Show store's trade zone
    let storeTradeZone = res.storeTradeZone;
    let center;
    if (storeTradeZone != null && storeTradeZone.length > 0) {
        for (let i = 0; i < storeTradeZone.length; i++) {
            let storeId = storeTradeZone[i].id;
            let name = "";
            let weight = 0;
            let tradeZone = storeTradeZone[i].tradeZoneGeom;
            let store = storeTradeZone[i].storesGeom;
            //set layer initing Trade zone
            layerInitingTradeZonePostal = L.geoJson(tradeZone, {
                style: {
                    fillColor: dominos_blue_icon_color,
                    color: 'grey'
                },
                onEachFeature: function (feature, layer) {
                    center = layer.getBounds().getCenter();
                    layer.on({
                        mouseover: highlightFeatureOfInitingTradeZone,
                        mouseout: resetHighlightInitingTradeZone
                    });
                    name = feature.properties.f1;
                    weight = feature.properties.f5;
                    layer.storeId = storeId;
                    layer.name = name;
                    layer.weight = weight;
                    layer.groupZoneId = feature.properties.f4;
                    layer.bindPopup(name + '<br>Weight: ' + weight)
                    layer.isTradeZone = true;
                }
            });
            //set store initing Store
            let layerInitingStorePostal = L.geoJson(store, {
                onEachFeature: function (feature, layer) {
                    let name = feature.properties.f1;
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
            })
            //set data for tradezone table
            data = data + '<tr>\
                <th class="text-center" scope = \"row\">'+ (i + 1) + '</th>\
                                    <td class="tabledit-view-mode">\
                                        <span class="tabledit-span">'+ name + '</span>\
                                    </td>\
                                    <td style="white-space: nowrap; width: 1%">\
                                        <span class="tabledit-span">'+ weight + '</span>\
                                    </td>\
                                </tr>';
            layerInitingTradeZone.addLayer(layerInitingTradeZonePostal);
            layerInitingTradeZone.addLayer(layerInitingStorePostal);
        }
    }
    //Set data for table of tab that trade zone
    table.innerHTML = data;
    layerInitingTradeZone.addTo(map);
    return center;
}
//reset layer style 
function resetHighlight(e) {
    let layer = e.target;
    if (!layer.isClick) {
        layerFreeWardPostal.resetStyle(e.target);
    } else {
        layer.bindPopup(layer.nameWard).openPopup();
    }

}
//
function onEachFeatureFreeWard(feature, layer) {
    layer.isClick = false;
    layer.idWard = feature.properties.f3;
    layer.nameWard = feature.properties.f2;
    layer.on({
        mouseover: highlightFeatureOfSystemZone,
        mouseout: resetHighlight,
        click: SetSelectedSystemZoneForGroupZone
    });
}
//Set style for system zone for group zone
function StyleSystemZoneForGroupZone() {
    return {
        fillColor: '#46627F',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    }
}
function SetSelectedSystemZoneForGroupZone(e) {
    let layer = e.target;
    if (layer.isClick) {
        listElementOfGroupZoneId = listElementOfGroupZoneId.filter(item => item !== layer.idWard);
        listElementOfGroupZoneName = listElementOfGroupZoneName.filter(item => item !== layer.nameWard);
        layer.isClick = false;
        layer.setStyle({
            fillColor: '#46627F',
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        });
    } else {
        layer.bindPopup(layer.nameWard).openPopup();
        listElementOfGroupZoneName.push(layer.nameWard);
        listElementOfGroupZoneId.push(layer.idWard);
        layer.isClick = true;
        layer.setStyle({
            fillColor: '#34495E',
            weight: 5,
            color: '#1E2A37',
            dashArray: '',
            fillOpacity: 0.7
        });
    }
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    layer.bringToFront();
}
//Init System Zone for group zone when on click create new button
function InitSystemZoneForGroupZone() {
    listElementOfGroupZoneId = [];
    listElementOfGroupZoneName = [];
    let type = document.getElementById("typeOfGroupZone").value;
    document.getElementById("closeChooseTypeGroupZoneButton").click();
    $.ajax({
        url: "/BrandMap/GetFreeWardsForGroupZone",
        data: {
            Type: type
        },
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
            document.getElementById("loadingMainScreen").style.display = "flex";
        },
        async: true,
    }).done(function (response) {
        if (response != null) {
            document.getElementById("loadingMainScreen").style.display = "none";
            document.getElementById("InitSystemZoneForGroupZoneButton").style.display = "none";
            document.getElementById("groupGroupZoneButton").style.display = "block";
            layerFreeWardPostal = L.geoJson(response, {
                style: StyleSystemZoneForGroupZone,
                onEachFeature: onEachFeatureFreeWard
            }).addTo(map);
        } else {
            document.getElementById("loadingMainScreen").style.display = "none";
        }
    }).fail(function () {
        document.getElementById("loadingMainScreen").style.display = "none";
        Swal.fire({
            showConfirmButton: true,
            confirmButtonColor: "#1ABC9C",
            icon: 'error',
            title: 'Server error!'
        });
    })
}
//Click Cancel button of tag Group Zone
function CancelSystemZoneForGroupZone() {
    document.getElementById("InitSystemZoneForGroupZoneButton").style.display = "block";
    document.getElementById("groupGroupZoneButton").style.display = "none";
    layerFreeWardPostal.eachLayer(function (layer) {
        layerFreeWardPostal.removeLayer(layer);
    })
    map.removeLayer(layerFreeWardPostal);
}
//Click confirm button to check valid group zone
function CheckValidGroupZone() {
    let type = document.getElementById("typeOfGroupZone").value;
    $.ajax({
        url: "/BrandMap/CheckValidGroupZone",
        method: 'POST',
        data: JSON.stringify({
            ListZoneId: listElementOfGroupZoneId,
            Type: type
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
            document.getElementById("loadingMainScreen").style.display = "flex";
        },
        async: true,
    }).done(function (response) {
        document.getElementById("loadingMainScreen").style.display = "none";
        if (response) {
            document.getElementById("showCreateGroupZoneModalButton").click();
            let data = "";
            for (let i = 0; i < listElementOfGroupZoneName.length; i++) {
                data = data + listElementOfGroupZoneName[i] + "; ";
            }
            document.getElementById("listGroupZoneName").innerHTML = data;
        } else {
            Swal.fire({
                showConfirmButton: true,
                confirmButtonColor: "#1ABC9C",
                icon: 'error',
                title: 'Unacceptable group zone',
                text: "Group zone are ward zones contiguous",
            });
        }
    }).fail(function () {
        Swal.fire({
            showConfirmButton: true,
            confirmButtonColor: "#1ABC9C",
            icon: 'error',
            title: 'Server error!'
        });
    });
}
//nameGroupZone oninput
document.getElementById("nameGroupZone").oninput = function () {
    let groupZoneNameRegex = /^(?!\s*$).+/;
    let groupZoneName = document.getElementById("nameGroupZone");
    let validsystemzoneName = groupZoneName.value.match(groupZoneNameRegex);
    if (validsystemzoneName == null) {
        document.getElementById("nameGroupZone-error").style.display = "block";
        groupZoneName.style.background = "#fbe3e4";
        groupZoneName.style.border = "1px solid #fbc2c4";
        groupZoneName.style.color = "#8a1f11";
    } else {
        document.getElementById("nameGroupZone-error").style.display = "none";
        groupZoneName.style.background = "#fff";
        groupZoneName.style.border = "1px solid rgba(0,0,0,.15)";
        groupZoneName.style.color = "#464a4c";
    }
}
//Create group zone
function CreateGroupZone() {
    let groupZoneNameRegex = /^(?!\s*$).+/;
    let groupZoneName = document.getElementById("nameGroupZone");
    let validsystemzoneName = groupZoneName.value.match(groupZoneNameRegex);
    if (validsystemzoneName == null) {
        document.getElementById("nameGroupZone-error").style.display = "block";
        groupZoneName.style.background = "#fbe3e4";
        groupZoneName.style.border = "1px solid #fbc2c4";
        groupZoneName.style.color = "#8a1f11";
        return false;
    }
    let type = document.getElementById("typeOfGroupZone").value;
    $.ajax({
        url: "/BrandMap/AddNewGroupZone",
        method: 'POST',
        data: JSON.stringify({
            Name: document.getElementById("nameGroupZone").value,
            Type: type,
            ListZoneId: listElementOfGroupZoneId
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
            document.getElementById("loadingMainScreen").style.display = "flex";
            document.getElementById("closeGroupZoneModalButton").click();
        },
        async: true,
    }).done(function () {
        document.getElementById("loadingMainScreen").style.display = "none";
        CancelSystemZoneForGroupZone();
        LoadGroupZone()
        Swal.fire({
            showConfirmButton: true,
            confirmButtonColor: "#1ABC9C",
            icon: 'success',
            title: 'Create success!'
        });
    }).fail(function () {
        document.getElementById("loadingMainScreen").style.display = "none";
        Swal.fire({
            showConfirmButton: true,
            confirmButtonColor: "#1ABC9C",
            icon: 'error',
            title: 'Server error!'
        });
    })
}
//Init building details
function initBuilding(id) {
    document.getElementById("color-nestable").innerHTML = "<h5>No information</h5>";
    $.ajax({
        url: "/BrandMap/InitBuildingDetail",
        method: 'POST',
        data: JSON.stringify({
            BuildingId: `${id}`,
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
            document.getElementById("buildingPreloader").style.display = "flex";
        },
        async: true,
    }).done(function (response) {
        if (response.imageUrl) {
            document.getElementById("buildingImg").src = response.imageUrl;
        } else {
            document.getElementById("buildingImg").src = "http://maps.gstatic.com/tactile/pane/default_geocode-2x.png";
        }
        document.getElementById("buildingId").value = response.id;
        if (response.active) {
            document.getElementById("buildingName").innerHTML = "<img src=\"/assets/default/assets/images/active-green-dot.png\" height=\"10px\" width=\"10px\">" + " " + response.name;
        } else {
            document.getElementById("buildingName").innerHTML = "<img src=\"/assets/default/assets/images/unactive-green-dot.svg\" height=\"10px\" width=\"10px\">" + " " + response.name;
        }
        document.getElementById("buildingCreateDay").value = response.createDate;
        document.getElementById("buildingNumberOfFloor").value =
            response.numberOfFloor;
        document.getElementById("buildingAdress").value = response.address;
        document.getElementById("buildingCampusId").value = response.campusId;
        document.getElementById("buildingType").innerHTML = response.type;

        let height = document.getElementById("infoBuildingRow").offsetHeight;
        if (height == 0) height = 271;
        document.getElementById("infoListFloorRow").style.height = `${height}px`;
        let floors = response.floors;
        if (floors != null && floors.length > 0) {
            let openOpenListTagListWithId = '<ol class="dd-list" id="'
            let closeOpenListTagListWithId = '">'
            let openList = '<ol class="dd-list">';
            let openItem = '<li class="dd-item">';
            let closeItem = "</li>";
            let closeList = "</ol>";
            dataFloorOfBuiding = openList;
            for (let index = 0; index < floors.length; index++) {
                dataFloorOfBuiding = dataFloorOfBuiding + openItem;
                let floorName = "";
                (floors[index].name == null) ? floorName = floors[index].floorNumber : floorName = floors[index].name
                dataFloorOfBuiding =
                    dataFloorOfBuiding +
                    '<div class="btn btn-primary col-sm-12 text-left nestable-primary m-t-5 m-b-5" onclick="closeChildInListFloors(' +
                    floors[index].id +
                    ')">' +
                    floors[index].id +
                    ". Floor " +
                    floorName +
                    "</div>";
                let floorArea = floors[index].floorAreas;
                if (floorArea.length > 0) {
                    dataFloorOfBuiding = dataFloorOfBuiding + openOpenListTagListWithId + floors[index].id + closeOpenListTagListWithId;
                    for (let index2 = 0; index2 < floorArea.length; index2++) {
                        dataFloorOfBuiding = dataFloorOfBuiding + openItem;
                        dataFloorOfBuiding =
                            dataFloorOfBuiding +
                            '<div class="btn btn-info col-sm-12 text-left nestable-info m-t-5 m-b-5" onclick="closeChildInListFloors(' +
                            floors[index].id +
                            floorArea[index2].id +
                            ')">' +
                            floorArea[index2].id +
                            ". " +
                            floorArea[index2].name +
                            "</div>";
                        let stores = floorArea[index2].stores;
                        if (stores.length > 0) {
                            dataFloorOfBuiding = dataFloorOfBuiding + openOpenListTagListWithId + floors[index].id +
                                floorArea[index2].id + closeOpenListTagListWithId;
                            for (let index3 = 0; index3 < stores.length; index3++) {
                                dataFloorOfBuiding = dataFloorOfBuiding + openItem;
                                dataFloorOfBuiding = dataFloorOfBuiding +
                                    '<div class="btn btn-default col-sm-12 text-left nestable-default m-t-5 m-b-5" ' +
                                    'onclick="initStore(\'' +
                                    stores[index3].id +
                                    "')\"> " +
                                    stores[index3].id +
                                    ". " +
                                    stores[index3].name +
                                    "</div>";
                                dataFloorOfBuiding = dataFloorOfBuiding + closeItem;
                            }
                            dataFloorOfBuiding = dataFloorOfBuiding + closeList;
                        }
                        dataFloorOfBuiding = dataFloorOfBuiding + closeItem;
                    }
                    dataFloorOfBuiding = dataFloorOfBuiding + closeList;
                }

                dataFloorOfBuiding = dataFloorOfBuiding + closeItem;
            }
            dataFloorOfBuiding = dataFloorOfBuiding + closeList;
            height = document.getElementById("infoBuildingRow").offsetHeight;
            if (height == 0) height = 271;
            document.getElementById("color-nestable").innerHTML = dataFloorOfBuiding;
            document.getElementById("infoListFloorRow").style.height = `${height}px`;
        }
        document.getElementById("buildingPreloader").style.display = "none";
    });
}
//Close child in list floor
function closeChildInListFloors(id) {
    let storeChild = document.getElementById(id);
    if (storeChild) {
        if (document.getElementById(id).style.display == "none") {
            document.getElementById(id).style.display = "block"
        } else {
            document.getElementById(id).style.display = "none"
        }
    }
}
//Close trade zone confirm box
function CloseConfirmBox() {
    //display the trade zone version row
    document.getElementById("tradeZoneVersionRow").style.display = "flex";
    //Remove layer init
    RemoveLayerGroup(layerInitingTradeZone1);
    RemoveLayerGroup(layerInitingTradeZone2);
    RemoveLayerGroup(layerInitingTradeZone3);
    RemoveLayerGroup(layerInitingTradeZone4);
    //Remove layer remain
    RemoveLayerGroup(layerRemainZone);
    //Close tab
    document.getElementById("initingTradeZoneTab").style.left = '-100%';
    //Set data table = null
    document.getElementById("bodyInitingTradeZone").innerHTML = "";
    //add layer trade zone version 
    layerDetailTradeZone.addTo(map);
}
//Check valid Name of trade zone
CheckValidNameOfTradeZone = () => {
    let nameOfNewTradeZone = document.getElementById("nameOfNewTradeZone");
    let descriptionRegex = /^\s*$/;
    let validNameRegex = nameOfNewTradeZone.value.match(descriptionRegex);
    if (validNameRegex != null) {
        nameOfNewTradeZone.style.background = "#fbe3e4";
        nameOfNewTradeZone.style.border = "1px solid #fbc2c4";
        nameOfNewTradeZone.style.color = "#8a1f11";
        document.getElementById("nameOfNewTradeZone-error").style.display = "block";
        return false;
    } else {
        nameOfNewTradeZone.style.background = "#fff";
        nameOfNewTradeZone.style.border = "1px solid rgba(0,0,0,.15)";
        nameOfNewTradeZone.style.color = "#464a4c";
        document.getElementById("nameOfNewTradeZone-error").style.display = "none";
    }
    return true;
}
//Confirm trade zone confirm box
function ConfirmTradeZone() {
    if (!CheckValidNameOfTradeZone()) {
        return false;
    }
    Swal.fire({
        title: 'Do you want to confirm this trade zone?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1abc9c',
        cancelButtonColor: '#9ca5ab',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            let listTradeZone = [];
            switch (timeSlot) {
                case 1:
                    AddDataForListTradeZoneByTimeSlot(layerInitingTradeZone1, listTradeZone);
                    break;
                case 2:
                    AddDataForListTradeZoneByTimeSlot(layerInitingTradeZone2, listTradeZone);
                    break;
                case 3:
                    AddDataForListTradeZoneByTimeSlot(layerInitingTradeZone3, listTradeZone);
                    break;
                case 4:
                    AddDataForListTradeZoneByTimeSlot(layerInitingTradeZone4, listTradeZone);
                    break;
            }
            //Create day request
            let dayRequest = "";
            for (let i = 0; i < dayPickList.length; i++) {
                dayRequest = dayRequest + dayPickList[i].toString();
            }
            //Create time slot request
            let timeSlotRequest = "";
            for (let i = 0; i < timeSlotPickList.length; i++) {
                timeSlotRequest = timeSlotRequest + timeSlotPickList[i].toString();
            }

            let nameOfTradeZone = document.getElementById("nameOfNewTradeZone").value;
            let descriptionOfTradeZone = document.getElementById("descriptionTradeZone").value;
            let distanceOfTradeZone = document.getElementById("distanceService").value;
            $.ajax({
                url: "/BrandMap/InsertTradeZone",
                method: 'POST',
                data: JSON.stringify({
                    TradeZones: listTradeZone,
                    Name: nameOfTradeZone,
                    Description: descriptionOfTradeZone,
                    DateFilter: dayRequest,
                    TimeSlot: timeSlotRequest,
                    Distance: distanceOfTradeZone
                }),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                beforeSend: function () {
                    document.getElementById("loadingMainScreen").style.display = "flex";
                },
                async: true,
            }).done(function (response) {
                //display the trade zone version row
                document.getElementById("tradeZoneVersionRow").style.display = "flex";
                layerDetailTradeZone.addTo(map);
                //Remove layer init
                switch (timeSlot) {
                    case 1:
                        RemoveLayerGroup(layerInitingTradeZone1);
                        break;
                    case 2:
                        RemoveLayerGroup(layerInitingTradeZone2);
                        break;
                    case 3:
                        RemoveLayerGroup(layerInitingTradeZone3);
                        break;
                    case 4:
                        RemoveLayerGroup(layerInitingTradeZone4);
                        break;
                }

                //Remove layer remain
                RemoveLayerGroup(layerRemainZone);
                //Load trade zone
                LoadTradeZone();
                document.getElementById("btnInitNewTradeZone").style.display = "block";
                //Close inting tab
                document.getElementById("initingTradeZoneTab").style.left = "-100%";
                //Close preloading
                document.getElementById("loadingMainScreen").style.display = "none";
                //Close the modal
                document.getElementById("closeInsertModalButton").click();
                Swal.fire({
                    showConfirmButton: true,
                    confirmButtonColor: "#1ABC9C",
                    icon: 'success',
                    title: 'Init new success!'
                });
                //Load group zone for filter of store tab on the dashboard control
                LoadGroupZoneForStoreTabFilter();
                //Load all group zone and store and trade zone for filter of store tab with value is "All"
                LoadAllGroupZoneForStoreTab();
            }).fail(function () {
                //Remove layer init
                switch (timeSlot) {
                    case 1:
                        RemoveLayerGroup(layerInitingTradeZone1);
                        break;
                    case 2:
                        RemoveLayerGroup(layerInitingTradeZone2);
                        break;
                    case 3:
                        RemoveLayerGroup(layerInitingTradeZone3);
                        break;
                    case 4:
                        RemoveLayerGroup(layerInitingTradeZone4);
                        break;
                }
                //Remove layer remain
                RemoveLayerGroup(layerRemainZone);
                document.getElementById("btnInitNewTradeZone").style.display = "block";
                Swal.fire({
                    showConfirmButton: true,
                    confirmButtonColor: "#1ABC9C",
                    icon: 'error',
                    title: 'Server error!'
                });
            });
        }
    });
}
//Add data for list to sending data for api 
function AddDataForListTradeZoneByTimeSlot(layerInitingTradeZone, listTradeZone) {
    layerInitingTradeZone.eachLayer(function (layer) {
        if (layer._layers[layer._leaflet_id - 1].isTradeZone) {
            let geoJsonCreate = layer.toGeoJSON().features[0].geometry;
            let wktString = Terraformer.WKT.convert(geoJsonCreate);
            let weight = layer._layers[layer._leaflet_id - 1].weight;
            let groupZoneId = layer._layers[layer._leaflet_id - 1].groupZoneId;
            let name = layer._layers[layer._leaflet_id - 1].name;
            let storeId = layer._layers[layer._leaflet_id - 1].storeId;
            console.log(storeId);
            let tradeZone = {
                StoreId: storeId,
                Wkt: wktString,
                GroupZoneId: groupZoneId,
                Name: name,
                WeightNumber: weight
            }
            listTradeZone.push(tradeZone);
        }

    });
}
//Change slot by click on tabs of trade zone
function ChangeTimeSlot(slot) {
    timeSlot = slot;
}

//Load layer Store of brand by time Slot
function LoadLayerBrandStoreByTimeSlot() {
    $.ajax({
        url: "/BrandMap/GetAllBrandStore",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        async: true,
    }).done(function (response) {

    });
}
//Pick day for initing trade zone
function PickDay(dayLabel) {
    switch (dayLabel) {
        case 'mondayLabel':
            dayPickList[0] = SetColorForDayLabel(dayPickList[0], dayLabel);
            break;
        case 'tuesdayLabel':
            dayPickList[1] = SetColorForDayLabel(dayPickList[1], dayLabel);
            break;
        case 'wednesdayLabel':
            dayPickList[2] = SetColorForDayLabel(dayPickList[2], dayLabel);
            break;
        case 'thursdayLabel':
            dayPickList[3] = SetColorForDayLabel(dayPickList[3], dayLabel);
            break;
        case 'fridayLabel':
            dayPickList[4] = SetColorForDayLabel(dayPickList[4], dayLabel);
            break;
        case 'saturdayLabel':
            dayPickList[5] = SetColorForDayLabel(dayPickList[5], dayLabel);
            break;
        case 'sundayLabel':
            dayPickList[6] = SetColorForDayLabel(dayPickList[6], dayLabel);
            break;
    }
    let dayIsPick = false;
    for (let i = 0; i < dayPickList.length; i++) {
        if (dayPickList[i] == 1) {
            dayIsPick = true;
            break;
        }
    }
    if (!dayIsPick) {
        document.getElementById("pickDay-error").style.display = 'block';
    } else {
        document.getElementById("pickDay-error").style.display = 'none';
    }
}
//Set color for day label
function SetColorForDayLabel(dayPickListElement, dayLabel) {
    if (dayPickListElement == 0) {
        document.getElementById(dayLabel).classList.add("btn-success");
        document.getElementById(dayLabel).classList.remove("btn-default");
        dayPickListElement = 1;
    } else {
        document.getElementById(dayLabel).classList.add("btn-default");
        document.getElementById(dayLabel).classList.remove("btn-success");
        dayPickListElement = 0;
    }
    return dayPickListElement;
}
//Pick time slot for initing trade zone
function PickTimeSlot(timeSlotLabel) {
    switch (timeSlotLabel) {
        case 'labelTimeSlot1':
            timeSlotPickList[0] = SetColorForTimeSlotLabel(timeSlotPickList[0], timeSlotLabel);
            break;
        case 'labelTimeSlot2':
            timeSlotPickList[1] = SetColorForTimeSlotLabel(timeSlotPickList[1], timeSlotLabel);
            break;
        case 'labelTimeSlot3':
            timeSlotPickList[2] = SetColorForTimeSlotLabel(timeSlotPickList[2], timeSlotLabel);
            break;
        case 'labelTimeSlot4':
            timeSlotPickList[3] = SetColorForTimeSlotLabel(timeSlotPickList[3], timeSlotLabel);
            break;
    }
    //Validate timeSlot
    let timeIsPick = false;
    for (let i = 0; i < timeSlotPickList.length; i++) {
        if (timeSlotPickList[i] == 1) {
            timeIsPick = true;
            break;
        }
    }
    if (!timeIsPick) {
        document.getElementById("pickTimeSlot-error").style.display = 'block';
    } else {
        document.getElementById("pickTimeSlot-error").style.display = 'none';
    }
}
//Set color for day label
function SetColorForTimeSlotLabel(timeSlotPickListElement, timeSlotLabel) {
    if (timeSlotPickListElement == 0) {
        document.getElementById(timeSlotLabel).classList.add("btn-success");
        document.getElementById(timeSlotLabel).classList.remove("btn-default");
        timeSlotPickListElement = 1;
    } else {
        document.getElementById(timeSlotLabel).classList.add("btn-default");
        document.getElementById(timeSlotLabel).classList.remove("btn-success");
        timeSlotPickListElement = 0;
    }
    return timeSlotPickListElement;
}
//View trade zone version details
function ViewTradeZoneVersionDetail(id) {
    //Call api
    $.ajax({
        url: "/BrandMap/GetTradeZoneVersionById",
        data: {
            Id: id
        },
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {

        },
        async: true,
    }).done(function (response) {
        document.getElementById("detailTradeZoneId").value = response.id;
        document.getElementById("detailTradeZoneDistance").value = response.distance + " km";
        document.getElementById("detailTradeZoneStatus").checked = (response.isActive ? true : false);
        (response.isActive)
            ? document.getElementById("activeTradeZoneButton").style.display = "none"
            : document.getElementById("activeTradeZoneButton").style.display = "block"
        let dateList = response.dateFilter;
        //set dayDetail list
        if (dateList.length == 7) {
            for (let i = 0; i < dateList.length; i++) {
                dayDetailList[i] = parseInt(dateList.charAt(i));
            }
        } else if (dateList.length == 1) {
            for (let i = 0; i < dateList.length; i++) {
                dayDetailList[i] = parseInt(dateList.charAt(i));
            }
        }
        else {
            for (let i = 0; i < dateList.length; i++) {
                dayDetailList[i] = parseInt(dateList.charAt(i));
            }
            for (let i = dateList.length - 1; i < dayDetailList.length; i++) {
                dayDetailList[i] = 0;
            }
        }
        //set time slot detail List
        for (let i = 0; i < response.timeSlot.length; i++) {
            timeSlotDetailList[i] = parseInt(response.timeSlot.charAt(i));
        }
        SetDayLabelColor();
        SetTimeSlotLabelColor();
        //Set trade zone
        let tableOfTradeDetail = document.getElementById("bodyTradeZoneOfStoreTable");
        let center = ProcessingReponseForDetailTradeZone(layerDetailTradeZone, tableOfTradeDetail, response);
        map.setView(center, 13);
    });
}
//Set day label color
function SetDayLabelColor() {
    //set color Monday
    if (dayDetailList[0] == 1) {
        document.getElementById("monDetailLabel").classList.add("bg-primary");
    } else {
        document.getElementById("monDetailLabel").classList.add("bg-default");
    }
    //set color Tuesday
    if (dayDetailList[1] == 1) {
        document.getElementById("tueDetailLabel").classList.add("bg-primary");
    } else {
        document.getElementById("tueDetailLabel").classList.add("bg-default");
    }
    //set color Wednesday
    if (dayDetailList[2] == 1) {
        document.getElementById("wedDetailLabel").classList.add("bg-primary");
    } else {
        document.getElementById("wedDetailLabel").classList.add("bg-default");
    }
    //set color Thursday
    if (dayDetailList[3] == 1) {
        document.getElementById("thuDetailLabel").classList.add("bg-primary");
    } else {
        document.getElementById("thuDetailLabel").classList.add("bg-default");
    }
    //set color Friday
    if (dayDetailList[4] == 1) {
        document.getElementById("friDetailLabel").classList.add("bg-primary");
    } else {
        document.getElementById("friDetailLabel").classList.add("bg-default");
    }
    //set color Saturday
    if (dayDetailList[5] == 1) {
        document.getElementById("satDetailLabel").classList.add("bg-primary");
    } else {
        document.getElementById("satDetailLabel").classList.add("bg-default");
    }
    //set color Sunday
    if (dayDetailList[6] == 1) {
        document.getElementById("sunDetailLabel").classList.add("bg-primary");
    } else {
        document.getElementById("sunDetailLabel").classList.add("bg-default");
    }
}
//Set time slot label color
function SetTimeSlotLabelColor() {
    //set color time slot 1
    if (timeSlotDetailList[0] == 1) {
        document.getElementById("slot1DetailLabel").classList.add("bg-primary");
    } else {
        document.getElementById("slot1DetailLabel").classList.add("bg-default");
    }
    //set color time slot 2
    if (timeSlotDetailList[1] == 1) {
        document.getElementById("slot2DetailLabel").classList.add("bg-primary");
    } else {
        document.getElementById("slot2DetailLabel").classList.add("bg-default");
    }
    //set color time slot 3
    if (timeSlotDetailList[2] == 1) {
        document.getElementById("slot3DetailLabel").classList.add("bg-primary");
    } else {
        document.getElementById("slot3DetailLabel").classList.add("bg-default");
    }
    //set color time slot 4
    if (timeSlotDetailList[3] == 1) {
        document.getElementById("slot4DetailLabel").classList.add("bg-primary");
    } else {
        document.getElementById("slot4DetailLabel").classList.add("bg-default");
    }
}
//Remove color of laybel
function RemoveDayLabelColor() {
    if (dayDetailList[0] == 1) {
        document.getElementById("monDetailLabel").classList.remove("bg-primary");
    } else {
        document.getElementById("monDetailLabel").classList.remove("bg-default");
    }
    //set color Tuesday
    if (dayDetailList[1] == 1) {
        document.getElementById("tueDetailLabel").classList.remove("bg-primary");
    } else {
        document.getElementById("tueDetailLabel").classList.remove("bg-default");
    }
    //set color Wednesday
    if (dayDetailList[2] == 1) {
        document.getElementById("wedDetailLabel").classList.remove("bg-primary");
    } else {
        document.getElementById("wedDetailLabel").classList.remove("bg-default");
    }
    //set color Thursday
    if (dayDetailList[3] == 1) {
        document.getElementById("thuDetailLabel").classList.remove("bg-primary");
    } else {
        document.getElementById("thuDetailLabel").classList.remove("bg-default");
    }
    //set color Friday
    if (dayDetailList[4] == 1) {
        document.getElementById("friDetailLabel").classList.remove("bg-primary");
    } else {
        document.getElementById("friDetailLabel").classList.remove("bg-default");
    }
    //set color Saturday
    if (dayDetailList[5] == 1) {
        document.getElementById("satDetailLabel").classList.remove("bg-primary");
    } else {
        document.getElementById("satDetailLabel").classList.remove("bg-default");
    }
    //set color Sunday
    if (dayDetailList[6] == 1) {
        document.getElementById("sunDetailLabel").classList.remove("bg-primary");
    } else {
        document.getElementById("sunDetailLabel").classList.remove("bg-default");
    }
}
//Remove color of time slot laybel
function RemoveTimeSlotLabelColor() {
    //set color time slot 1
    if (timeSlotDetailList[0] == 1) {
        document.getElementById("slot1DetailLabel").classList.remove("bg-primary");
    } else {
        document.getElementById("slot1DetailLabel").classList.remove("bg-default");
    }
    //set color time slot 2
    if (timeSlotDetailList[1] == 1) {
        document.getElementById("slot2DetailLabel").classList.remove("bg-primary");
    } else {
        document.getElementById("slot2DetailLabel").classList.remove("bg-default");
    }
    //set color time slot 3
    if (timeSlotDetailList[2] == 1) {
        document.getElementById("slot3DetailLabel").classList.remove("bg-primary");
    } else {
        document.getElementById("slot3DetailLabel").classList.remove("bg-default");
    }
    //set color time slot 4
    if (timeSlotDetailList[3] == 1) {
        document.getElementById("slot4DetailLabel").classList.remove("bg-primary");
    } else {
        document.getElementById("slot4DetailLabel").classList.remove("bg-default");
    }
}
//Close trade zone version details
function CloseDetailTradeZone() {
    CloseConfirmBox();
    //Remove layer of detail tradezone
    RemoveLayerGroup(layerDetailTradeZone);
    //Remove color of day label
    RemoveDayLabelColor();
    //Rmove color of time slot label
    RemoveTimeSlotLabelColor();
}
//Processing response for trade zone of store detail
function ProcessingReponseForDetailTradeZone(layerDetailTradeZone, table, res) {
    //Set data for table
    let data = "";
    //Reset layer init trade zone
    RemoveLayerGroup(layerDetailTradeZone);
    //Show store's trade zone
    let listTradeZone = res.tradeZones;
    let center;
    if (listTradeZone != null && listTradeZone.length > 0) {
        for (let i = 0; i < listTradeZone.length; i++) {
            let id = listTradeZone[i].tradeZoneId;
            let name = listTradeZone[i].name;
            let weight = listTradeZone[i].totalWeight;
            let tradeZoneGeometry = listTradeZone[i].tradeZoneGeom;
            let storeGeometry = listTradeZone[i].storeGeom;
            //set layer Trade zone
            layerDetailTradeZonePostal = L.geoJson(tradeZoneGeometry, {
                style: StyleTradeZone,

                onEachFeature: function (feature, layer) {
                    layer.bindPopup(id + ". " + name + " - " + weight);
                    layer.on({
                        mouseover: highlightFeatureOfTradeZone,
                        mouseout: resetHighlightDetailTradeZone
                    });
                    layer.id = id;
                }
            });
            //set store initing Store
            let layerStorePostal = L.geoJson(storeGeometry, {
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
            })
            //set data for tradezone table
            data = data + '<tr>\
                <th class="text-center" scope = \"row\">'+ id + '</th>\
                                    <td class="tabledit-view-mode">\
                                        <span class="tabledit-span">'+ name + '</span>\
                                    </td>\
                                    <td style="white-space: nowrap; width: 1%">\
                                        <span class="tabledit-span">'+ weight + '</span>\
                                    </td>\
                                    <td style="white-space: nowrap; width: 1%; text-align: center">\
                                        <div class="btn-group btn-group-sm" style="float: none">\
                                            <button type = "button"\
                                                    class="tabledit-edit-button btn-mini btn btn-primary waves-effect waves-light"\
                                                    title="Move to location on the map"\
                                                    style = "float: none"\
                                                    onclick = "SetViewForStoreOfTradeZoneVersion(\''+ center.lat + '\'' + ", '" + center.lng + '\', \'' + id + '\')">\
                                                <span class="icofont icofont-location-arrow"></span>\
                                            </button>\
                                        </div>\
                                    </td>\
                                </tr>';
            layerDetailTradeZone.addLayer(layerDetailTradeZonePostal);
            layerDetailTradeZone.addLayer(layerStorePostal);
        }
    }
    //Set data for table of tab that trade zone
    table.innerHTML = data;
    layerDetailTradeZone.addTo(map);
    return center;
}
//Set highlight for detailTrade zone
function highlightFeatureOfDetailTradeZone(e) {
    let layer = e.target;
    layer.setStyle({
        fillColor: '#3a6eff',
        weight: 5,
        color: '#3a6eff',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
//reset 
function resetHighlightDetailTradeZone(e) {
    layerDetailTradeZonePostal.resetStyle(e.target);
}
//ACtive trade zone version function 
function ActiveTradeZoneVersion() {
    let id = document.getElementById("detailTradeZoneId").value;
    Swal.fire({
        title: 'Do you want to use this version?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1abc9c',
        cancelButtonColor: '#9ca5ab',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/BrandMap/ActiveTradeZoneVersionById",
                data: {
                    Id: id
                },
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                beforeSend: function () {

                },
                async: true,
            }).done(function (response) {
                if (response != null && response) {
                    idOfActiveTradeZone = id;
                    idOfDefaultTradeZone = id;
                    LoadTradeZone();
                    Swal.fire({
                        showConfirmButton: true,
                        confirmButtonColor: "#1ABC9C",
                        icon: 'success',
                        title: 'The version is actived'
                    });
                    //Load group zone for filter of store tab on the dashboard control
                    LoadGroupZoneForStoreTabFilter();
                    //Load all group zone and store and trade zone for filter of store tab with value is "All"
                    LoadAllGroupZoneForStoreTab();
                }
            }).fail(function () {
                Swal.fire({
                    showConfirmButton: true,
                    confirmButtonColor: "#1ABC9C",
                    icon: 'error',
                    title: 'Server error!'
                });
            })
        }
    })

}
//Delete TradeZone Version
function DeleteTradeZoneVersionDetail(id) {
    if (id == null) {
        id = document.getElementById("detailTradeZoneId").value;
    }
    Swal.fire({
        title: 'Do you want to delete this version?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1abc9c',
        cancelButtonColor: '#9ca5ab',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            if (id == idOfActiveTradeZone) {
                Swal.fire({
                    title: 'This version is active',
                    text: "Do you want to continue?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#1abc9c',
                    cancelButtonColor: '#9ca5ab',
                    confirmButtonText: 'Yes'
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            url: "/BrandMap/DeleteTradeZoneVersion",
                            data: {
                                Id: id
                            },
                            dataType: "json",
                            contentType: "application/json;charset=utf-8",
                            beforeSend: function () {

                            },
                            async: true,
                        }).done(function (response) {
                            if (response != false) {
                                LoadTradeZone();
                                Swal.fire({
                                    showConfirmButton: true,
                                    confirmButtonColor: "#1ABC9C",
                                    icon: 'success',
                                    title: 'Delete success!'
                                });
                            } else {
                                Swal.fire({
                                    showConfirmButton: true,
                                    confirmButtonColor: "#1ABC9C",
                                    icon: 'error',
                                    title: 'Server error!'
                                });
                            }
                        }).fail(function () {
                            Swal.fire({
                                showConfirmButton: true,
                                confirmButtonColor: "#1ABC9C",
                                icon: 'error',
                                title: 'Server error!'
                            });
                        })
                    }
                });
            } else {
                $.ajax({
                    url: "/BrandMap/DeleteTradeZoneVersion",
                    data: {
                        Id: id
                    },
                    dataType: "json",
                    contentType: "application/json;charset=utf-8",
                    beforeSend: function () {

                    },
                    async: true,
                }).done(function (response) {
                    LoadTradeZone();
                    if (response != false) {

                        Swal.fire({
                            showConfirmButton: true,
                            confirmButtonColor: "#1ABC9C",
                            icon: 'success',
                            title: 'Delete success!'
                        });
                    } else {
                        Swal.fire({
                            showConfirmButton: true,
                            confirmButtonColor: "#1ABC9C",
                            icon: 'error',
                            title: 'Server error!'
                        });
                    }
                }).fail(function () {
                    Swal.fire({
                        showConfirmButton: true,
                        confirmButtonColor: "#1ABC9C",
                        icon: 'error',
                        title: 'Server error!'
                    });
                })
            }

        }
    });
}
//View Group Zone Of TradeZone Detail by click on see detail button
function ViewGroupZoneOfTradeZoneDetail(id, name) {
    //Call api
    $.ajax({
        url: "/BrandMap/GetGroupZoneByTradeZoneVersionId",
        data: {
            Id: id
        },
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {

        },
        async: true,
    }).done(function (response) {
        let data = ""
        for (let i = 0; i < response.length; i++) {
            let name = response[i].name;
            let coverage = response[i].coverage;
            let idOfGroupZone = response[i].id;
            layerGroupZoneOfTradeZonePostal = L.geoJson(response[i].geom, {
                style: {
                    fillColor: dominos_blue_icon_color,
                    color: dominos_blue_icon_color,
                },
                onEachFeature: function (feature, layer) {
                    layer.on({
                        click: ZoomToFeature,
                        mouseover: HighlightGroupZoneOfTradeZone,
                        mouseout: ResetHighlightGroupZoneOfTradeZone,
                    });
                    let center = layer.getBounds().getCenter();
                    layer.id = idOfGroupZone;
                    data = data + '<tr>\
                                    <th class="text-center" scope = \"row\">'+ (i + 1) + '</th>\
                                    <td class="tabledit-view-mode">\
                                        <span class="tabledit-span">'+ name + '</span>\
                                    </td>\
                                    <td class="tabledit-view-mode">\
                                        <span class="tabledit-span">'+ coverage + ' %</span>\
                                    </td>\
                                    <td style="white-space: nowrap; width: 1%; text-align: center">\
                                        <div class="btn-group btn-group-sm" style="float: none">\
                                            <button type = "button"\
                                                    class="tabledit-edit-button btn-mini btn btn-primary waves-effect waves-light"\
                                                    title="Move to location on the map"\
                                                    style = "float: none"\
                                                    onclick = "SetViewForGroupZoneOfTradeZoneVersion(\''
                        + center.lat + '\'' + ", '"
                        + center.lng + "', '"
                        + idOfGroupZone + '\')">\
                                                <span class="icofont icofont-location-arrow"></span>\
                                            </button>\
                                            <button type = "button"\
                                                    class="tabledit-edit-button btn-mini btn btn-info waves-effect waves-light"\
                                                    title="See detail"\
                                                    style = "float: none"\
                                                    onclick = "ViewStoreOfGroupZone(\''
                        + center.lat + '\'' + ", '"
                        + center.lng + "', '"
                        + name + "', '"
                        + coverage + "','"
                        + idOfGroupZone + "', ' " + id + '\')">\
                                                <span class="icofont icofont-ui-file"></span>\
                                            </button>\
                                        </div>\
                                    </td>\
                                </tr>';
                }
            });
            layerGroupZoneOfTradeZone.addLayer(layerGroupZoneOfTradeZonePostal);

        }
        layerGroupZoneOfTradeZone.addTo(map);
        document.getElementById("bodyGroupZoneOfTradeZoneVersionTable").innerHTML = data;
        document.getElementById("titleOfGroupZone").innerHTML = "Group Zone of Trade zone <b>" + name + "</b>";
    });
    document.getElementById("groupZoneOfTradeZoneTab").style.left = 0;
}
//Function highlight group zone of trade zone
function HighlightGroupZoneOfTradeZone(e) {
    let layer = e.target;
    layer.setStyle({
        fillColor: dominos_blue_icon_color,
        weight: 5,
        color: dominos_blue_icon_color,
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
//Reset group zone of trade zone
function ResetHighlightGroupZoneOfTradeZone(e) {
    layerGroupZoneOfTradeZonePostal.resetStyle(e.target);
}
//function close Group zone of tradezone tab
function CloseGroupZoneOfTradeZone() {
    RemoveLayerGroup(layerGroupZoneOfTradeZone);
    document.getElementById("groupZoneOfTradeZoneTab").style.left = '-100%';
}
//function for set view group zone of trade zone
function SetViewForGroupZoneOfTradeZoneVersion(lat, lng, id) {
    layerGroupZoneOfTradeZone.eachLayer(function (layer) {
        layer.setStyle(StyleTradeZone);
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

    map.flyTo([lat, lng], 13);
}
//Function view store of group zone of trade zone version 
function ViewStoreOfGroupZone(lat, lng, nameGz, coverage, idGz, idTzv) {


    //Call api
    $.ajax({
        url: "/BrandMap/GetStoreByGroupZoneId",
        data: {
            IdGroupZone: idGz,
            IdTradeZoneVer: idTzv
        },
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {

        },
        async: true,
    }).done(function (response) {
        //show div
        document.getElementById("storeOfGroupZoneTab").style.left = 0;
        document.getElementById("storeOfGroupZoneTab").style.zIndex = 4;
        //Remove Layer Group
        map.removeLayer(layerGroupZoneOfTradeZone);
        //Create variable for store and trade zone of store
        let { groupZoneBoundary, listStoreTradeZone } = response;
        //Line of group zone that is watching
        let layerGroupZonePostal = L.geoJson(groupZoneBoundary, {
            style: {
                color: dominos_red_icon_color,
            },
            onEachFeature: function (feature, layer) {
                layer.type = 'line';
            }
        });
        //Create data variable for table
        let data = "";
        //Processing for response of store and trade zone of store
        for (let i = 0; i < listStoreTradeZone.length; i++) {
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
                style: StyleTradeZone,
                onEachFeature: function (feature, layer) {
                    //Center 

                    layer.bindPopup(id + '. ' + name + '<br>Weight: ' + weight)
                    layer.on({
                        mouseover: highlightFeatureOfTradeZone,
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
            layerGroupZoneOfStoreTab.addLayer(layerGroupZonePostal);
            layerStoreOfStoreTab.addLayer(layerStorePostal);
            layerTradeZoneOfStoreTab.addLayer(layerTradeZonePostal);
            //Add data
            document.getElementById("bodyOfStoreTradeZoneOfGroupZone").innerHTML = data;
            //Set title for tab
            document.getElementById("titleOfStoreTradeZone").innerHTML = "Store of Group zone <b>" + nameGz + "</b>";
            //Set coverage 
            document.getElementById("coverageOfGroupZone").innerHTML = "Coverage: <b>" + coverage + "%</b>";
        }

    })
    //Set view by flying
    map.flyTo([lat, lng], 14);
}
//Close tab of group zone's store
function CloseStoreOfGroupZone() {
    //Show the Layer of group zone
    layerGroupZoneOfTradeZone.addTo(map);
    document.getElementById("storeOfGroupZoneTab").style.left = "-100%";
}
//Set view for store trade zone of group zone
function SetViewForStoreOfGroupZone(lat, lng, id) {
    layerTradeZoneOfStoreTab.eachLayer(function (layer) {
        if (layer._layers[layer._leaflet_id - 1].type != 'line') {
            layer.setStyle(StyleTradeZone);
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
//Set view for store trade zone of trade zone version
SetViewForStoreOfTradeZoneVersion = (lat, lng, id) => {
    layerDetailTradeZone.eachLayer(function (layer) {
        if (layer._layers[layer._leaflet_id - 1].type != 'line') {
            layer.setStyle(StyleTradeZone);
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
//Remove other layers when click on tab store
document.getElementById("listStoreNavItem").onclick = () => {
    ResetStoreControlTab();
    let checkGroupZoneBox = document.getElementById("showAllGroupZoneCheckBox");
    if (checkGroupZoneBox.checked) {
        checkGroupZoneBox.click();
    }
    //Close trade zone tab 
    CloseDetailTradeZone();
    CloseGroupZoneOfTradeZone();
    CloseStoreOfGroupZone();
    //Close layer asset
    map.removeLayer(layerAsset);
    document.getElementById("tableOfTrackingAsset").display = "none";
}
//Remove other layers when click on tab trade zone
document.getElementById("listTradeZoneNavItem").onclick = () => {
    ResetStoreControlTab();
    document.getElementById("filterVersionTradeZone").value = idOfDefaultTradeZone;
    //
    let value = document.getElementById("filterVersionTradeZone").value;
    //
    ViewTradeZoneVersionDetail(value);
    //
    let checkGroupZoneBox = document.getElementById("showAllGroupZoneCheckBox");
    let checkStoreBox = document.getElementById("showAllStoreCheckBox");
    if (checkGroupZoneBox.checked) {
        checkGroupZoneBox.click();
    }
    if (checkStoreBox.checked) {
        checkStoreBox.click();
    }
    //Close layer asset
    map.removeLayer(layerAsset);
    document.getElementById("tableOfTrackingAsset").display = "none";
}
//Remove other layers when click on tab groupz zone
document.getElementById("listGroupZoneNavItem").onclick = () => {
    ResetStoreControlTab();
    let checkStoreBox = document.getElementById("showAllStoreCheckBox");
    if (checkStoreBox.checked) {
        checkStoreBox.click();
    }
    //Close layer asset
    map.removeLayer(layerAsset);
    document.getElementById("tableOfTrackingAsset").display = "none";
    //Close trade zone tab 
    CloseDetailTradeZone();
    CloseGroupZoneOfTradeZone();
    CloseStoreOfGroupZone();
}
//Remove other layer when click on tab asset 
document.getElementById("listAssetNavItem").onclick = () => {
    ResetStoreControlTab();
    let checkStoreBox = document.getElementById("showAllStoreCheckBox");
    let checkGroupZoneBox = document.getElementById("showAllGroupZoneCheckBox");
    if (checkGroupZoneBox.checked) {
        checkGroupZoneBox.click();
    }
    if (checkStoreBox.checked) {
        checkStoreBox.click();
    }
    //Close trade zone tab 
    CloseDetailTradeZone();
    CloseGroupZoneOfTradeZone();
    CloseStoreOfGroupZone();
}

//Tracking asset on the map
TrackingAsset = () => {
    ResetStoreControlTab();
    //Display table of asset
    document.getElementById("tableOfTrackingAsset").style.display = "block";
    //Display stop tracking button and hide tracking button
    document.getElementById("stopTrackingButton").style.display = "block";
    document.getElementById("trackingButton").style.display = "none";

    //Call api
    TrackingAssetByCallApi();
    //Traking by set Interval
    tracking = setInterval(() => TrackingAssetByCallApi(), 3000);
}
//Stop tracking asset
StopTrackingAsset = () => {
    //Display stop tracking button and hide tracking button
    document.getElementById("stopTrackingButton").style.display = "none";
    document.getElementById("trackingButton").style.display = "block";
    //stop tracking- stop interval
    clearInterval(tracking);
}
var string_test = "";
map.on('click', (e) => {
    string_test = string_test + e.latlng.lng + " " + e.latlng.lat + ", ";
})
//Call api for tracking asset
TrackingAssetByCallApi = () => {
    //Remove layer asset;
    RemoveLayerGroup(layerAsset);
    //Call api
    $.ajax({
        url: "/BrandMap/GetAssetLocation",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
        },
        async: true,
    }).done(function (response) {
        //create variable for data of table
        let data = "";
        //processing response
        for (let i = 0; i < response.length; i++) {
            let assetId = response[i].id;
            let name = response[i].name;
            let type = response[i].type;
            let typeString = "";
            switch (type) {
                case 1:
                    typeString = "Motor";
                    break;
                case 2:
                    typeString = "Truck";
                    break;
                case 3:
                    typeString = "Other";
                    break;
            }
            let geom = response[i].geometry;
            let currentLocation = response[i].currentLocationGeometry;
            let lat = currentLocation.coordinates[1];
            let lng = currentLocation.coordinates[0];

            //Set view for location if viewing
            if (assetId == assetIdViewing) {
                map.setView([lat, lng], 16)
            }
            //Set value for data
            data = data + '<tr>\
                                    <th class="text-center" scope = \"row\">'+ (i + 1) + '</th>\
                                    <td class="tabledit-view-mode">\
                                        <span class="tabledit-span">'+ name + '</span>\
                                    </td>\
                                    <td class="tabledit-view-mode">\
                                        <span class="tabledit-span">'+ typeString + '</span>\
                                    </td>\
                                    <td style="white-space: nowrap; width: 1%; text-align: center">\
                                        <div class="btn-group btn-group-sm" style="float: none">\
                                            <button type = "button"\
                                                    class="tabledit-edit-button btn-mini btn btn-primary waves-effect waves-light"\
                                                    title="Move to location on the map"\
                                                    style = "float: none"\
                                                    onclick = "SetViewForAssetLocation(\'' + assetId + "', '" + lat + "', '" + lng + '\')">\
                                                <span class="icofont icofont-location-arrow"></span>\
                                            </button>\
                                        </div>\
                                    </td>\
                                </tr>';
            //set layer for line on map
            let layerLinePostal = L.geoJson(geom);
            //set layer location on map
            let layerLocationPostal = L.marker([lat, lng]).setIcon(motor_icon).bindPopup(name);
            //Add layer postal to layerAsset
            layerAsset.addLayer(layerLinePostal);
            layerAsset.addLayer(layerLocationPostal);
            //Add layerAsset to map
            layerAsset.addTo(map);
        }
        document.getElementById("bodyOfTrackingAsset").innerHTML = data;
    });
}
//Set view for location 
SetViewForAssetLocation = (assetId, lat, lng) => {
    assetIdViewing = assetId;
    map.flyTo([lat, lng], 18);
}
//Test function
//Test = () => {
//    console.log("Interval");
//}
//Test
//let test = setInterval(() => console.log("Interval"), 3000);
//clearInterval(test)

//Filter store of store control tab
FilterStoreByGroupZone = () => {
    let select = document.getElementById("filterStoreControlTab");
    if (select.value != -1) { // Choose group zone
        //For hiding check box and table of all store
        let isCheck = document.getElementById("showAllStoreCheckBox").checked;
        if (isCheck) {
            document.getElementById("showAllStoreCheckBox").click();
        }
        //set group zone name
        let groupZoneName = select.options[select.selectedIndex].text;
        //Call api for group zone
        ViewStoreOfGroupZoneFilter(groupZoneName, select.value);
    } else { // All stores
        //Load for "all" option
        LoadAllGroupZoneForStoreTab();
    }
}
//reset store control tab
function ResetStoreControlTab() {
    document.getElementById("filterStoreControlTab").value = -1;
    let checkStoreBox = document.getElementById("showAllStoreCheckBox");
    let checkGroupZoneBox = document.getElementById("showGroupZoneCheckBox");
    let checkTradeZoneBox = document.getElementById("showTradeZoneCheckBox");
    if (checkGroupZoneBox.checked) {
        checkGroupZoneBox.click();
    }
    if (checkStoreBox.checked) {
        checkStoreBox.click();
    }
    if (checkTradeZoneBox.checked) {
        checkTradeZoneBox.click();
    }
}
//View store of group zone filter
function ViewStoreOfGroupZoneFilter(nameGz, idGz) {
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
        RemoveLayerGroup(layerStoreOfStoreTab);
        RemoveLayerGroup(layerGroupZoneOfStoreTab);
        RemoveLayerGroup(layerTradeZoneOfStoreTab);
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
            for (let i = 0; i < listStoreTradeZone.length; i++) {
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
                    style: StyleTradeZone,
                    onEachFeature: function (feature, layer) {
                        //Center 

                        layer.bindPopup(id + '. ' + name + '<br>Weight: ' + weight)
                        layer.on({
                            mouseover: highlightFeatureOfTradeZone,
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
                layerGroupZoneOfStoreTab.addLayer(layerGroupZonePostal);
                layerStoreOfStoreTab.addLayer(layerStorePostal);
                layerTradeZoneOfStoreTab.addLayer(layerTradeZonePostal);
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

        document.getElementById("loadingMainScreen").style.display = "none";
    })

}
//Onchange filter trade zone version
document.getElementById("filterVersionTradeZone").onchange = () => {
    //Close detail trade zone
    CloseDetailTradeZone();
    //asasas
    let value = document.getElementById("filterVersionTradeZone").value;
    ViewTradeZoneVersionDetail(value);
}
//LoadAllGroupZoneForStoreTab()
async function LoadAllGroupZoneForStoreTab() {
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
        document.getElementById("loadingMainScreen").style.display = "none";
        if (response == 204) {
            //Set display for table
            document.getElementById("tableOfStoreOfGroupZone").style.display = "none";
            document.getElementById("noActiveTradeZoneNotification").style.display = "block";
        } else {
            RemoveLayerGroup(layerStoreOfStoreTab);
            RemoveLayerGroup(layerGroupZoneOfStoreTab);
            RemoveLayerGroup(layerTradeZoneOfStoreTab);
            //Set display for table
            document.getElementById("tableOfStoreOfGroupZone").style.display = "block";
            document.getElementById("noActiveTradeZoneNotification").style.display = "none";
            //Process response
            if (response != null && response.length > 0) {
                let data = "";
                for (let i = 0; i < response.length; i++) {
                    console.log("In " + i);
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
                    layerGroupZoneOfStoreTab.addLayer(layerGroupZonePostal);
                    //Process store
                    if (stores.length > 0) {
                        for (let i = 0; i < stores.length; i++) {
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
                            layerStoreOfStoreTab.addLayer(layerStorePostal);
                            layerTradeZonePostal = L.geoJson(geometry, {
                                style: StyleTradeZone,
                                onEachFeature: function (feature, layer) {
                                    //Center 

                                    layer.bindPopup(id + '. ' + name + '<br>Weight: ' + weight)
                                    layer.on({
                                        mouseover: highlightFeatureOfTradeZone,
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
                            layerTradeZoneOfStoreTab.addLayer(layerTradeZonePostal);
                        }
                    }
                }
                //
                document.getElementById("tbodyOfStoreOfGroupZone").innerHTML = data;
            }
        }
    }).fail(function (response) {   
        document.getElementById("loadingMainScreen").style.display = "none";
    })
}
