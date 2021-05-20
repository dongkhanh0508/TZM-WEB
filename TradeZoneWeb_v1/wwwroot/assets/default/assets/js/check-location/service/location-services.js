//Import
import { map, layerStoreGroup } from "../check-location-module.js";
//Variale 
//Create format icon for brand store location
var LeafIconBrandStore = L.Icon.extend({
    options: {
        iconSize: [42, 56],
        popupAnchor: [-3, -56],
        iconAnchor: [22, 56], // point of the icon which will correspond to marker's location
    },
});
////Create Store of trade zone icon
var store_of_trade_zone_icon = new LeafIconBrandStore({
    iconUrl: "/assets/default/assets/images/building-icon-md/brand_store_icon_red.svg"
})

export const checkLocation = (latlng, time, day) => {
    $.ajax({
        url: "/CheckLocation/GetStoreByOrder",
        dataType: "json",
        method: 'POST',
        data: JSON.stringify({
            CoordinateString: latlng,
            TimeOrder: "2021-05-03T" + time + ":47.926Z",
            DateOrder: day
        }),
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
            document.getElementById("loadingMainScreen").style.display = 'flex';
        },
        async: true,
    }).done(function (response) {
        //hide loading dot
        document.getElementById("loadingMainScreen").style.display = 'none';
        //Close modal form
        document.getElementById("closeCheckLocationModalButton").click();
        if (response != null & response == 204) {
            Swal.fire(
                {
                    title: 'No store',
                    text: 'This order cannot be taken',
                    icon: 'warning',
                    confirmButtonColor: '#1abc9c'
                }
            )
        } else if (response != null && response == false) {
            Swal.fire(
                {
                    title: 'Server error',
                    icon: 'error',
                    confirmButtonColor: '#1abc9c'
                }
            )
        } else {
            //set layer postal for store
            let layerPostal = L.geoJson(response.geom, {
                onEachFeature: function (feature, layer) {
                    layer.setIcon(store_of_trade_zone_icon).bindPopup(response.name);
                    map.setView(layer._latlng, 15);
                    layer.openPopup();
                }
            });
            //Remove all layer in layer Store group before add
            if (layerStoreGroup != null) {
                layerStoreGroup.eachLayer(function (layer) {
                    map.removeLayer(layer);
                    layerStoreGroup.removeLayer(layer);
                });
            }
            //Add layer to layer Store group
            layerStoreGroup.addLayer(layerPostal);
            //Add layer store group to map
            layerStoreGroup.addTo(map);
            Swal.fire(
                {
                    title: 'Success',
                    text: 'This order can be taken by ' + response.name,
                    icon: 'success',
                    confirmButtonColor: '#1abc9c'
                }
            )
        }
        
    }).fail(function () {
        //Close modal form
        document.getElementById("closeCheckLocationModalButton").click();
        //
        document.getElementById("loadingMainScreen").style.display = 'none';
        //
        Swal.fire(
            {
                title: 'Server error',
                icon: 'error',
                confirmButtonColor: '#1abc9c'
            }
        )
    })
}