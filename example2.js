var map = L.map('map', {
    zoom: 12,
    zoomDelta: 0.5,
    zoomSnap: 0.5,    
    fullscreenControl: true,
    timeDimension: true,
    timeDimensionControl: true,
    center: [106.4336,10.1240],
});


// https://ogcie.iblsoft.com/metocean/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities
//http://girs.vn:8081/geoserver15/test/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities

var testWMS = "http://girs.vn:8081/geoserver15/test/wms";


var testLayer = L.tileLayer.wms(testWMS, {
    layers: 'test:geotiff',
    format: 'image/png',
    transparent: true,
    time: '2014-09-18T07:00:00'
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
    var src = testWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=test:geotiff&style=test:bentre_wmst&FORMAT=image/png";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};
testLegend.addTo(map);
