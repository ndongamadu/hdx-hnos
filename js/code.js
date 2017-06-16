var map = L.map('map').setView([9.58, 10.37], 3);
L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
}).addTo(map);

//grayish map
//var map = L.map('map').setView([9.58, 10.37], 3);
//L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
//    maxZoom: 18,
//    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//}).addTo(map);

var geojson;

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {

    this._div.innerHTML = '<h4>HNO</h4>' + (props ?
        '<h5>Availability: ' + (props.hno).toUpperCase() + '</h5><a target="_blank" href="' + props.hdx + '">' + props.name + ' dataset</a><br />' :
        'Hover over a state');
};

info.addTo(map);

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        // color: '#ff4000', //'#3182bd', //'#666',
        //dashArray: '',
        //fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
    //updateKeyFigures(layer.feature.properties);
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
//    layer.bindPopup("alors : " + feature.properties.name);
}


function style(feature) {
    if (feature.properties.hno == 'yes') {
        return {
            fillColor: '#FF493D',
            weight: 2,
            opacity: 0.6,
            color: 'red',
            fillOpacity: 0.5
        };
    } else if (feature.properties.hno == 'no') {
        return {
            fillColor: '#BBBBBB',
            weight: 2,
            opacity: 0.6,
            color: 'red',
            //dashArray: '3',
            fillOpacity: 0.5
        };
    }

}


geojson = L.geoJson(hnos, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);
