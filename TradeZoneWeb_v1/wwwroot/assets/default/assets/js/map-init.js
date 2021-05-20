var sHeight = screen.height;
var topNavHeight = document.getElementById("topNav").offsetHeight;
var mapHeight = sHeight - topNavHeight * 3 - 10 * 2;

document.getElementById("map").style.height = mapHeight + "px";