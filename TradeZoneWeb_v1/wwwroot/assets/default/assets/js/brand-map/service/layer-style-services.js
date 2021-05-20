//Set StyleTradeZone
export const styleTradeZone = () => {
    return {
        fillColor: dominos_blue_icon_color,
        weight: 3,
        opacity: 1,
        color: dominos_blue_icon_color,
        dashArray: '3',
        fillOpacity: 0.3
    }
}
//Highlight feature of trade zone
export const highlightFeatureOfTradeZone = (e) => {
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