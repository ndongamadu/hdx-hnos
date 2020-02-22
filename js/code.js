$(document).ready(function(){
    let hnosLink = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSMmlKxX6PV391tanxo6aKltrtYcF4VTbXtsRtn66Fr4CY_VEjbEpJ9AlZzyIVapdKaOKZwTjyUL8IZ/pub?gid=0&single=true&output=csv';
    let world = 'data/coordinates.csv';
    let hnoData, hnoCountries, worldC = '';

    function getLatLon(d){
        return [d.latitude, d.longitude]

    }

    function createMap (hno) {

        var map = L.map('map',
        {
            maxZoom: 5,
            minZoom: 2
        });

        map.setView([9.58, 10.37], 3); 

        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/traffic-day-v2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1hZG91MTciLCJhIjoib3NhRnROQSJ9.lW0PVXVIS-j8dGaULTyupg', {
            attribution: '<a href="http://mapbox.com">Mapbox</a>'
        }).addTo(map); 

        for (var i = 0; i < hno.length; i++) {
            L.circleMarker(getLatLon(hno[i])).addTo(map)
                .bindPopup('<h4>'+hno[i].name+'</h4>');
        }



    } // createMap()

    function getData () {
        Promise.all([
            d3.csv(hnosLink),
            d3.csv(world)
        ]).then(function(data){
            hnoData = [];
            data[0].forEach(function(d, i){
                var lat, lon;
                for (k in data[1]){
                    if(data[1][k]['ISO3']==d['Country ISO3']){
                        lat = data[1][k]['Latitude'];
                        lon = data[1][k]['Longitude'];
                    }

                }
                var obj = {
                    year: d['Year'],
                    country_code: d['Country ISO3'],
                    name: d['Country'],
                    pin: d['PiN'],
                    dataset: d['HNO dataset'],
                    latitude: lat,
                    longitude: lon
                }
                hnoData.push(obj);
            });

            createMap(hnoData);
            

        });
    }

    getData();

});

