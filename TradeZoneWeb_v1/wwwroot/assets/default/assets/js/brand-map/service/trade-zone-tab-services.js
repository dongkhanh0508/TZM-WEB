//Import
import { dayDetailList, timeSlotDetailList } from "../brand-map-module.js";

export const viewTradeZoneVersionDetail = (id) => {
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
        setDayLabelColor();
        setTimeSlotLabelColor();
        //Set trade zone
        let tableOfTradeDetail = document.getElementById("bodyTradeZoneOfStoreTable");
        let center = processingReponseForDetailTradeZone(layerDetailTradeZone, tableOfTradeDetail, response);
        //map.setView(center, 13);
    });
}

const setDayLabelColor = () => {
    let listLabel = ['monDetailLabel', 'tueDetailLabel', 'wedDetailLabel',
        'thuDetailLabel', 'friDetailLabel', 'satDetailLabel', 'sunDetailLabel'];
    for (var i = 0; i < dayDetailList.length; i++) {
        if (dayDetailList[i] == 1) {
            document.getElementById(listLabel[i]).classList.add("bg-primary");
        } else {
            document.getElementById(listLabel[i]).classList.add("bg-default");
        }
    }
}
const setTimeSlotLabelColor = () => {
    let listLabel = ['slot1DetailLabel', 'slot2DetailLabel', 'slot3DetailLabel', 'slot4DetailLabel'];
    for (var i = 0; i < timeSlotDetailList.length; i++) {
        if (timeSlotDetailList[i] == 1) {
            document.getElementById(listLabel[i]).classList.add("bg-primary");
        } else {
            document.getElementById(listLabel[i]).classList.add("bg-default");
        }
    }
}
const processingReponseForDetailTradeZone = (layerDetailTradeZone, table, res) => {
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