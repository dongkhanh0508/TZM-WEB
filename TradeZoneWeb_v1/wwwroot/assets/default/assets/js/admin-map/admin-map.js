//Fly to store location if has
async function FlyToStoreFromHistory() {
    if (locationFromOtherRequest != null) {
        let start = locationFromOtherRequest.indexOf("[\n ");
        let end = locationFromOtherRequest.indexOf("\n]");
        let coor = locationFromOtherRequest.substring(start + 5, end);
        let latlong = coor.split(",");
        let lat = latlong[1].substring(2);
        let long = latlong[0].substring(1);
        let location = [];
        location.push(parseFloat(lat));
        location.push(parseFloat(long));
        map.flyTo(location, 18);
        if (locationFromOtherType == "Building") {
            layerBuildingGroup.addTo(map);
        } else if (locationFromOtherType == "Store") {
            if (buildingIdOfStore != null) {
                buildingIdOfStore = parseInt(buildingIdOfStore);
                layerBuildingGroup.addTo(map);
            }
            layerStoreGroup.addTo(map);
        }

    }
}
//window onload
window.onload = function () {
    document.getElementById("footerAdminMap").style.display = "none";
    setTimeout(FlyToStoreFromHistory, 1);
}
//Init Map by location and zoom
var sgView = "107.8890380356461 11.183987034480577, 105.7796630356461 11.183987034480577, 105.7796630356461 10.361050008948766, 107.8890380356461 10.361050008948766, 107.8890380356461 11.183987034480577";
var sgLocation = [10.772461, 106.698055]; //HCM location
var current_position, current_accuracy;
var map = L.map("map", {
    zoomSnap: 0.5
}).on('load', loadMap).setView(sgLocation, 13);
//Layer for ward polygon
var layerWardPolygonGroup;
//Layer for ward
var layerWardPostal;
var layerWardGroup = new L.LayerGroup();
//Layer for district
var layerDistrictPostal;
var layerDistrictGroup = new L.LayerGroup();
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
var layerStorePostalTemp;
var layerStorePostal = new L.LayerGroup();
var layerStoreGroup = new L.LayerGroup();
//Layer for system zone
var layerSystemZonePostal;
var layerSystemZoneGroup = new L.LayerGroup();
//Create format icon
var LeafIcon = L.Icon.extend({
    options: {
        iconSize: [15, 15],
    },
});
//Create format icon for store location
var LeafIconStore = L.Icon.extend({
    options: {
        iconSize: [24, 32],
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
//Create Building location icon
var building_surveyed_icon = new LeafIconBuilding({
    iconUrl: "/assets/default/assets/images/building-icon-md/building_surveyed_icon.svg",
});
var building_need_survey_icon = new LeafIconBuilding({
    iconUrl: "/assets/default/assets/images/building-icon-md/building_need_survey_icon.svg",
});
var building_need_approve_icon = new LeafIconBuilding({
    iconUrl: "/assets/default/assets/images/building-icon-md/building_need_approve_icon.svg",
});
//Create Store location icon
//Bakery - 1,2
var bakery_location_surveyed = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/barkery-surveyed.png"
});
var bakery_location_need_survey = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/barkery-need-survey.png"
})
var bakery_location_need_approve = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/barkery-need-approve.png"
})
//Barber - 3
var barber_location_surveyed = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/barber-surveyed.png"
});
var barber_location_need_survey = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/barber-need-survey.png"
})
var barber_location_need_approve = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/barber-need-approve.png"
})
//book shop - 4
var book_location_surveyed = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/book-shop-surveyed.png"
});
var book_location_need_survey = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/book-shop-need-survey.png"
})
var book_location_need_approve = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/book-shop-need-approve.png"
})
//car showrom - 5
var car_location_surveyed = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/car-showroom-surveyed.png"
});
var car_location_need_survey = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/car-showroom-need-survey.png"
})
var car_location_need_approve = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/car-showroom-need-approve.png"
})
//clothes shop - 6
var clothes_location_surveyed = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/clothes-shop-surveyed.png"
});
var clothes_location_need_survey = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/clothes-shop-need-survey.png"
})
var clothes_location_need_approve = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/clothes-shop-need-approve.png"
})
//Cafe - 7
var cafe_location_surveyed = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/coffee-surveyed.png"
});
var cafe_location_need_survey = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/coffee-need-survey.png"
})
var cafe_location_need_approve = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/coffee-need-approve.png"
})
//fastfood - 8 
var fastfood_location_surveyed = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/fastfood-surveyed.png"
});
var fastfood_location_need_survey = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/fastfood-need-survey.png"
})
var fastfood_location_need_approve = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/fastfood-need-approve.png"
})
//Grocery store - 9
var grocery_location_surveyed = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/grocery-store-surveyed.png"
});
var grocery_location_need_survey = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/grocery-store-need-survey.png"
})
var grocery_location_need_approve = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/grocery-store-need-approve.png"
})
//bike - 10
var bike_location_surveyed = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/bike-surveyed.png"
});
var bike_location_need_survey = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/bike-need-survey.png"
})
var bike_location_need_approve = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/bike-need-approve.png"
})
//Petrol station - 11
var petrol_location_surveyed = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/petrol-surveyed.png"
});
var petrol_location_need_survey = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/petrol-need-survey.png"
})
var petrol_location_need_approve = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/petrol-need-approve.png"
})
//Pet shop - 12
var pet_shop_location_surveyed = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/pet-shop-surveyed.png"
});
var pet_shop_location_need_survey = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/pet-shop-need-survey.png"
})
var pet_shop_location_need_approve = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/pet-shop-need-approve.png"
})
//Pharmacy - 13
var pharmacy_location_surveyed = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/pharmacy-surveyed.png"
});
var pharmacy_location_need_survey = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/pharmacy-need-survey.png"
})
var pharmacy_location_need_approve = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/pharmacy-need-approve.png"
})
//Restaurant - 14
var restaurant_location_surveyed = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/restaurant-surveyed.png"
});
var restaurant_location_need_survey = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/restaurant-need-survey.png"
})
var restaurant_location_need_approve = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/restaurant-need-approve.png"
})
//Stationer - 15
var stationer_location_surveyed = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/stationers-surveyed.png"
});
var stationer_location_need_survey = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/stationers-need-survey.png"
})
var stationer_location_need_approve = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/stationers-need-approve.png"
})
//default 
var default_location_surveyed = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/default-store-surveyed.png"
});
var default_location_need_survey = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/default-store-need-survey.png"
})
var default_location_need_approve = new LeafIconStore({
    iconUrl: "/assets/default/assets/images/store-icon/default-store-need-approve.png"
})
//Create GPS location icon
var gpsLocation = new LeafIcon({
    iconUrl: "/assets/default/assets/images/gps-icon.png",
});
//Create onclick location icon
var onclickLocation_icon = new LeafIcon({
    iconUrl: "/assets/default/assets/images/onClickPoint.png",
});
//Get Element by ID
var btnShowLocation = document.getElementById("btnShowLocation");
var cancelCreateNewZoneButton = document.getElementById("cancelCreateNewZoneButton");
var closeCreateNewZoneButton = document.getElementById("closeCreateNewZoneButton");
var createNewZoneButton = document.getElementById("createNewZoneButton");
var cancelCreateNewCampusButton = document.getElementById("cancelCreateNewCampusButton");
var closeCreateNewCampusButton = document.getElementById("closeCreateNewCampusButton");
var createNewCampusButton = document.getElementById("createNewCampusButton");
var nameCreateNew = document.getElementById("nameCreateNew");
var nameCreateNewCampus = document.getElementById("nameCreateNewCampus");
var typeCreateNew = document.getElementById("typeCreateNew");
var wardName = document.getElementById("wardName");
var districtName = document.getElementById("districtName");
var wardId = document.getElementById("wardId");
var surveyorName = document.getElementById("surveyorName");
var AssignNewSurveyor = document.getElementById("AssignNewSurveyor");
var buildingStatus = document.getElementById("buildingStatus");
var closeBuildingDetailButton = document.getElementById("closeBuildingDetailButton");
//Create geosearch control from GeoCoding
var searchControl = L.esri.Geocoding.geosearch().addTo(map);
//Create geo service from GeoCoding
var geocodeService = L.esri.Geocoding.geocodeService();
//Result of search value on search control from GeoCoding
var results = new L.layerGroup().addTo(map);
//Init onclick loction variable
var onclickLocation = [];
//Init Geo Json for drawn zone by Leaflet-Geoman
var geoJsonCreate;
//For saving surveyor data for assigning
var tempSurveyorData;
// Check for assign survey function on switch - Building
var isSwitchBuilding = false;
// Check for assign survey function on switch - Store
var isSwitchStore = false;
// Message for building status
var buildingStatusMess1 = "This building is surveyed";
var buildingStatusMess2 = "This building is assigned to survey";
// Message for store status
var storeStatusMess1 = "This store is surveyed";
var storeStatusMess2 = "This store is assigned to survey";
//Set var data for floors detail of buidling
var dataFloorOfBuiding = "";
//Set leaflet_id for checking zone
var leafletIdCheckingZone;
//Set name Systemzone var
var nameSystemZone;
//Set name campus var 
var nameCampus;
//Location from history
var locationFromOtherRequest = document.currentScript.getAttribute('locationFromOtherRequest');
var locationFromOtherRequestId = parseInt(document.currentScript.getAttribute('locationFromOtherRequestId'));
var locationFromOtherType = document.currentScript.getAttribute('locationFromOtherType');
var buildingIdOfStore = document.currentScript.getAttribute('buildingIdOfStore');
//Set isChecking variable 
var isChecking = false;
//Set cheking ward variable
var layerCheckingWard;

//Add title to map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 20,
    maxNativeZoom: 18
}).addTo(map);
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
//Add show location control
L.control.locate({
    strings: {
        title: "Show your location"
    }
}).addTo(map);
//Set style for locate button
document.getElementsByClassName("fa fa-map-marker")[0].style.marginTop = 5;
//Get zoom end event 
map.on('zoomend', function () {
    info.update(map);
});

var customControl = L.Control.extend({

    options: {
        position: 'topleft'
    },

    onAdd: function (map) {
        var container = L.DomUtil.create('button');
        container.type = "button";
        container.title = "Check system zone";
        container.value = "42";
        container.id = "CheckFullSystemZoneButton";

        container.style.backgroundColor = 'white';
        container.style.width = '30px';
        container.style.height = '30px';

        container.onclick = function () {
            if (isChecking) {
                document.getElementById("CheckFullSystemZoneButton").style.backgroundColor = "white"
                document.getElementById("iconCheck").style.color = 'black'
                map.removeLayer(layerWardPolygonGroup);
                isChecking = false;
            } else {
                if (layerWardPolygonGroup != null) {
                    document.getElementById("CheckFullSystemZoneButton").style.backgroundColor = "#2c3e50"
                    document.getElementById("iconCheck").style.color = 'white';
                    layerWardPolygonGroup.addTo(map);
                    isChecking = true;
                }
            };
        }

        return container;
    }
});
map.addControl(new customControl());
//Init CheckFullSystemZoneButton
document.getElementById("CheckFullSystemZoneButton").classList.add("leaflet-bar");
document.getElementById("CheckFullSystemZoneButton").style.height = "34px";
document.getElementById("CheckFullSystemZoneButton").style.width = "34px";
document.getElementById("CheckFullSystemZoneButton").innerHTML = '<i class="fa fa-check" id="iconCheck"></i>';

//Check layer on map and remove them
async function checkLayer() {
    await layerCenterGroup.clearLayers();
    await layerBuildingGroup.clearLayers();
    await layerStoreGroup.clearLayers();
    //if (map.hasLayer(layerStoreGroup)) {
    //    await map.removeLayer(layerCenterGroup);
    //    await map.removeLayer(layerStoreGroup);
    //    await map.removeLayer(layerBuildingGroup);
    //    layerCenterGroup = await new L.LayerGroup();
    //    layerStoreGroup = await new L.LayerGroup();
    //    layerBuildingGroup = await new L.LayerGroup();
    //}
}

//Find marker with id for change status surveyed
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
    },
    getPoplygonById: function (id) {
        let polygon = null;
        this.eachLayer(function (layer) {
            if (layer instanceof L.Polygon) {
                if (layer.options.id == id) {
                    polygon = layer;
                }
            }
        });
        return polygon;
    }
});

//Style for Ward Polygon
function StyleWardPolygon() {
    return {
        fillColor: 'red',
        weight: 2,
        opacity: 1,
        color: 'red',
        fillOpacity: 0.3
    }
}
//On each feature function
function onEachFeatureWard(feature, layer) {
    let check_close_buttton = '<button class="btn btn-mini btn-success" onclick="checkCloseWard(\'' +
        feature.properties.f3 +
        "'" +
        ')" >Check close</button>';
    let check_full_buttton = '<button class="btn btn-mini btn-info" onclick="checkFullWard(\'' +
        feature.properties.f3 +
        "'" +
        ')" >Check full</button>';
    let groupButton = '<div class="text-right">' + check_close_buttton + check_full_buttton + "</div>"
    layer.bindPopup(feature.properties.f2 + "<br><br>" + groupButton);
    layer.on({
        mouseover: highlightWard,
        mouseout: resetHighlightWard
    });
}
//highlight a Ward
function highlightWard(e) {
    let layer = e.target;
    layer.setStyle({
        fillColor: 'red',
        weight: 2,
        color: 'red',
        dashArray: '',
        fillOpacity: 0.7
    });
}
//Reset highlight ward
function resetHighlightWard(e) {
    layerWardPolygonGroup.resetStyle(e.target);
}
//Load buidling, wards, stores, campus for map
async function loadMap() {
    FlyToStoreFromHistory();
    //Load Ward polygon for checking
    $.ajax({
        url: "/AdminMap/LoadWardPolygonForAdminMap",
        method: 'POST',
        data: JSON.stringify({
            CoordinateString: `${sgView}`
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        async: true,
    }).done(function (response) {
        layerWardPolygonGroup = L.geoJson(response, {
            style: StyleWardPolygon,
            onEachFeature: onEachFeatureWard
        })
    });
    //Load district by getting Api
    $.ajax({
        url: "/AdminMap/LoadDistrictForAdminMap",
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
    //Load wards by getting API
    $.ajax({
        url: "/AdminMap/LoadWardForAdminMap",
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
    LoadCampusForMap();
    //Get System Zone by getting api
    LoadSystemZoneForMap();
    //Fly to store

};
//Create Stack layer to show building, wards, stores, campus
var overlayMaps = {
    District: layerDistrictGroup,
    Wards: layerWardGroup,
    Building: layerBuildingGroup,
    Store: layerStoreGroup,
    Campus: layerCampusGroup,
    SystemZone: layerSystemZoneGroup
};

//Add layer control for map
var layerscontrol = L.control.layers(null, overlayMaps).addTo(map);

//Add draw controler for map from Leaflet-Geoman
map.pm.Toolbar.copyDrawControl('Polygon', {
    name: 'Campus',
    block: 'draw',
    title: 'Draw Campus',
    className: "icofont icofont-building-alt f-20",
})
map.pm.Toolbar.copyDrawControl('Polygon', {
    name: 'System Zone',
    block: 'draw',
    title: 'Draw System Zone',
    className: "icofont icofont-map-pins f-20",
})
map.pm.enableDraw('System Zone', {
    snappable: true,
    snapDistance: 100,
    templineStyle: {
        color: dominos_blue_icon_color,
        weight: 1
    },
    hintlineStyle: {
        color: dominos_blue_icon_color,
        dashArray: '3',
        weight: 1
    }
});
map.pm.disableDraw('System Zone');
map.pm.setPathOptions({
    fillColor: dominos_blue_icon_color,
    weight: 3,
    color: dominos_blue_icon_color,
    dashArray: '',
    fillOpacity: 0.7
}, {
    ignoreShapes: ['Campus']
});
map.pm.addControls({
    position: "topleft",
    drawPolyline: false,
    drawPolygon: false,
    drawCircle: false,
    drawMarker: false,
    drawCircleMarker: false,
    dragMode: false,
    editControls: false,
    drawRectangle: false,
});

//Get event creat from Leaflet Geoman to add a new zone
map.on("pm:create", (e) => {
    let layergroup = map.pm.getGeomanDrawLayers(true);
    layergroup.eachLayer(function (layer) {
        geoJsonCreate = layer.toGeoJSON().geometry;
        leafletIdCheckingZone = layer._leaflet_id;
    });

    let coor = "";
    for (let index = 0; index < geoJsonCreate.coordinates[0].length; index++) {
        if (index == geoJsonCreate.coordinates[0].length - 1) {
            coor =
                coor +
                geoJsonCreate.coordinates[0][index][0] +
                " " +
                geoJsonCreate.coordinates[0][index][1];
        } else {
            coor =
                coor +
                geoJsonCreate.coordinates[0][index][0] +
                " " +
                geoJsonCreate.coordinates[0][index][1] +
                ",";
        }
    }
    switch (e.shape) {
        case 'System Zone':
            $.ajax({
                url: "/AdminMap/CheckValidSystemZone",
                method: 'POST',
                data: JSON.stringify({
                    CoordinateString: `${coor}`
                }),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                beforeSend: function () {
                    document.getElementById("checkingSystemzonePreloader").style.display = "flex";
                },
                async: true,
            }).done(function (response) {
                document.getElementById("checkingSystemzonePreloader").style.display = "none";
                if (response) {
                    districtName.value = response.districtName;
                    wardName.value = response.name;
                    wardId.value = response.id;
                    document.getElementById("wkt").value = Terraformer.WKT.convert(geoJsonCreate);
                    document.getElementById("typeCreateNew").value = "System Zone";
                    document.getElementById("newZone").click();
                } else {
                    let layergroup = map.pm.getGeomanDrawLayers(true);
                    layergroup.eachLayer(function (layer) { map.removeLayer(layer); });
                    Swal.fire({
                        icon: "error",
                        title: "Invalid Zone",
                        text: "The zone is located in more than one ward.",
                    });
                }
            });
            break;
        case 'Campus':
            $.ajax({
                url: "/AdminMap/CheckValidCampus",
                method: 'POST',
                data: JSON.stringify({
                    CoordinateString: `${coor}`
                }),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                beforeSend: function () {
                    document.getElementById("checkingSystemzonePreloader").style.display = "flex";
                },
                async: true,
            }).done(function (response) {
                document.getElementById("checkingSystemzonePreloader").style.display = "none";
                if (response) {
                    $.ajax({
                        url: "/AdminMap/GetStreetSegmentInRadiusByCoordinate",
                        method: 'POST',
                        data: JSON.stringify({
                            CoordinateString: `${coor}`
                        }),
                        dataType: "json",
                        contentType: "application/json;charset=utf-8",
                        async: true,
                    }).done(function (res) {
                        let dataStreet = '<select class="form-control form-control-default" name="select" multiple id="streetOfCampus">';
                        for (var i = 0; i < res.listStreetSegment.length; i++) {
                            dataStreet = dataStreet
                                + '<option value="'
                                + res.listStreetSegment[i].id
                                + '" onclick="ChooseStreetSegment(\''
                                + res.listStreetSegment[i].id + '\')" id="'
                                + res.listStreetSegment[i].id + '">'
                                + res.listStreetSegment[i].name
                                + '</option>';
                        }
                        dataStreet = dataStreet + '</select>';
                        document.getElementById("streetSelector").innerHTML = dataStreet;
                        $('#streetOfCampus').multiSelect();
                    });
                    document.getElementById("wktCampus").value = Terraformer.WKT.convert(geoJsonCreate);
                    document.getElementById("typeCreateNewCampus").value = "Campus";
                    document.getElementById("nameCreateNewCampus-error").style.display = "none";
                    nameCreateNewCampus.style.background = "#fff";
                    nameCreateNewCampus.style.border = "1px solid rgba(0,0,0,.15)";
                    nameCreateNewCampus.style.color = "#464a4c";
                    document.getElementById("newCampus").click();
                } else {
                    let layergroup = map.pm.getGeomanDrawLayers(true);
                    layergroup.eachLayer(function (layer) { map.removeLayer(layer); });
                    Swal.fire({
                        icon: "error",
                        title: "Invalid Zone",
                        text: "Do not let campus cut building or coincides with existed campus",
                    });
                }
            });
            break;
    }


});

//Show the result of search Control from Geo coding
searchControl.on("results", function (data) {
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(
            L.marker(data.results[i].latlng)
                .bindPopup(data.results[i].text)
                .openPopup()
        );
    }
});
//Function for set icon location store
function SetIconForLocationStore(type, status, marker) {
    switch (type) {
        case "Baker": // 1 2
            switch (status) {
                case 1: //Surveyed
                    return marker.setIcon(bakery_location_surveyed);
                    break;
                case 2: //Need surveyed
                    return marker.setIcon(bakery_location_need_survey);
                    break;
                case 3: //Need aprrove
                    return marker.setIcon(bakery_location_need_approve);
                    break;
            };
            break;
        case "Barbers": // 3
            switch (status) {
                case 1: //Surveyed
                    return marker.setIcon(barber_location_surveyed);
                    break;
                case 2: //Need surveyed
                    return marker.setIcon(barber_location_need_survey);
                    break;
                case 3: //Need aprrove
                    return marker.setIcon(barber_location_need_approve);
                    break;
            };
            break;
        case "Bookshop": // 4
            switch (status) {
                case 1: //Surveyed
                    return marker.setIcon(book_location_surveyed);
                    break;
                case 2: //Need surveyed
                    return marker.setIcon(book_location_need_survey);
                    break;
                case 3: //Need aprrove
                    return marker.setIcon(book_location_need_approve);
                    break;
            };
            break;
        case "Car showroom": // 5
            switch (status) {
                case 1: //Surveyed
                    return marker.setIcon(car_location_surveyed);
                    break;
                case 2: //Need surveyed
                    return marker.setIcon(car_location_need_survey);
                    break;
                case 3: //Need aprrove
                    return marker.setIcon(car_location_need_approve);
                    break;
            };
            break;
        case "Clothes shop": // 6
            switch (status) {
                case 1: //Surveyed
                    return marker.setIcon(clothes_location_surveyed);
                    break;
                case 2: //Need surveyed
                    return marker.setIcon(clothes_location_need_survey);
                    break;
                case 3: //Need aprrove
                    return marker.setIcon(clothes_location_need_approve);
                    break;
            };
            break;
        case "Coffee": //7
            switch (status) {
                case 1: //Surveyed
                    return marker.setIcon(cafe_location_surveyed);
                    break;
                case 2: //Need surveyed
                    return marker.setIcon(cafe_location_need_survey);
                    break;
                case 3: //Need aprrove
                    return marker.setIcon(cafe_location_need_approve);
                    break;
            };
            break;
        case "Fast food": //8
            switch (status) {
                case 1: //Surveyed
                    return marker.setIcon(fastfood_location_surveyed);
                    break;
                case 2: //Need surveyed
                    return marker.setIcon(fastfood_location_need_survey);
                    break;
                case 3: //Need aprrove
                    return marker.setIcon(fastfood_location_need_approve);
                    break;
            };
            break;
        case "Grocery store": //9
            switch (status) {
                case 1: //Surveyed
                    return marker.setIcon(grocery_location_surveyed);
                    break;
                case 2: //Need surveyed
                    return marker.setIcon(grocery_location_need_survey);
                    break;
                case 3: //Need aprrove
                    return marker.setIcon(grocery_location_need_approve);
                    break;
            };
            break;
        case "Motobycle shop": //10 
            switch (status) {
                case 1: //Surveyed
                    return marker.setIcon(bike_location_surveyed);
                    break;
                case 2: //Need surveyed
                    return marker.setIcon(bike_location_need_survey);
                    break;
                case 3: //Need aprrove
                    return marker.setIcon(bike_location_need_approve);
                    break;
            };
            break;
        case "Petrol station": //11
            switch (status) {
                case 1: //Surveyed
                    return marker.setIcon(petrol_location_surveyed);
                    break;
                case 2: //Need surveyed
                    return marker.setIcon(petrol_location_need_survey);
                    break;
                case 3: //Need aprrove
                    return marker.setIcon(petrol_location_need_approve);
                    break;
            };
            break;
        case "Petshop": //12
            switch (status) {
                case 1: //Surveyed
                    return marker.setIcon(pet_shop_location_surveyed);
                    break;
                case 2: //Need surveyed
                    return marker.setIcon(pet_shop_location_need_survey);
                    break;
                case 3: //Need aprrove
                    return marker.setIcon(pet_shop_location_need_approve);
                    break;
            };
            break;
        case "Pharmacy": //13
            switch (status) {
                case 1: //Surveyed
                    return marker.setIcon(pharmacy_location_surveyed);
                    break;
                case 2: //Need surveyed
                    return marker.setIcon(pharmacy_location_need_survey);
                    break;
                case 3: //Need aprrove
                    return marker.setIcon(pharmacy_location_need_approve);
                    break;
            };
            break;
        case "Restaurant": //14
            switch (status) {
                case 1: //Surveyed
                    return marker.setIcon(restaurant_location_surveyed);
                    break;
                case 2: //Need surveyed
                    return marker.setIcon(restaurant_location_need_survey);
                    break;
                case 3: //Need aprrove
                    return marker.setIcon(restaurant_location_need_approve);
                    break;
            };
            break;
        case "Stationer": //15
            switch (status) {
                case 1: //Surveyed
                    return marker.setIcon(stationer_location_surveyed);
                    break;
                case 2: //Need surveyed
                    return marker.setIcon(stationer_location_need_survey);
                    break;
                case 3: //Need aprrove
                    return marker.setIcon(stationer_location_need_approve);
                    break;
            };
            break;


        default:
            switch (status) {
                case 1: //Surveyed
                    return marker.setIcon(default_location_surveyed);
                    break;
                case 2: //Need surveyed
                    return marker.setIcon(default_location_need_survey);
                    break;
                case 3: //Need aprrove
                    return marker.setIcon(default_location_need_approve);
                    break;
            };
    }
}

//Catch event move end on map to show store location
map.on("moveend", async function () {
    checkLayer();
    let bot = map.getBounds()._southWest.lat;
    let left = map.getBounds()._southWest.lng;
    let top = map.getBounds()._northEast.lat;
    let right = map.getBounds()._northEast.lng;
    let coor = `${right} ${top}, ${left} ${top}, ${left} ${bot}, ${right} ${bot}, ${right} ${top}`;
    if (map.getZoom() >= 18) {
        //Get store by getting api
        $.ajax({
            url: "/AdminMap/GetStoreForMap",
            method: 'POST',
            data: JSON.stringify({
                CoordinateString: `${coor}`
            }),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            async: true,
        }).done(function (response) {
            layerStorePostalTemp = L.geoJson(response, {
                onEachFeature: function (feature, layer) {
                    let coor = feature.geometry.coordinates;
                    let lat = coor[1];
                    let lng = coor[0]
                    let marker = L.marker([lat, lng], { id: feature.properties.f4 })
                        .bindPopup(feature.properties.f2)
                        .on('click', function (e) {
                            document.getElementById('seeStoreDetailButton').click();
                            initStoreModal(feature.properties.f4);
                        })
                        .on('mouseover', function (e) {
                            e.target.openPopup();
                        })
                        .on('mouseout', function (e) {
                            e.target.closePopup();
                        })
                    //let detail_button = '<div class="text-right"><button class="btn btn-mini btn-info" data-toggle="modal" data-target="#seeStoreDetail" onclick="initStoreModal(\'' +
                    //    feature.properties.f4 +
                    //    "'" +
                    //    ')" >Detail</button></div>';
                    marker = SetIconForLocationStore(feature.properties.f1, feature.properties.f3, marker);
                    //marker.bindPopup(feature.properties.f2 + "<br><br>" + detail_button);
                    layerStorePostal.addLayer(marker);
                },
            });
            layerStoreGroup.addLayer(layerStorePostal);
            if (locationFromOtherRequestId && map.getMarkerById(locationFromOtherRequestId) != null) {
                map.getMarkerById(locationFromOtherRequestId).openPopup();
                locationFromOtherRequestId = null;
            }
        });
    }

    if (map.getZoom() >= 16) {
        //Get building by getting api
        $.ajax({
            url: "/AdminMap/GetBuildingForMap",
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
                    layer.id = feature.properties.f4;
                    let center = layer.getBounds().getCenter();
                    let detail_button;
                    let segment_button = '<button class="btn btn-mini btn-info" data-toggle="modal" data-target="#seeBuildingSegment" onclick="initBuildingSegment(\'' +
                        feature.properties.f4 +
                        "'" +
                        ')" >Segment</button>';
                    let marker;
                    //Create detail button
                    detail_button =
                        '<div class="text-right">' + segment_button + '<button class="btn btn-mini btn-info" data-toggle="modal" data-target="#seeBuildingDetail" onclick="initBuilding(\'' +
                        feature.properties.f4 +
                        "'" +
                        ')" >Detail</button></div>';
                    switch (feature.properties.f3) {
                        case 1: //Surveyed
                            layer.setStyle({
                                color: "grey",
                            });
                            
                            //Marker
                            marker = L.marker(center, { id: feature.properties.f4 })
                                .setIcon(building_surveyed_icon)
                                .bindPopup(feature.properties.f2 + "<br><br>" + detail_button);
                                /*.bindPopup(feature.properties.f2)*/
                                //.on('click', function () {
                                //    document.getElementById("seeBuildingDetailButton").click();
                                //    initBuilding(feature.properties.f4);
                                //})
                                //.on('mouseover', function (e) {
                                //    e.target.openPopup();
                                //})
                                //.on('mouseout', function (e) {
                                //    e.target.closePopup();
                                //});
                            layerCenterGroup.addLayer(marker);
                            break;
                        case 2: // Need Surveyed
                            layer.setStyle({
                                color: "grey",
                            });
                            marker = L.marker(center, { id: feature.properties.f4 })
                                .setIcon(building_need_survey_icon)
                                .bindPopup(feature.properties.f2 + "<br><br>" + detail_button);
                                //.bindPopup(feature.properties.f2)
                                //.on('click', function () {
                                //    document.getElementById("seeBuildingDetailButton").click();
                                //    initBuilding(feature.properties.f4);
                                //})
                                //.on('mouseover', function (e) {
                                //    e.target.openPopup();
                                //})
                                //.on('mouseout', function (e) {
                                //    e.target.closePopup();
                                //});
                            layerCenterGroup.addLayer(marker);
                            break;
                        case 3: // Need Apporove
                            layer.setStyle({
                                color: "grey",
                            });
                            marker = L.marker(center, { id: feature.properties.f4 })
                                .setIcon(building_need_approve_icon)
                                .bindPopup(feature.properties.f2 + "<br><br>" + detail_button);
                                //.bindPopup(feature.properties.f2)
                                //.on('click', function () {
                                //    document.getElementById("seeBuildingDetailButton").click();
                                //    initBuilding(feature.properties.f4);
                                //})
                                //.on('mouseover', function (e) {
                                //    e.target.openPopup();
                                //})
                                //.on('mouseout', function (e) {
                                //    e.target.closePopup();
                                //});
                            layerCenterGroup.addLayer(marker);
                            break;
                    }
                },
            });
            layerBuildingGroup.addLayer(layerBuildingPostal);
            layerBuildingGroup.addLayer(layerCenterGroup);
            if (buildingIdOfStore && map.getMarkerById(buildingIdOfStore) != null) {
                map.getMarkerById(buildingIdOfStore).openPopup();
                buildingIdOfStore = null;
            }
        });
    }
});

// map.on("click", function (e) {
//   if (onclickLocation != []) map.removeLayer(onclickLocation);
//   geocodeService
//     .reverse()
//     .latlng(e.latlng)
//     .run(function (error, result) {
//       if (error) {
//         return;
//       }
//       onclickLocation = L.marker(result.latlng, {
//         icon: onclickLocation_icon,
//       })
//         .addTo(map)
//         .bindPopup(result.address.Match_addr)
//         .openPopup();
//     });
// });

//Cancel drawn campus
cancelCreateNewCampusButton.onclick = function () {
    let layergroup = map.pm.getGeomanDrawLayers(true);
    layergroup.eachLayer(function (layer) {
        if (leafletIdCheckingZone == layer._leaflet_id) {
            map.removeLayer(layer);
        }
    });
};
//Cancel drawn campus
closeCreateNewCampusButton.onclick = function () {
    let layergroup = map.pm.getGeomanDrawLayers(true);
    layergroup.eachLayer(function (layer) {
        if (leafletIdCheckingZone == layer._leaflet_id) {
            map.removeLayer(layer);
        }
    });
};
//nameCreateNewCampus on change
nameCreateNewCampus.oninput = function () {
    let campusNameRegex = /^[a-zA-Z0-9\- ]+$/;
    let validCampusName = nameCreateNewCampus.value.match(campusNameRegex);
    if (validCampusName == null) {
        document.getElementById("nameCreateNewCampus-error").style.display = "block";
        nameCreateNewCampus.style.background = "#fbe3e4";
        nameCreateNewCampus.style.border = "1px solid #fbc2c4";
        nameCreateNewCampus.style.color = "#8a1f11";
    } else {
        document.getElementById("nameCreateNewCampus-error").style.display = "none";
        nameCreateNewCampus.style.background = "#fff";
        nameCreateNewCampus.style.border = "1px solid rgba(0,0,0,.15)";
        nameCreateNewCampus.style.color = "#464a4c";
    }
}
//Create new campus button on click
createNewCampusButton.onclick = function () {
    let streetOfCampus = document.getElementById("streetOfCampus").value;
    let campusNameRegex = /^[a-zA-Z0-9\- ]+$/;
    let validCampusName = nameCreateNewCampus.value.match(campusNameRegex);
    if (validCampusName == null) {
        document.getElementById("nameCreateNewCampus-error").style.display = "block";
        nameCreateNewCampus.style.background = "#fbe3e4";
        nameCreateNewCampus.style.border = "1px solid #fbc2c4";
        nameCreateNewCampus.style.color = "#8a1f11";
        return false;
    } else if (streetOfCampus == "") {
        return false;
    } else {
        let selected = [];
        for (var option of document.getElementById('streetOfCampus').options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        $.ajax({
            url: "/AdminMap/AddNewCampus",
            method: 'POST',
            data: JSON.stringify({
                Name: nameCreateNewCampus.value,
                Wkt: document.getElementById("wktCampus").value,
                StreetSegmentId: selected
            }),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            beforeSend: function () {
                document.getElementById("checkingCreateCampusPreloader").style.display = "flex";
            },
            method: 'POST',
            async: true,
        }).done(function (response) {
            if (response == false) {
                Swal.fire({
                    showConfirmButton: true,
                    confirmButtonColor: "#1ABC9C",
                    icon: 'error',
                    title: 'Server error!'
                })
            } else {
                ReloadCampusForMap();
                document.getElementById("checkingCreateCampusPreloader").style.display = "none";
                cancelCreateNewCampusButton.click();
                map.removeLayer(layerCampusGroup);
                layerCampusGroup.addTo(map);
                Swal.fire({
                    showConfirmButton: true,
                    confirmButtonColor: "#1ABC9C",
                    icon: 'success',
                    title: 'Create success!'
                })
            }
        });
    }
}

//Cancel drawn zone or street
cancelCreateNewZoneButton.onclick = function () {
    let layergroup = map.pm.getGeomanDrawLayers(true);
    layergroup.eachLayer(function (layer) {
        if (leafletIdCheckingZone == layer._leaflet_id) {
            map.removeLayer(layer);
        }
    });
};
//Cancel drawn zone or street
closeCreateNewZoneButton.onclick = function () {
    let layergroup = map.pm.getGeomanDrawLayers(true);
    layergroup.eachLayer(function (layer) {
        if (leafletIdCheckingZone == layer._leaflet_id) {
            map.removeLayer(layer);
        }
    });
};
//Name of create new on change
nameCreateNew.oninput = function () {
    let systemzoneNameRegex = /^[a-zA-Z0-9\- ]+$/;
    let validsystemzoneName = nameCreateNew.value.match(systemzoneNameRegex);
    if (validsystemzoneName == null) {
        document.getElementById("nameCreateNew-error").style.display = "block";
        nameCreateNew.style.background = "#fbe3e4";
        nameCreateNew.style.border = "1px solid #fbc2c4";
        nameCreateNew.style.color = "#8a1f11";
    } else {
        document.getElementById("nameCreateNew-error").style.display = "none";
        nameCreateNew.style.background = "#fff";
        nameCreateNew.style.border = "1px solid rgba(0,0,0,.15)";
        nameCreateNew.style.color = "#464a4c";
    }
}
//Create new system zone or campus
createNewZoneButton.onclick = function () {
    let systemzoneNameRegex = /^[a-zA-Z0-9\- ]+$/;
    let validsystemzoneName = nameCreateNew.value.match(systemzoneNameRegex);
    if (validsystemzoneName == null) {
        document.getElementById("nameCreateNew-error").style.display = "block";
        nameCreateNew.style.background = "#fbe3e4";
        nameCreateNew.style.border = "1px solid #fbc2c4";
        nameCreateNew.style.color = "#8a1f11";
        return false;
    } else {
        $.ajax({
            url: "/AdminMap/AddNewSystemZone",
            method: 'POST',
            data: JSON.stringify({
                Name: nameCreateNew.value,
                Wkt: document.getElementById("wkt").value,
                WardId: wardId.value
            }),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            beforeSend: function () {
                document.getElementById("checkingCreateSystemZonePreloader").style.display = "flex";
            },
            async: true,
        }).done(function (response) {
            if (response == false) {
                Swal.fire({
                    showConfirmButton: true,
                    confirmButtonColor: "#1ABC9C",
                    icon: 'error',
                    title: 'Server error!'
                })
            } else {
                ReloadSystemZoneForMap();
                document.getElementById("checkingCreateSystemZonePreloader").style.display = "none";
                cancelCreateNewZoneButton.click();
                map.removeLayer(layerSystemZoneGroup);
                layerSystemZoneGroup.addTo(map);
                Swal.fire({
                    showConfirmButton: true,
                    confirmButtonColor: "#1ABC9C",
                    icon: 'success',
                    title: 'Create success!'
                })
            }
        })

    }

};
//Map id and name into detail system zone table
function mapIdAndName(name, id) {
    document.getElementById("systemZoneName").value = name;
    document.getElementById("systemZoneId").value = id;
    setTableSurveyor(id);
}
//Remove suveyor from system zone
function removeSurveyor(mapId, surveyorId) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#13866f",
        cancelButtonColor: "#9ca5ab",
        confirmButtonText: "Yes, remove!",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/AdminMap/RemoveSurveyorFromMap",
                method: 'POST',
                data: JSON.stringify({
                    AccountId: `${surveyorId}`,
                    SystemZoneId: `${mapId}`
                }),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                async: true,
            }).done(function (response) {
                setTableSurveyor(response.systemZoneId)
            });
            Swal.fire({
                showConfirmButton: true,
                confirmButtonColor: "#1ABC9C",
                icon: 'success',
                title: 'Delete success!'
            })
        }
    });
}
//set Table list surveyor who are surveying for systemzone
function setTableSurveyor(id) {
    $.ajax({
        url: "/AdminMap/GetSurveyorOfSystemZone",
        method: 'POST',
        data: JSON.stringify({
            SystemZoneId: `${id}`
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
            document.getElementById("systemZonePreloader").style.display = "flex";
        },
        async: true,
    }).done(function (response) {
        if (response.length > 0) {
            let data = "";
            for (let index = 0; index < response.length; index++) {
                data =
                    data +
                    "\n" +
                    '<tr>\
    <td class="tabledit-view-mode">\
      <span class="tabledit-span">' +
                    response[index].fullname +
                    '</span\
      ><input\
        class="tabledit-input form-control input-sm"\
        type="text"\
        name="fullName"\
        value="Mark"\
        style="display: none"\
        disabled=""\
      />\
    </td>\
    <td class="tabledit-view-mode">\
      <span class="tabledit-span">' +
                    response[index].email +
                    '</span\
      ><input\
        class="tabledit-input form-control input-sm"\
        type="text"\
        name="Last Name"\
        value="Otto"\
        style="display: none"\
        disabled=""/>\
    </td>\
    <td class="tabledit-view-mode">\
      <span class="tabledit-span">' +
                    response[index].phoneNumber +
                    '</span\
      ><input\
        class="tabledit-input form-control input-sm"\
        type="text"\
        name="Last Name"\
        value="Otto"\
        style="display: none"\
        disabled=""/>\
    </td>\
    <td style="white-space: nowrap; width: 1%">\
      <div\
        class="tabledit-toolbar btn-toolbar"\
        style="text-align: left"\
      >\
        <div\
          class="btn-group btn-group-sm"\
          style="float: none"\
        >\
          <button\
            type="button"\
            class="tabledit-delete-button btn btn-danger waves-effect waves-light"\
            style="float: none; margin: 5px"\
            onclick="removeSurveyor(\'' +
                    id +
                    "','" +
                    response[index].id +
                    '\')"\
          >\
            <span\
              class="icofont icofont-ui-remove"\
            ></span>\
          </button>\
        </div>\
      </div>\
    </td>\
  </tr>';
            }
            let inListData = '<div class="table-responsive"\
            style = "margin-right: 15px; margin-left: 15px" >\
                <table class="table table-striped table-bordered"\
                    id="example-2">\
                    <thead>\
                        <tr>\
                            <th>Full Name</th>\
                            <th>Email</th>\
                            <th>Phone Number</th>\
                            <th class="tabledit-toolbar-column"></th>\
                        </tr>\
                    </thead>\
                    <tbody id="surveyorData"></tbody>\
                </table>\
                                                    </div >'
            document.getElementById("listSurveyor").innerHTML = inListData;
            document.getElementById("surveyorData").innerHTML = data;
            document.getElementById("initSurveyorButton").style.display = "none";
        } else {
            document.getElementById("listSurveyor").innerHTML = "<h3 class=\"col-sm-4\">No one</h3>"
            document.getElementById("initSurveyorButton").style.display = "block";
        }
        document.getElementById("systemZonePreloader").style.display = "none";
    });
}
//Get all surveyor who are not assign yet for systemzone
initSurveyorButton.onclick = function () {
    let szId = document.getElementById("systemZoneId").value;
    $.ajax({
        url: "/AdminMap/GetAllSurveyorForSystemZone",
        method: 'POST',
        data: JSON.stringify({
            SystemZoneId: `${szId}`
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
            document.getElementById("surveyorPreloader").style.display = "flex";
        },
        async: true,
    }).done(function (response) {
        if (response.length > 0) {
            tempSurveyorData = response;
            let data;
            for (let index = 0; index < response.length; index++) {
                data =
                    data +
                    "<option value='" +
                    response[index].id +
                    "'>" +
                    response[index].fullname +
                    "</option>";
            }
            document.getElementById("surveyorId").value = tempSurveyorData[0].id;
            document.getElementById("surveyorPhone").value =
                tempSurveyorData[0].phoneNumber;
            document.getElementById("surveyorEmail").value =
                tempSurveyorData[0].email;
            document.getElementById("surveyorName").innerHTML = data;
            AssignNewSurveyor.disabled = false;
        } else {
            document.getElementById("surveyorId").value = null;
            document.getElementById("surveyorPhone").value = null;
            document.getElementById("surveyorEmail").value = null;
            document.getElementById("surveyorName").innerHTML =
                "<option value='-1'>No one</option>";
            AssignNewSurveyor.disabled = true;
        }
        document.getElementById("surveyorPreloader").style.display = "none";
    });
};
//Choose surveyor name and display all infomation
surveyorName.onchange = function () {
    let id = surveyorName.options[surveyorName.selectedIndex].value;
    for (let index = 0; index < tempSurveyorData.length; index++) {
        if (id == tempSurveyorData[index].id) {
            document.getElementById("surveyorId").value = tempSurveyorData[index].id;
            document.getElementById("surveyorPhone").value =
                tempSurveyorData[index].phoneNumber;
            document.getElementById("surveyorEmail").value =
                tempSurveyorData[index].email;
        }
    }
};
//Click assign function to assign surveyor
AssignNewSurveyor.onclick = function () {
    $.ajax({
        url: "/AdminMap/AssignSurveyorForSystemZone",
        method: 'POST',
        data: JSON.stringify({
            AccountId: document.getElementById("surveyorId").value,
            SystemZoneId: document.getElementById("systemZoneId").value,
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
            document.getElementById("surveyorPreloader").style.display = "flex";
        },
        async: true,
    })
        .done(function (response) {
            if (response.accountId != null) {
                Swal.fire({
                    showConfirmButton: true,
                    confirmButtonColor: "#1ABC9C",
                    icon: 'success',
                    title: 'Add success!'
                });

                document.getElementById("CloseAddSurveyor").click();
                document.getElementById("surveyorPreloader").style.display = "none";
                setTableSurveyor(document.getElementById("systemZoneId").value);
            } else {
                Swal.fire({
                    showConfirmButton: true,
                    confirmButtonColor: "#1ABC9C",
                    icon: 'error',
                    title: 'Add error!'
                });
            }
        })
        .fail(function () {
            Swal.fire({
                showConfirmButton: true,
                confirmButtonColor: "#1ABC9C",
                icon: 'error',
                title: 'Add error!'
            });
        });
};
//Init building information when click detail button on popup building
function initBuilding(id) {
    document.getElementById("color-nestable").innerHTML = "<h5>No information</h5>";
    $.ajax({
        url: "/AdminMap/InitBuildingDetail",
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
        };
        if (response.systemzoneId != null) {
            //set Status building
            switch (response.status) {
                case 1: //Surveyed
                    document.getElementById("buildingStatusMess").innerHTML = buildingStatusMess1;
                    break;
                case 2: //Need Survey
                    document.getElementById("buildingStatusMess").innerHTML = buildingStatusMess2;
                    break;
                case 3: //Need Approve
                    switch (response.history.action) {
                        case 1: //insert building
                            document.getElementById("buildingStatusMess").innerHTML =
                                "Surveyor <b>" +
                                response.history.accountName +
                                "</b> surveyed this building";
                            break;
                        case 2: //Edit building
                            document.getElementById("buildingStatusMess").innerHTML =
                                "Surveyor <b>" +
                                response.history.accountName +
                                "</b> surveyed this building again from <b>" +
                                response.history.referenceName + "</b>";
                            break;
                        case 3: //Delete Building
                            document.getElementById("buildingStatusMess").innerHTML =
                                "Surveyor <b>" +
                                response.history.accountName +
                                "</b> requested deleting this building";
                            break;
                    }
                    break;
            }
            if (response.status == 3) {
                document.getElementById("buildingAction").innerHTML =
                    '<div class="col-sm-6">\
                    <div class="row p-r-5">\
                        <button class="btn btn-success col-sm-12" onclick="ApproveBuilding(\'' + id + '\')">Approve</button>\
                    </div>\
                </div>\
                <div class="col-sm-6">\
                    <div class="row p-l-5">\
                        <button class="btn btn-danger col-sm-12" onclick="RejectBuilding(\'' + id + '\')">Reject</button>\
                    </div>\
                </div>';
            } else {
                document.getElementById("buildingAction").innerHTML =
                    '<label class="col-sm-8 p-r-0 p-l-0 col-form-label">Need more information</label>\
                <div class="col-sm-4 p-r-0">\
                    <input type="checkbox" id="buildingStatus" class="js-switch" checked />\
                </div>';
                //Init switchery
                var buildingStatus = document.getElementById("buildingStatus");
                let elem = document.querySelector(".js-switch");
                let init = new Switchery(elem);
                //Change status of building when click on switch 
                buildingStatus.onchange = function () {
                    if (!isSwitchBuilding) {
                        Swal.fire({
                            title: "Do you want to change?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#13866f",
                            cancelButtonColor: "#9ca5ab",
                            confirmButtonText: "Yes, do it!",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                //mark need survey for building
                                $.ajax({
                                    url: "/AdminMap/AssignSurveyForBuilding",
                                    method: 'POST',
                                    data: JSON.stringify({
                                        BuildingId: document.getElementById("buildingId").value,
                                    }),
                                    dataType: "json",
                                    contentType: "application/json;charset=utf-8",
                                    async: true
                                }).done(function () {
                                    if (buildingStatus.checked) {
                                        document.getElementById("buildingStatusMess").innerHTML = buildingStatusMess2;
                                        map
                                            .getMarkerById(document.getElementById("buildingId").value)
                                            .setIcon(building_need_survey_icon);
                                    } else {
                                        document.getElementById("buildingStatusMess").innerHTML = buildingStatusMess1;
                                        map
                                            .getMarkerById(document.getElementById("buildingId").value)
                                            .setIcon(building_surveyed_icon);
                                    }
                                });
                                Swal.fire({
                                    showConfirmButton: true,
                                    confirmButtonColor: "#1ABC9C",
                                    icon: 'success',
                                    title: 'Success!'
                                });
                            } else {
                                isSwitchBuilding = true;
                                document.getElementById("buildingStatus").click();
                                isSwitchBuilding = false;
                            }
                        });
                    }
                };
            }
        } else {
            document.getElementById("buildingStatusMess").innerHTML = "";
            document.getElementById("buildingAction").innerHTML = "";
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

        if (response.status == 1 && buildingStatus != null && buildingStatus.checked) {
            isSwitchBuilding = true;
            buildingStatus.click();
            isSwitchBuilding = false;
        }
        if (response.status == 2 && buildingStatus != null && !buildingStatus.checked) {
            isSwitchBuilding = true;
            buildingStatus.click();
            isSwitchBuilding = false;
        }
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

//function Close/Open child for list floor in building detail
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
//Approve building
function ApproveBuilding(id) {
    Swal.fire({
        title: "Approve request",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#13866f",
        cancelButtonColor: "#9ca5ab",
        confirmButtonText: "Do it!",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/AdminMap/ApproveRequestForBuilding",
                method: 'POST',
                data: JSON.stringify({
                    BuildingId: `${id}`
                }),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                async: true,
            }).done(function (response) {
                if (response) {
                    Swal.fire({
                        showConfirmButton: true,
                        confirmButtonColor: "#1ABC9C",
                        icon: 'success',
                        title: 'Success!'
                    });
                    if (response.action == 3) {
                        map.removeLayer(map.getMarkerById(document.getElementById("buildingId").value));
                        closeBuildingDetailButton.click();
                    } else {
                        map.getMarkerById(document.getElementById("buildingId").value).setIcon(building_surveyed_icon);
                        closeBuildingDetailButton.click();
                    }

                } else {
                    Swal.fire({
                        showConfirmButton: true,
                        confirmButtonColor: "#1ABC9C",
                        icon: 'error',
                        title: 'Add error!'
                    });
                }
            });

        }

    });
}
//Reject building
function RejectBuilding(id) {
    Swal.fire({
        title: "Reject request",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#13866f",
        cancelButtonColor: "#9ca5ab",
        confirmButtonText: "Do it!",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/AdminMap/RejectRequestForBuilding",
                method: 'POST',
                data: JSON.stringify({
                    BuildingId: `${id}`
                }),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                async: true,
            }).done(function (response) {
                if (response) {
                    Swal.fire({
                        showConfirmButton: true,
                        confirmButtonColor: "#1ABC9C",
                        icon: 'success',
                        title: 'Success!'
                    });
                    if (response.action == 1) {
                        map.removeLayer(map.getMarkerById(document.getElementById("buildingId").value));
                        closeBuildingDetailButton.click();
                    } else {
                        map.getMarkerById(document.getElementById("buildingId").value).setIcon(building_need_survey_icon);
                        closeBuildingDetailButton.click();
                    }
                } else {
                    Swal.fire({
                        showConfirmButton: true,
                        confirmButtonColor: "#1ABC9C",
                        icon: 'error',
                        title: 'Add error!'
                    });
                }
            });

        }

    });
}
//Init store detail
function initStore(id) {
    let data = '<div class="preloader3 loader-block pos-absolute"\
    style = "display: none;\
    z-index: 2;\
    margin: auto;\
    width: 100%;\
    height: 100%;\
    background-color: rgba(0, 0, 0, 0.5); "\
    id = "storePreloader">\
        <div class="circ1"></div>\
        <div class="circ2"></div>\
        <div class="circ3"></div>\
        <div class="circ4"></div>\
    </div>\
    <div class="modal-content" >\
        <div class="modal-header" style="display: block">\
            <img\
                src="http://maps.gstatic.com/tactile/pane/default_geocode-2x.png"\
                width="100%"\
                height="105px"\
                style="object-fit: cover"\
            />\
            <div class="row m-t-10">\
                <div class="col-sm-6">\
                    <h5 class="modal-title" id="storeName">Store Name</h5>\
                </div>\
            <div class="col-sm-6 text-right row p-r-0" id="storeAction">\
        </div>\
    </div>\
    <div class="row">\
      <h6 id="storeType" class="col-sm-6"></h6>\
      <p class="text-right col-sm-6"><i id="storeStatusMess"></i></p>\
    </div>\
  </div>\
  <div class="container"></div>\
  <div class="modal-body">\
    <div class="form-group row">\
      <label class="col-sm-4 col-form-label">Id</label>\
      <div class="col-sm-8">\
        <input\
          type="text"\
          class="form-control"\
          id="storeId"\
          readonly\
        />\
      </div>\
    </div>\
    <div class="form-group row">\
      <label class="col-sm-4 col-form-label">Address</label>\
      <div class="col-sm-8">\
        <input\
          type="text"\
          class="form-control"\
          id="storeAddress"\
          readonly\
        />\
      </div>\
    </div>\
    <div class="form-group row">\
      <label class="col-sm-4 col-form-label">Brand name</label>\
      <div class="col-sm-8">\
        <input\
          type="text"\
          class="form-control"\
          id="storeBrand"\
          readonly\
        />\
      </div>\
    </div>\
    <div class="form-group row">\
      <label class="col-sm-4 col-form-label">Create Date</label>\
      <div class="col-sm-8">\
        <input\
          type="text"\
          class="form-control"\
          id="storeCreateDay"\
          readonly\
        />\
      </div>\
    </div>\
    <div class="form-group row">\
        <label class="col-sm-4 col-form-label">Open time</label>\
        <div class="col-sm-4">\
          <input\
          type="text"\
          class="form-control"\
          id="storeOpenTime"\
          readonly\
        />\
        </div>\
        <div class="col-sm-4">\
          <input\
          type="text"\
          class="form-control"\
          id="storeCloseTime"\
          readonly\
        />\
        </div>\
    </div>\
  </div>\
  <div class="modal-footer">\
    <a\
      href="#"\
      class="btn"\
      onclick="CloseStoreDetail()"\
      >Close</a\
    >\
  </div>\
</div>'
    document.getElementById("color-nestable").innerHTML = data;
    //cal api
    $.ajax({
        url: "/AdminMap/InitStoreDetail",
        method: 'POST',
        data: JSON.stringify({
            StoreId: `${id}`
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
            document.getElementById("storePreloader").style.display = "flex";
        },
        async: true,
    }).done(function (response) {
        if (response.systemzoneId != null) {
            switch (response.status) {
                case 1: //surveyed
                    document.getElementById("storeStatusMess").innerHTML = storeStatusMess1;
                    break;
                case 2: //need survey
                    document.getElementById("storeStatusMess").innerHTML = storeStatusMess2;
                    break;
                case 3: //need approve
                    switch (response.history.action) {
                        case 4: //insert store
                            document.getElementById("storeStatusMess").innerHTML =
                                "Surveyor <b>" +
                                response.history.accountName +
                                "</b> surveyed this store";
                            break;
                        case 5: //Edit store
                            document.getElementById("storeStatusMess").innerHTML =
                                "Surveyor <b>" +
                                response.history.accountName +
                                "</b> surveyed this store again from <b>" +
                                response.history.referenceName + "</b>";
                            break;
                        case 6: //Delete store
                            document.getElementById("storeStatusMess").innerHTML =
                                "Surveyor <b>" +
                                response.history.accountName +
                                "</b> requested deleting this store";
                            break;
                    }
                    break;
            }
            if (response.status == 3) {
                document.getElementById("storeAction").innerHTML = '<div class="col-sm-6">\
                    <div class="row p-r-5">\
                        <button class="btn btn-mini btn-success col-sm-12" onclick="ApproveStore(\'' + id + '\', \'' + response.type + '\')">Approve</button>\
                    </div>\
                </div>\
                <div class="col-sm-6">\
                    <div class="row p-l-5">\
                        <button class="btn btn-mini btn-danger col-sm-12" onclick="RejectStore(\'' + id + '\', \'' + response.type + '\')">Reject</button>\
                    </div>\
                </div>';
            } else {
                document.getElementById("storeAction").innerHTML =
                    '<label class="col-sm-8 col-form-label p-r-0 p-l-0 p-t-5">Need information</label>\
                <div class="col-sm-4 p-t-5 p-r-0">\
                    <input type="checkbox" id="storeStatus" class="js-switch-store" checked/>\
                </div>';
                var storeStatus = document.getElementById("storeStatus");
                let elem = document.querySelector(".js-switch-store");
                let init = new Switchery(elem, { size: 'small' });
                //Change assign status for store
                storeStatus.onchange = function () {
                    if (!isSwitchStore) {
                        Swal.fire({
                            title: "Do you want to change?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#13866f",
                            cancelButtonColor: "#9ca5ab",
                            confirmButtonText: "Yes, do it!",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                //mark need survey for store
                                $.ajax({
                                    url: "/AdminMap/AssignSurveyForStore",
                                    method: 'POST',
                                    data: JSON.stringify({
                                        StoreId: `${id}`,
                                    }),
                                    dataType: "json",
                                    contentType: "application/json;charset=utf-8",
                                    async: true
                                }).done(function () {
                                    if (storeStatus.checked) {
                                        document.getElementById("storeStatusMess").innerHTML = storeStatusMess2;
                                        //map
                                        //    .getMarkerById(document.getElementById("buildingId").value)
                                        //    .setIcon(building_need_survey_icon);
                                    } else {
                                        document.getElementById("storeStatusMess").innerHTML = storeStatusMess1;
                                        //map
                                        //    .getMarkerById(document.getElementById("buildingId").value)
                                        //    .setIcon(building_surveyed_icon);
                                    }
                                });
                                Swal.fire({
                                    showConfirmButton: true,
                                    confirmButtonColor: "#1ABC9C",
                                    icon: 'success',
                                    title: 'Success!'
                                });
                            } else {
                                isSwitchStore = true;
                                document.getElementById("storeStatus").click();
                                isSwitchStore = false;
                            }
                        });
                    }
                };
            }
            if (response.status == 1 && storeStatus.checked) {
                isSwitchStore = true;
                storeStatus.click();
                isSwitchStore = false;
            }
            if (response.status == 2 && !storeStatus.checked) {
                isSwitchStore = true;
                storeStatus.click();
                isSwitchStore = false;
            }
        } else {
            document.getElementById("storeStatusMess").innerHTML = "";
            document.getElementById("storeAction").innerHTML = "";
        }

        document.getElementById("storeId").value = response.id;
        document.getElementById("storeName").innerHTML = response.name;
        document.getElementById("storeType").innerHTML = response.type;
        document.getElementById("storeAddress").value = response.address;
        document.getElementById("storeCreateDay").value = response.createDate;
        document.getElementById("storeOpenTime").value = response.openTime;
        document.getElementById("storeCloseTime").value = response.closeTime;
        document.getElementById("storeBrand").value = response.brandName;

        document.getElementById("storePreloader").style.display = "none";
    });
}
//Init store detail modal
function initStoreModal(id) {
    //cal api
    $.ajax({
        url: "/AdminMap/InitStoreDetail",
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
        switch (response.status) {
            case 1: //surveyed
                document.getElementById("modalStoreStatusMess").innerHTML = storeStatusMess1;
                break;
            case 2: //need survey
                document.getElementById("modalStoreStatusMess").innerHTML = storeStatusMess2;
                break;
            case 3: //need approve
                switch (response.history.action) {
                    case 4: //insert store
                        document.getElementById("modalStoreStatusMess").innerHTML =
                            "Surveyor <b>" +
                            response.history.accountName +
                            "</b> surveyed this store";
                        break;
                    case 5: //Edit store
                        document.getElementById("modalStoreStatusMess").innerHTML =
                            "Surveyor <b>" +
                            response.history.accountName +
                            "</b> surveyed this store again from <b>" +
                            response.history.referenceName + "</b>";
                        break;
                    case 6: //Delete store
                        document.getElementById("modalStoreStatusMess").innerHTML =
                            "Surveyor <b>" +
                            response.history.accountName +
                            "</b> requested deleting this store";
                        break;
                }
                break;
        }
        if (response.status == 3) {
            document.getElementById("modalStoreAction").innerHTML = '<div class="col-sm-6">\
                    <div class="row p-r-5">\
                        <button class="btn btn-success col-sm-12" onclick="ApproveStore(\'' + id + '\', \'' + response.type + '\')">Approve</button>\
                    </div>\
                </div>\
                <div class="col-sm-6">\
                    <div class="row p-l-5">\
                        <button class="btn btn-danger col-sm-12" onclick="RejectStore(\'' + id + '\', \'' + response.type + '\')">Reject</button>\
                    </div>\
                </div>';
        } else if (response.systemzoneId != null) {
            document.getElementById("modalStoreAction").innerHTML =
                '<label class="col-sm-8 col-form-label p-r-0 p-l-0 p-t-5" >Need more information</label>\
                <div class="col-sm-4 p-t-5 p-r-0">\
                    <input type="checkbox" id="modalStoreStatus" class="js-switch-modal-store" checked />\
                </div>';
            var modalStoreStatus = document.getElementById("modalStoreStatus");
            let elem = document.querySelector(".js-switch-modal-store");
            let init = new Switchery(elem, { size: 'small' });
            //Change assign status for store
            modalStoreStatus.onchange = function () {
                if (!isSwitchStore) {
                    Swal.fire({
                        title: "Do you want to change?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#13866f",
                        cancelButtonColor: "#9ca5ab",
                        confirmButtonText: "Yes, do it!",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            //mark need survey for store
                            $.ajax({
                                url: "/AdminMap/AssignSurveyForStore",
                                method: 'POST',
                                data: JSON.stringify({
                                    StoreId: `${id}`,
                                }),
                                dataType: "json",
                                contentType: "application/json;charset=utf-8",
                                async: true
                            }).done(function () {
                                if (modalStoreStatus.checked) {
                                    document.getElementById("modalStoreStatusMess").innerHTML = storeStatusMess2;
                                    SetIconForLocationStore(response.type, 2, map.getMarkerById(id));
                                } else {
                                    document.getElementById("modalStoreStatusMess").innerHTML = storeStatusMess1;
                                    SetIconForLocationStore(response.type, 1, map.getMarkerById(id));
                                    //map
                                    //    .getMarkerById(id)
                                    //    .setIcon(building_surveyed_icon);
                                }
                            });
                            Swal.fire({
                                showConfirmButton: true,
                                confirmButtonColor: "#1ABC9C",
                                icon: 'success',
                                title: 'Success!'
                            });
                        } else {
                            isSwitchStore = true;
                            document.getElementById("modalStoreStatus").click();
                            isSwitchStore = false;
                        }
                    });
                }
            };
        } else {
            document.getElementById("modalStoreStatusMess").innerHTML = "";
            document.getElementById("modalStoreAction").innerHTML = "";
        }
        if (response.status == 1 && modalStoreStatus != null && modalStoreStatus.checked) {
            isSwitchStore = true;
            modalStoreStatus.click();
            isSwitchStore = false;
        }
        if (response.status == 2 && modalStoreStatus != null && !modalStoreStatus.checked) {
            isSwitchStore = true;
            modalStoreStatus.click();
            isSwitchStore = false;
        }

        document.getElementById("modalStoreId").value = response.id;
        document.getElementById("modalStoreName").innerHTML = response.name;
        document.getElementById("modalStoreType").innerHTML = response.type;
        document.getElementById("modalStoreAddress").value = response.address;
        document.getElementById("modalStoreCreateDay").value = response.createDate;
        document.getElementById("modalStoreService").value = response.abilityToServe + ' persons/day';
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
//Function close store detail to set floor detail
function CloseStoreDetail() {
    document.getElementById("color-nestable").innerHTML = dataFloorOfBuiding;
}
//Approve Store
function ApproveStore(id, type) {
    Swal.fire({
        title: "Approve request",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#13866f",
        cancelButtonColor: "#9ca5ab",
        confirmButtonText: "Do it!",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/AdminMap/ApproveRequestForStore",
                method: 'POST',
                data: JSON.stringify({
                    StoreId: `${id}`
                }),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                async: true,
            }).done(function (response) {
                if (response) {
                    Swal.fire({
                        showConfirmButton: true,
                        confirmButtonColor: "#1ABC9C",
                        icon: 'success',
                        title: 'Success!'
                    });
                    if (response.action == 6) {
                        map.removeLayer(map.getMarkerById(id));
                        closeBuildingDetailButton.click();
                    } else {
                        SetIconForLocationStore(type, 1, map.getMarkerById(id));
                        closeBuildingDetailButton.click();
                    }
                    document.getElementById("closeStoreModal").click();
                } else {
                    Swal.fire({
                        showConfirmButton: true,
                        confirmButtonColor: "#1ABC9C",
                        icon: 'error',
                        title: 'Add error!'
                    });
                }
            });

        }

    });
}
//Reject Store
function RejectStore(id, type) {
    Swal.fire({
        title: "Reject request",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#13866f",
        cancelButtonColor: "#9ca5ab",
        confirmButtonText: "Do it!",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/AdminMap/RejectRequestForStore",
                method: 'POST',
                data: JSON.stringify({
                    StoreId: `${id}`
                }),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                async: true,
            }).done(function (response) {
                if (response) {
                    Swal.fire({
                        showConfirmButton: true,
                        confirmButtonColor: "#1ABC9C",
                        icon: 'success',
                        title: 'Success!'
                    });
                    if (response.action == 6) {
                        map.removeLayer(map.getMarkerById(id));
                        closeBuildingDetailButton.click();
                    } else {
                        SetIconForLocationStore(type, 2, map.getMarkerById(id));
                        closeBuildingDetailButton.click();
                    }
                } else {
                    Swal.fire({
                        showConfirmButton: true,
                        confirmButtonColor: "#1ABC9C",
                        icon: 'error',
                        title: 'Add error!'
                    });
                }
            });

        }

    });
}
//Set up for create new zone
document.getElementById("newZone").onclick = function () {
    document.getElementById("nameCreateNew-error").style.display = "none";
    nameCreateNew.style.background = "#fff";
    nameCreateNew.style.border = "1px solid rgba(0,0,0,.15)";
    nameCreateNew.style.color = "#464a4c";
}
//Edit name system
function EditSystemZone() {
    document.getElementById("editSystemZoneButton").style.display = "none";
    document.getElementById("systemZoneConfirmBox").style.display = "flex";
    document.getElementById("systemZoneName").readOnly = false;
    nameSystemZone = document.getElementById("systemZoneName").value;
}
//Cancel edit name of Systemzone
function CancelEditSystemZone() {
    document.getElementById("systemZoneName").value = nameSystemZone;
    document.getElementById("systemZoneName").readOnly = true;
    document.getElementById("editSystemZoneButton").style.display = "block";
    document.getElementById("systemZoneConfirmBox").style.display = "none";
}
//Edit name oninput 
document.getElementById("systemZoneName").oninput = function () {
    let systemzoneNameRegex = /^[a-zA-Z0-9\- ]+$/;
    let systemZoneName = document.getElementById("systemZoneName");
    let validsystemzoneName = systemZoneName.value.match(systemzoneNameRegex);
    if (validsystemzoneName == null) {
        document.getElementById("systemZoneName-error").style.display = "block";
        systemZoneName.style.background = "#fbe3e4";
        systemZoneName.style.border = "1px solid #fbc2c4";
        systemZoneName.style.color = "#8a1f11";
    } else {
        document.getElementById("systemZoneName-error").style.display = "none";
        systemZoneName.style.background = "#fff";
        systemZoneName.style.border = "1px solid rgba(0,0,0,.15)";
        systemZoneName.style.color = "#464a4c";
    }
}
//Confirm edit name of system
function ConfirmEditSystemZone() {
    let systemzoneNameRegex = /^[a-zA-Z0-9\- ]+$/;
    let systemZoneName = document.getElementById("systemZoneName");
    let validsystemzoneName = systemZoneName.value.match(systemzoneNameRegex);
    if (validsystemzoneName == null) {
        document.getElementById("systemZoneName-error").style.display = "block";
        systemZoneName.style.background = "#fbe3e4";
        systemZoneName.style.border = "1px solid #fbc2c4";
        systemZoneName.style.color = "#8a1f11";
        return false;
    } else {
        $.ajax({
            url: "/AdminMap/UpdateNameSystemZone",
            method: 'POST',
            data: JSON.stringify({
                Id: document.getElementById("systemZoneId").value,
                Name: document.getElementById("systemZoneName").value
            }),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            beforeSend: function () {
                document.getElementById("systemZonePreloader").style.display = "flex";
            },
            async: true,
        }).done(function (response) {
            if (response == true) {
                document.getElementById("systemZonePreloader").style.display = "none";
                document.getElementById("editSystemZoneButton").style.display = "block";
                document.getElementById("systemZoneConfirmBox").style.display = "none";
                document.getElementById("systemZoneName").readOnly = true;
                ReloadSystemZoneForMap();
                Swal.fire({
                    showConfirmButton: true,
                    confirmButtonColor: "#1ABC9C",
                    icon: 'success',
                    title: 'Update success!'
                });
            } else {
                Swal.fire({
                    showConfirmButton: true,
                    confirmButtonColor: "#1ABC9C",
                    icon: 'error',
                    title: 'Server error!'
                });
            }
        })
    }

}
//Delete system zone
function DeleteSystemZone(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#13866f",
        cancelButtonColor: "#9ca5ab",
        confirmButtonText: "Yes, remove!",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/AdminMap/DeleteSystemZone",
                method: 'POST',
                data: JSON.stringify({
                    Id: id,
                    Name: document.getElementById("systemZoneName").value
                }),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                beforeSend: function () {
                    document.getElementById("checkingSystemzonePreloader").style.display = "flex";
                },
                async: true,
            }).done(function (response) {
                document.getElementById("checkingSystemzonePreloader").style.display = "none";
                if (response == true) {
                    ReloadSystemZoneForMap()
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
            })
        }
    });
}
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
function resetHighlight(e) {
    layerSystemZonePostal.resetStyle(e.target);
}
//Load System Zone for Map
function LoadSystemZoneForMap() {
    $.ajax({
        url: "/AdminMap/LoadSystemZoneForAdminMap",
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
                    mouseout: resetHighlight
                });
            },
        });
        layerSystemZoneGroup.addLayer(layerSystemZonePostal);
    });
}
//Reload System Zone for Map
function ReloadSystemZoneForMap() {
    //Remove old layers of system zone
    layerSystemZoneGroup.eachLayer(function (layer) {
        layerSystemZoneGroup.removeLayer(layer);
    });
    //Get System Zone by getting api
    $.ajax({
        url: "/AdminMap/LoadSystemZoneForAdminMap",
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
                    "')\" >Detail</button>" +
                    '<button class="btn btn-mini btn-danger" onclick="DeleteSystemZone(\'' +
                    id +
                    '\')">Delete</button>' +
                    '</div>';
                layer.bindPopup(
                    feature.properties.f2 +
                    "<br>" +
                    "<br>" +
                    assign_button
                );
                layer.on({
                    mouseover: highlightFeatureOfSystemZone,
                    mouseout: resetHighlight
                });
            },
        });
        layerSystemZoneGroup.addLayer(layerSystemZonePostal);
    });
    layerSystemZoneGroup.addTo(map);
}
//Load Campus for map
function LoadCampusForMap() {
    $.ajax({
        url: "/AdminMap/LoadCampusForAdminMap",
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
                let name = feature.properties.f2;
                let id = feature.properties.f1;
                let group_button =
                    '<div class="text-right"><button class="btn btn-mini btn-info" data-toggle="modal" data-target="#seeCampusDetail" onclick="InitCampusDetail(\'' +
                    id +
                    '\')" >Detail</button>' +
                    '<button class="btn btn-mini btn-danger" onclick="DeleteCampus(\'' +
                    id +
                    '\')">Delete</button>' +
                    '</div>';
                layer.setStyle({
                    color: "green",
                }).bindPopup(
                    name +
                    "<br>" +
                    "<br>" +
                    group_button
                );
            },
        });
        layerCampusGroup.addLayer(layerCampusPostal);
    });
}
//Reload Campus for map
function ReloadCampusForMap() {
    //Remove old layers of campus
    layerCampusGroup.eachLayer(function (layer) {
        layerCampusGroup.removeLayer(layer);
    });
    //Get
    $.ajax({
        url: "/AdminMap/LoadCampusForAdminMap",
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
                let name = feature.properties.f2;
                let id = feature.properties.f1;
                let group_button =
                    '<div class="text-right"><button class="btn btn-mini btn-info" data-toggle="modal" data-target="#seeCampusDetail" onclick="InitCampusDetail(\'' +
                    id +
                    '\')" >Detail</button>' +
                    '<button class="btn btn-mini btn-danger" onclick="DeleteCampus(\'' +
                    id +
                    '\')">Delete</button>' +
                    '</div>';
                layer.setStyle({
                    color: "green",
                }).bindPopup(
                    name +
                    "<br>" +
                    "<br>" +
                    group_button
                );
            },
        });
        layerCampusGroup.addLayer(layerCampusPostal);
    });
}
//Delete Campus from map
function DeleteCampus(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#13866f",
        cancelButtonColor: "#9ca5ab",
        confirmButtonText: "Yes, remove!",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/AdminMap/DeleteCampus",
                method: 'POST',
                data: JSON.stringify({
                    Id: id
                }),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                beforeSend: function () {
                    document.getElementById("checkingSystemzonePreloader").style.display = "flex";
                },
                async: true,
            }).done(function (response) {
                document.getElementById("checkingSystemzonePreloader").style.display = "none";
                if (response == true) {
                    ReloadCampusForMap();
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
            })
        }
    });
}
//function choose street 
function ChooseStreetSegment(id) {
    document.getElementById(id).selected = true;
}
//Init Campus function
function InitCampusDetail(id) {
    $.ajax({
        url: "/AdminMap/GetCampusById",
        method: 'POST',
        data: JSON.stringify({
            Id: id
        }),
        dataType: "json",
        beforeSend: function () {
            document.getElementById("campusPreloader").style.display = "flex";
        },
        contentType: "application/json;charset=utf-8",
        async: true,
    }).done(function (response) {

        document.getElementById("campusPreloader").style.display = "none";
        if (response == false) {
            Swal.fire({
                showConfirmButton: true,
                confirmButtonColor: "#1ABC9C",
                icon: 'error',
                title: 'Server error!'
            });
        } else {
            let listCoor = response.geom.coordinates[0];
            let coor = "";
            for (let i = 0; i < listCoor.length; i++) {
                if (i == listCoor.length - 1) {
                    coor = coor + listCoor[i][0].toString() + " " + listCoor[i][1].toString()
                } else {
                    coor = coor + listCoor[i][0].toString() + " " + listCoor[i][1].toString() + ","
                }
            }
            document.getElementById("campusCoor").value = coor;
            document.getElementById("campusId").value = response.id;
            document.getElementById("campusName").value = response.name;
            let data = "";
            let listStreet = response.listStreetSegment;
            for (let i = 0; i < listStreet.length; i++) {
                data = data + "<tr>";
                data = data + "<td>" + (i + 1) + "</td>";
                data = data + "<td>" + listStreet[i].name + "</td>";
                data = data + "</tr>";
            }
            document.getElementById("streetSegmentData").innerHTML = data;
        }
    })
}
//Init campus update modal
function InitUpdateCampus() {
    document.getElementById("campusEditName").value = document.getElementById("campusName").value;
    let coor = document.getElementById("campusCoor").value;
    $.ajax({
        url: "/AdminMap/GetStreetSegmentInRadiusByCoordinate",
        method: 'POST',
        data: JSON.stringify({
            CoordinateString: coor
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        async: true,
    }).done(function (res) {
        let dataStreet = '<select class="form-control form-control-default" name="select" multiple id="streetOfEditCampus">';
        for (var i = 0; i < res.listStreetSegment.length; i++) {
            dataStreet = dataStreet
                + '<option value="'
                + res.listStreetSegment[i].id
                + '" onclick="ChooseStreetSegment(\''
                + res.listStreetSegment[i].id + '\')" id="'
                + res.listStreetSegment[i].id + '">'
                + res.listStreetSegment[i].name
                + '</option>';
        }
        dataStreet = dataStreet + '</select>';
        document.getElementById("listStreetEditCampus").innerHTML = dataStreet;
        $('#streetOfEditCampus').multiSelect();
    });
}
//Update campus function 
function UpdateCampus() {
    let selected = [];
    for (var option of document.getElementById('streetOfEditCampus').options) {
        if (option.selected) {
            selected.push(option.value);
        }
    }
    $.ajax({
        url: "/AdminMap/EditCampus",
        method: 'POST',
        data: JSON.stringify({
            Id: document.getElementById("campusId").value,
            Name: document.getElementById("campusEditName").value,
            StreetSegmentId: selected
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
            document.getElementById("editCampusPreloader").style.display = "flex";
        },
        async: true,
    }).done(function (res) {
        document.getElementById("editCampusPreloader").style.display = "none";
        if (res == true) {
            closeUpdateCampus.click();
            InitCampusDetail(document.getElementById("campusId").value);
            ReloadCampusForMap();
            Swal.fire({
                showConfirmButton: true,
                confirmButtonColor: "#1ABC9C",
                icon: 'success',
                title: 'Update success!'
            });
        } else {
            Swal.fire({
                showConfirmButton: true,
                confirmButtonColor: "#1ABC9C",
                icon: 'error',
                title: 'Server error!'
            });
        }
    })
}
function checkCloseWard(id) {
    $.ajax({
        url: "/AdminMap/CheckSystemZoneClose",
        method: 'POST',
        data: JSON.stringify({
            SystemZoneId: id
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
        },
        async: true,
    }).done(function (response) {
        if (layerCheckingWard != null) {
            map.removeLayer(layerCheckingWard)
        }
        document.getElementById("CheckFullSystemZoneButton").click();
        Swal.fire({
            showConfirmButton: true,
            confirmButtonColor: "#1ABC9C",
            icon: 'success',
            title: 'Check success'
        });
        layerCheckingWard = L.geoJson(response, {
            style: StyleWardPolygon,
            onEachFeature: function (feature, layer) {
                let remove_button = '<div class="text-right"><button class="btn btn-mini btn-danger" onclick="removeCheckingWard()">Remove</button></div>';
                layer.bindPopup(remove_button);
            }
        });
        layerCheckingWard.addTo(map);
    }).fail(function (res) {
        if (res.responseText == "No content") {
            Swal.fire({
                showConfirmButton: true,
                confirmButtonColor: "#1ABC9C",
                icon: 'error',
                title: 'Not found',
                text: 'This ward has no system zone'
            });
        }
    })
}
//Remove checking ward layer
function removeCheckingWard() {
    map.removeLayer(layerCheckingWard);
}

//Check full a system zone
function checkFullWard(id) {
    $.ajax({
        url: "/AdminMap/CheckSystemZoneFull",
        method: 'POST',
        data: JSON.stringify({
            SystemZoneId: id
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
        },
        async: true,
    }).done(function (response) {
        if (response == true) {
            Swal.fire({
                showConfirmButton: true,
                confirmButtonColor: "#1ABC9C",
                icon: 'success',
                title: 'Ward is full'
            });
        } else {
            Swal.fire({
                showConfirmButton: true,
                confirmButtonColor: "#1ABC9C",
                icon: 'error',
                title: 'Ward is not full'
            });
        }
    });
}
//Init building segment detail 
initBuildingSegment = (id) => {
    $.ajax({
        url: "/AdminMap/GetBuildingSegmentForBuilding",
        method: 'POST',
        data: JSON.stringify({
            BuildingId: id
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
            document.getElementById("buildingSegmentPreloader").style.display = "flex";
        },
        async: true,
    }).done(function (response) {
        document.getElementById("buildingSegmentPreloader").style.display = "none";
        if (response != null && response.length > 0) {
            let data = "";
            for (var i = 0; i < response.length; i++) {
                let segmentName = response[i].segmentName;
                let segmentId = response[i].segmentId;
                let segmentPotentialCustomers = response[i].potentialCustomers;
                let segmentPrimaryAge = response[i].primaryAge;
                let segmentTimeSlot = response[i].timeSlot;
                data = data + '<div class="btn btn-primary col-sm-12 text-left m-t-5 m-b-5" style="background-color: #0078ae !important"\
                onclick = "SeeDetailOfSegment(\''
                    + segmentId + "', '"
                    + segmentName + "', '"
                    + segmentPotentialCustomers + "', '"
                    + segmentPrimaryAge + "', '"
                    + segmentTimeSlot
                    + '\')">' + segmentName + '</div>'
            }
            document.getElementById("listSegmentOfBuilding").innerHTML = data;
            document.getElementById("segmentDetailsForm").style.display = "none";
        } else {
            document.getElementById("listSegmentOfBuilding").innerHTML = "<h3>Have no segment</h3>";
            document.getElementById("segmentDetailsForm").style.display = "none";
        }
    }).fail(function () {
        document.getElementById("buildingSegmentPreloader").style.display = "none";
    })
}

SeeDetailOfSegment = (id, name, potential, primaryAge, timeSlot) => {
    document.getElementById("segmentDetailsForm").style.display = "block";
    //Remove success
    if (document.getElementById("slot1DetailLabel").classList.contains("bg-success")) {
        document.getElementById("slot1DetailLabel").classList.remove("bg-success")
        document.getElementById("slot1DetailLabel").classList.add("bg-default");
    }
    if (document.getElementById("slot2DetailLabel").classList.contains("bg-success")) {
        document.getElementById("slot2DetailLabel").classList.remove("bg-success")
        document.getElementById("slot2DetailLabel").classList.add("bg-default");
    }
    if (document.getElementById("slot3DetailLabel").classList.contains("bg-success")) {
        document.getElementById("slot3DetailLabel").classList.remove("bg-success")
        document.getElementById("slot3DetailLabel").classList.add("bg-default");
    }
    if (document.getElementById("slot4DetailLabel").classList.contains("bg-success")) {
        document.getElementById("slot4DetailLabel").classList.remove("bg-success")
        document.getElementById("slot4DetailLabel").classList.add("bg-default");
    }
    //Set variable
    document.getElementById("segmentId").value = id;
    document.getElementById("segmentName").value = name;
    document.getElementById("segmentPotent").value = potential + " person";
    document.getElementById("segmentAge").value = primaryAge + " years old";
    //processing time slot
    if (timeSlot.charAt(0) == "1") {
        document.getElementById("slot1DetailLabel").classList.remove("bg-default");
        document.getElementById("slot1DetailLabel").classList.add("bg-success");
    } 
    if (timeSlot.charAt(1) == "1") {
        document.getElementById("slot2DetailLabel").classList.remove("bg-default");
        document.getElementById("slot2DetailLabel").classList.add("bg-success");
    } 
    if (timeSlot.charAt(2) == "1") {
        document.getElementById("slot3DetailLabel").classList.remove("bg-default");
        document.getElementById("slot3DetailLabel").classList.add("bg-success");
    } 
    if (timeSlot.charAt(3) == "1") {
        document.getElementById("slot4DetailLabel").classList.remove("bg-default");
        document.getElementById("slot4DetailLabel").classList.add("bg-success");
    } 
}