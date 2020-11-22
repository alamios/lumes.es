var map = L.map('mapdiv');
var point;
var geojsons = {};

var baseLayers = {
    osm:  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18, 
        attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
}
var alertLayers = {
    firms_global: L.tileLayer.wms("https://firms.modaps.eosdis.nasa.gov/wms/key/2aa09e0d7d0e53ec8f9cc490b7c0e87c/?symbols=circle&size=5&colors=240+0+0", {
        format: 'image/png',
        transparent: true,
        layers: "fires_modis_24,fires_viirs_24",
        attribution: '<a href="https://firms.modaps.eosdis.nasa.gov/active_fire/#firms-shapefile">FIRMS (NASA)</a>'
    }),
    firms_europe: L.layerGroup(),
    user: L.layerGroup()
};
var extraLayers = {
    topography: L.tileLayer.wms("http://ows.mundialis.de/services/service?", {
        layers: "TOPO-WMS"
    }),
}

var alertSize = [parseInt(getStyleRuleValue("line-height", ".markerIcon", "index.css").split(".")[0]), 
                parseInt(getStyleRuleValue("font-size", ".markerIcon", "index.css").split(".")[0])];

var popupOpened = false;
var popup = L.popup();

var baseControl = L.control.layers(baseLayers, null, {collapsed:false});
var alertControl = L.control.layers(null, alertLayers, {collapsed:false});
var extraControl = L.control.layers(null, extraLayers, {collapsed:false});

baseControl.addTo(map);
alertControl.addTo(map);
extraControl.addTo(map);

map.setView(params.def_loc, params.def_zoom);

map.addLayer(baseLayers.osm);
map.addLayer(alertLayers.user);
map.addLayer(alertLayers.firms_europe);

setLayersNames();
setLocation();
loadGeoJSONData();

var dialogConfirm = someutils.loadURL(window.location.origin + "/fragments/dialogs/mark_confirm.php");
var dialogInfo = someutils.loadURL(window.location.origin + "/fragments/dialogs/mark_info.php");
var dialogError = someutils.loadURL(window.location.origin + "/fragments/dialogs/mark_error.php");

map.on('click', mapClicked);
map.on('contextmenu', mapClicked);

function mapClicked(e) {
    if (burgerCloseIcon.classList.contains("hidden")) {
        if (!popupOpened) { 
            point = e.latlng;
            if (insideCountry(point.lat, point.lng))
                openPopup(dialogConfirm);
            else {
                openPopup(dialogError);
                markCountry.textContent = Object.keys(geojsons).toString();
            }
        }
        else {
            closePopup();
        }
    }
}

function markClicked(e) {
    if (burgerCloseIcon.classList.contains("hidden")) {
        point = e.latlng;
        openPopup(dialogInfo);
        markUser.textContent = e.target.options.properties.name;
        markDate.textContent = dateutils.toShortReversedString(new Date(e.target.options.properties.date), "/", ":", " - ");
        L.DomEvent.stop(e);
    }
}

function openPopup(dialog) {
    popup
        .setLatLng(point)
        .setContent(dialog)
        .openOn(map);
    popupOpened = true;
}

function closePopup() {
    map.closePopup();
    popupOpened = false;
}

function addAlert() {
    closePopup();
    L.marker(point, {
        icon: L.divIcon({
            html: '<i class="fa fa-fire" style="color: '+ params.marker_color + '"></i>',
            iconSize: alertSize,
            className: 'markerIcon'
        }),
        properties: {
            name: someutils.generateName(3),
            date: new Date().getTime()
        }
    }).addTo(alertLayers.user)
    .on('click', markClicked);
}

function setLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(loc) {
            point = [loc.coords.latitude, loc.coords.longitude];
            map.setView(point, params.geoloc_zoom);
            L.marker(point).addTo(alertLayers.user);
        });
    }
}

// Adapted from https://fogos.pt
function insideCountry(lat, long) {
    var x = long;
    var y = lat;
    var inside = false;
    Object.entries(geojsons).forEach(([name, geojson]) => {
        for (var k=0; k<geojson.geometry.coordinates.length; k++) {
            var polygon = geojson.geometry.coordinates[k][0];
            for (var i=0, j=polygon.length-1; i<polygon.length; j=i++) {
                var xi = polygon[i][0], yi = polygon[i][1];
                var xj = polygon[j][0], yj = polygon[j][1];

                var intersect = ((yi > y) != (yj > y))
                    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect) inside = !inside;
            }
            if (inside)
                return name;
        }
    });
    return inside;
};

function loadFirmsData() {
    Object.entries(params.firms_europe).forEach(([name, value]) => {
        $(function() {
            $.ajax({
                type: "GET",
                url: window.location.origin + params.firms_url + value,
                dataType: "text",
                crossDomain: true,
                success: function(csv) {
                    var data = $.csv.toObjects(csv);
                    for (row of data) {
                        if (insideCountry(row.latitude, row.longitude)) {
                            L.circle([row.latitude, row.longitude], {
                                color: params.firms_color,
                                radius: params.firms_size,
                                properties: {
                                    name: name.replace("_", " "),
                                    date: dateutils.parseCommonDatetime(
                                        row.acq_date+" "+row.acq_time.insertAt("-", 2), "-", "-", " ").getTime()
                                }
                            }).addTo(alertLayers.firms_europe)
                            .on('click', markClicked);
                        }
                    }
                }
            });
        });
    })
}

function loadGeoJSONData() {
    Object.entries(params.geojson_countries).forEach(([name, value]) => {
        $(function() {
            $.ajax({
                type: "GET",
                url: window.location.origin + params.geojson_url + value,
                dataType: "json",
                crossDomain: true,
                success: function(json) {
                    geojsons[name] = json;
                    loadFirmsData();
            }});
        });
    })
}

function setLayersNames() {
    for (layer of $(".leaflet-control-layers-base span"))
        layer.textContent = lang.map["layer." + layer.textContent.trim()];
    for (layer of $(".leaflet-control-layers-overlays span"))
        layer.textContent = lang.map["layer." + layer.textContent.trim()];
}

// Author: rlemon - https://stackoverflow.com/users/829835/rlemon
// License: CC BY-SA 3.0 - https://creativecommons.org/licenses/by-sa/3.0/
// See: https://stackoverflow.com/a/16966533
// Modified to allow getting stylesheets by filename
function getStyleRuleValue(style, selector, sheet) {
    var sheets;
    if (typeof sheet == "object")
        sheets = [sheet];
    else if (typeof sheet == "string")
        sheets = [getStylesheetByName(sheet)];
    else
        sheets = document.styleSheets;
    for (var i=0; i<sheets.length; i++) {
        var sheet = sheets[i];
        if ( !sheet.cssRules ) { continue; }
        for (var j = 0, k = sheet.cssRules.length; j < k; j++) {
            var rule = sheet.cssRules[j];
            if (rule.selectorText && rule.selectorText.split(',').indexOf(selector) !== -1) {
                return rule.style[style];
            }
        }
    }
    return null;
}

function getStylesheetByName(name) {
    for (var i=0; i<document.styleSheets.length; i++)
        if (document.styleSheets[i].href.endsWith("/" + name))
            return document.styleSheets[i];
}