var map = L.map('map', {
    zoom: 5,
    zoomDelta: 0.5,
    zoomSnap: 0.5,    
    fullscreenControl: true,
    timeDimension: true,
    timeDimensionControl: true,
    center: [29.96, -90.05],
});


// https://ogcie.iblsoft.com/metocean/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities
//http://girs.vn:8081/geoserver15/test/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities

var testWMS = "http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi";


var testLayer = L.tileLayer.wms(testWMS, {
    layers: 'nexrad-n0r-wmst',
    format: 'image/png',
    transparent: true,
    time: '2009-12-01T00:00:00.000Z'
    //opacity: 0.3,
    //attribution: 'hahahaha'
}).addTo(map);
var proxy = 'proxy.php';
var testTimeLayer = L.timeDimension.layer.wms(testLayer, {
    proxy: proxy,
    updateTimeDimension: true,
});
testTimeLayer.addTo(map);

var testLegend = L.control({
    position: 'topright'
});
testLegend.onAdd = function(map) {
    var src = testWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=nexrad-n0r-wmst&style=test:snow_style&FORMAT=image/png";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};
testLegend.addTo(map);
