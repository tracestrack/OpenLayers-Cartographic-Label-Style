function createLabelStyle(bold, italic, size, color, placement) {
  if (!color) color = "#000";

  return new ol.style.Style({
    text: new ol.style.Text({
      font: (bold ? "bold " : "") + (italic ? "italic " : "") + size + 'px Optima, Calibri,sans-serif',
      overflow: true,
      placement: placement? placement : "point",
      fill: new ol.style.Fill({
        color: color,
      }),
      stroke: new ol.style.Stroke({
        color: '#fff',
        width: 3,
      }),
    }),
  });
}

function renderText(feature) {
  let prop = feature.getProperties()
  var labelStyle;

  if (prop.layer == "admin-names") {
    if (prop.admin_level == 2) {
      // country
      labelStyle = createLabelStyle(true, false, 20, "#333");
    }
    else if (prop.admin_level == 4) {
      // state
      labelStyle = createLabelStyle(false, false, 18, "#9c7395");
    }
    else {
      labelStyle = createLabelStyle(false, false, 14, "#999");
    }
  }
  else if (prop.layer == "place-names") {

    if (prop.place == "city" && getZ() >= 9) {
      labelStyle = createLabelStyle(prop.capital, false, prop.capital? 16 : 14);
    }
    else if (prop.place == "town" && getZ() >= 11) {
      labelStyle = createLabelStyle(false, false, 13);
    }
    else if (prop.place == "village" && getZ() >= 14) {
      labelStyle = createLabelStyle(false, false, 12);
    }
    else {
      if (getZ() >= 14) {
        labelStyle = createLabelStyle(false, false, 12);
      }
    }
  }
  else if (prop.layer == "protected-area-names"){
    labelStyle = createLabelStyle(false, true, 12, "#107a43");
  }
  else if (prop.layer == "vegetation-names"){
    labelStyle = createLabelStyle(false, true, 12, "#107a43");
  }
  else if (prop.layer == "water-lines" || prop.layer == "water-names"){
    if (getZ() > 12) {
      labelStyle = createLabelStyle(false, true, 9, "#10587a");
    }
    else {
      return;
    }
  }
  else if (prop.layer == "transportation"){
    //console.log(prop)
    if ((prop.highway == "unclassified" || prop.highway == "residential") && getZ() >= 16) {
      labelStyle = createLabelStyle(false, false, 9, "#333", "line");
    }
    else if ((prop.highway == "trunk" || prop.highway == "motorway") && getZ() >= 11) {
      labelStyle = createLabelStyle(false, false, 9, "#ff0000", "line");
    }
    else if (prop.highway == "primary" && getZ() >= 13) {
      labelStyle = createLabelStyle(false, false, 9, "#cc6a00", "line");
    }
    else if (prop.highway == "secondary" && getZ() >= 14) {
      labelStyle = createLabelStyle(false, false, 9, "#635600", "line");
    }
    else if (prop.highway == "tertiary" && getZ() >= 15) {
      labelStyle = createLabelStyle(false, false, 9, "#333", "line");
    }
  }
  else {
    //console.log(prop)
  }

  if (labelStyle) {
    labelStyle.getText().setText(feature.get('name'));
  }

  return labelStyle;
}

function getZ() {
  return parseInt(map.getView().getZoom());
}

function renderArea(feature) {
  let prop = feature.getProperties()
  if (prop.layer == "protected-areas" && prop.landuse != "military") {
    if (getZ() > 13) {
      return new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#33b857',
          width: 3,
        }),
      });
    }
  }
  else if (prop.layer == "country"){
    if (prop.admin_level == 2) {
      return new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#888888',
          width: 2,
        }),
      });
    }
  }
}
