var params = {
    def_loc: [39.9625017, -3.9233584],
    def_zoom: 6,
    geoloc_zoom: 13,
    data_url: "firms",
    data_files: {
        MODIS: "MODIS_C6_Europe_24h.csv",
        SUOMI_VIIRS: "SUOMI_VIIRS_C2_Europe_24h.csv",
        J1_VIIRS: "J1_VIIRS_C2_Europe_24h.csv"
    },
    marker_width: 30,
    marker_height: 40,
    marker_color: "rgb(250, 100, 5)",
    firms_size: 500,
    firms_color: "rgb(240, 0, 0)",
};

var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors';
var osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});
var map = L.map('mapdiv');
map.setView(params.def_loc, params.def_zoom);
map.addLayer(osm);
var point;

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(loc) {
        point = [loc.coords.latitude, loc.coords.longitude];
        map.setView(point, params.geoloc_zoom);
        L.marker(point).addTo(layers.user);
    });
}

var layers = {
    nasa: L.layerGroup(),
    user: L.layerGroup()
}

layers.nasa.addTo(map);
layers.user.addTo(map);
loadFirmsData();

var popup = L.popup({
    closeButton: false
});
var popupOpened = false;
map.on('click', mapClicked);
map.on('contextmenu', mapClicked);

var style = document.createElement('style');
style.innerHTML = ".markerIcon { "+
                        "text-align: center; "+
                        "line-height: " + params.marker_height + "px; "+
                        "font-size: " + params.marker_width + "px; "+
                    "}";
document.getElementsByTagName('head')[0].appendChild(style);

var dialogConfirm = someutils.loadURL(window.location.href + "/fragments/dialogs/mark_confirm.php");
var dialogInfo = someutils.loadURL(window.location.href + "/fragments/dialogs/mark_info.php");

function mapClicked(e) {
    if (burgerCloseIcon.classList.contains("hidden")) {
        if (!popupOpened) {
            point = e.latlng;
            openPopup(dialogConfirm);
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
        markDate.textContent = new Date(e.target.options.properties.date).toShortReversedString("/", ":", " - ");
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
            iconSize: [params.marker_width, params.marker_height],
            className: 'markerIcon'
        }),
        properties: {
            name: someutils.generateName(3),
            date: new Date().getTime()
        }
    }).addTo(layers.user)
    .on('click', markClicked);
}

function loadFirmsData() {
    Object.entries(params.data_files).forEach(([name, value]) => {
        $(function() {
            $.ajax({
                type: "GET",
                url: window.location.href + params.data_url + "/" + value,
                dataType: "text",
                crossDomain: true,
                success: function(csv) {
                    var data = $.csv.toObjects(csv);
                    for (row of data) {
                        L.circle([row.latitude, row.longitude], {
                            color: params.firms_color,
                            radius: params.firms_size,
                            properties: {
                                name: name.replace("_", " "),
                                date: someutils.parseCommonDate(row.acq_date, "-").getTime()
                            }
                        }).addTo(layers.nasa)
                        .on('click', markClicked);
                    }
                }
            });
        });
    })
}
