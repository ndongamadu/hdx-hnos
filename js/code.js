// update the key figures

function updateKeyFigures (country){
  var kf1 = country.IDP;
  var kf2 = country.refugees;
  var kf3 = "500000";
  document.getElementById("kf1").innerHTML= "<p>Number of People in need<br />" +kf1+"</p>";
  document.getElementById("kf2").innerHTML = "<p>Number of IDP<br />" +kf2+"</p>";
  document.getElementById("kf3").innerHTML = "<p>Number of XXX<br />" +kf3+"</p>";

}

var map = L.map('map').setView([9.58, 10.37], 3);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


var geojson ;

var kf1 = L.control();

kf1.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'kf1');
    this.update();
    return this._div;
};

kf1.update = function (props) {
    this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.name + ' people / mi<sup>2</sup>'
        : 'Hover over a state');
};

kf1.addTo(map);

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
    kf1.update(layer.feature.properties);
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
        click: zoomToFeature
    });
}


function style(feature) {
    return {
        fillColor: '#800026',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

geojson = L.geoJson(hnos, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);
