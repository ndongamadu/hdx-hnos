var map = L.map('map',

    {
        maxZoom: 5,
        minZoom: 2
    });

map.setView([9.58, 10.37], 3);

//westlimit=-170.8; southlimit=-84.9; eastlimit=-167.3; northlimit=84.3
//map.fitBounds([[9.58, 10.37], [0, 0]], 3);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/traffic-day-v2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1hZG91MTciLCJhIjoib3NhRnROQSJ9.lW0PVXVIS-j8dGaULTyupg', {
    attribution: '<a href="http://mapbox.com">Mapbox</a>'
}).addTo(map);




var geojson;

//var info = L.control();
//
//info.onAdd = function (map) {
//    this._div = L.DomUtil.create('div', 'info');
//    this.update();
//    return this._div;
//};

//info.update = function (props) {
//
//    this._div.innerHTML = '<h4>HNO</h4>' + (props ?
//        '<h5>Availability: ' + (props.hno).toUpperCase() + '</h5><a target="_blank" href="' + props.hdx + '">' + props.name + ' dataset</a><br />' :
//        'Hover over a state');
//};

//info.addTo(map);

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

    //    info.update(layer.feature.properties);
    //    //updateKeyFigures(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}
//
//function zoomToFeature(e) {
//    // map.fitBounds(e.target.getBounds());
//}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        //click: zoomToFeature
    });

    if (feature.properties.hdx != '') {
        layer.bindPopup('<h4>' + feature.properties.name + '</h4><h5><a target="_blank" href="' + feature.properties.hdx + '"> View dataset on HDX </a></h5>');
    } else {
        layer.bindPopup('<h4>' + feature.properties.name + '</h4><h5>Dataset not available</h5>');
    }
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
