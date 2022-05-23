function createLabelStyle(size) {
  return new ol.style.Style({
    text: new ol.style.Text({
      font: size + 'px Calibri,sans-serif',
      overflow: true,
      fill: new ol.style.Fill({
        color: '#000',
      }),
      stroke: new ol.style.Stroke({
        color: '#fff',
        width: 3,
      }),
    }),
  });
}

const areaStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(255, 255, 255, 0.6)',
  }),
  stroke: new ol.style.Stroke({
    color: '#319FD3',
    width: 1,
  }),
});
//const style = [labelStyle];
let layer= new ol.layer.VectorTile({
  declutter: true,
  source: new ol.source.VectorTile({
    format: new ol.format.MVT(),
    url: 'https://took.paulnorman.ca/tiles/dev/{z}/{x}/{y}.mvt'
  }),
  style: function (feature) {
    if (feature.get('name')) {
      let prop = feature.getProperties()
      //console.log(prop)

      var labelStyle;
      const label = feature.get('name').split(' ').join('\n');

      if (prop.layer == "admin-names") {
        if (prop.admin_level == 2) {
          // country
          labelStyle = createLabelStyle(18);
        }
        else if (prop.admin_level == 4) {
          // state
          labelStyle = createLabelStyle(16);
        }
        else {
          labelStyle = createLabelStyle(14);
        }

        labelStyle.getText().setText(label);
      }
      else if (prop.layer == "place-names") {
        if (prop.place == "city") {
          labelStyle = createLabelStyle(12);
        }
        else if (prop.place == "town") {
          labelStyle = createLabelStyle(11);
        }
        else if (prop.place == "village") {
          labelStyle = createLabelStyle(10);
        }
        else {
          labelStyle = createLabelStyle(9);
        }

        labelStyle.getText().setText(label);
      }
      return labelStyle;
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

var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: source
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([37.41, 8.82]),
    zoom: 4
  })
});


map.addLayer(layer);
