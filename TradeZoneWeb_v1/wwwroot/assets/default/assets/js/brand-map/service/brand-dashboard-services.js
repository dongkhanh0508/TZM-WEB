//Show stores list
export const ShowStores = () => {
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
