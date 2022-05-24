let layer= new ol.layer.VectorTile({
  declutter: true,
  source: new ol.source.VectorTile({
    attributions: [ol.source.OSM.ATTRIBUTION],
    format: new ol.format.MVT(),
    url: 'https://took.paulnorman.ca/tiles/dev/{z}/{x}/{y}.mvt',
    maxZoom: 12
  }),
  style: function (feature) {
    if (feature.get('name')) {
      return renderText(feature)
    }
    else {
      return renderArea(feature)
    }
  }
});

var source = new ol.source.XYZ({
  imageSmoothing: true,
  transition: 0,
  urls: ['https://tile.tracestrack.com/base/{z}/{x}/{y}.png?key=649412ac7aeca8a00a152a79c7e7af37'],
  crossOrigin: null,
  tilePixelRatio: 2
});


if (window.location.href.indexOf("#") > -1) {
  qstr = window.location.href.split("#")[1];
}
else {
  qstr = "6/48.7089/12.1093"
}

let urlQueryStringArray = qstr.split("/");

if (urlQueryStringArray.length >= 3) {
  lonlat = [urlQueryStringArray[2], urlQueryStringArray[1]];
  zoom = urlQueryStringArray[0]
}

var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: source
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat(lonlat),
    zoom: zoom,
  })
});

map.addLayer(layer);

function setURL(lonlat, zoom) {
  let qstr = zoom.toFixed(0) + "/" + lonlat[1].toFixed(4) + "/" + lonlat[0].toFixed(4);
  window.location.href = "#" + qstr
}

map.on('moveend', onMoveEnd);

function onMoveEnd(evt) {
  var map = evt.map;
  let z = map.getView().getZoom();
  let center = ol.proj.toLonLat(map.getView().getCenter());

  setURL(center, z);
}
