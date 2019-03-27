var map = L.map('map', {
    zoom: 10,
    zoomDelta: 0.5,
    zoomSnap: 0.5,    
    fullscreenControl: true,
    timeDimension: true,
    timeDimensionControl: true,
    timeDimensionOptions: {
        // times: "2000-06-07T00:00:00.000Z,2001-05-09T00:00:00.000Z,2001-07-28T00:00:00.000Z,2003-11-23T00:00:00.000Z,2004-02-27T00:00:00.000Z,2004-09-06T00:00:00.000Z,2004-10-24T00:00:00.000Z,2005-02-13T00:00:00.000Z,2005-06-21T00:00:00.000Z,2005-08-24T00:00:00.000Z,2006-01-31T00:00:00.000Z,2006-03-04T00:00:00.000Z,2006-10-30T00:00:00.000Z,2006-12-17T00:00:00.000Z,2007-02-03T00:00:00.000Z,2008-03-09T00:00:00.000Z,2008-12-06T00:00:00.000Z,2009-02-08T00:00:00.000Z,2009-05-31T00:00:00.000Z,2009-12-09T00:00:00.000Z,2010-05-18T00:00:00.000Z,2014-09-18T00:00:00.000Z,2015-01-24T00:00:00.000Z,2015-02-09T00:00:00.000Z,2015-06-01T00:00:00.000Z,2015-12-26T00:00:00.000Z,2017-02-14T00:00:00.000Z"        
    },
    center: [10.1240,106.4336],
});


// https://ogcie.iblsoft.com/metocean/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities
var testWMS = "https://ogcie.iblsoft.com/metocean/wms"
var testWMST = "http://girs.vn:8081/geoserver15/test/wms"
L.tileLayer.wms(testWMS, {
    layers: 'foreground-lines',
    format: 'image/png',
    transparent: true,
    crs: L.CRS.EPSG4326
}).addTo(map);

var testLayer = L.tileLayer.wms(testWMST, {
    layers: 'geotiff', // isobaric levels, or -agl for above ground levels
    format: 'image/png',
    transparent: true,
    //opacity: 0.3,
    //crs: L.CRS.EPSG4326,
    attribution: 'OGC MetOcean DWG Best Practice Example, IBL Software Engineering'
});
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
    var src = testWMST + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=geotiff&style=test:bentre_wmst&FORMAT=image/png";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};
testLegend.addTo(map);
