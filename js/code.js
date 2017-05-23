// update the key figures

function updateKeyFigures (country){
  var kf1 = "----";
  var kf2 = "----";
  var kf3 = "----";
  kf1 = country.IDP;
  kf2 = country.refugees;
  kf3 = "500000";

  document.getElementById("kf1").innerHTML= "<p>#Number of People in need : " +kf1+"&nbsp;&nbsp;&nbsp;|</p>";
  document.getElementById("kf2").innerHTML = "<p>#Number of IDP : " +kf2+"&nbsp;&nbsp;&nbsp;|</p>";
  document.getElementById("kf3").innerHTML = "<p>#Number of XXX : " +kf3+"</p>";

}

var map = L.map('map').setView([9.58, 10.37], 3);
L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



var geojson ;

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>Humanitarian Needs Overview </h4>' +  (props ?
        '<b>' + props.name + '</b><br />'
        : 'Hover over a state');
};

info.addTo(map);

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

   if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
    updateKeyFigures(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        // click: zoomToFeature
    });
}


function style(feature) {
    return {
        fillColor: '#3182bd',
        weight: 2,
        opacity: 1,
        color: 'red',
        // dashArray: '3',
        fillOpacity: 0.5
    };
}

geojson = L.geoJson(hnos, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);
