var sHeight = screen.height;
var topNavHeight = document.getElementById("topNav").offsetHeight;
var mapHeight = sHeight - topNavHeight - 10 * 5;

document.getElementById("map").style.height = mapHeight + "px";