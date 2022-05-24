function createLabelStyle(bold, italic, size, color) {
  if (!color) color = "#000";

  return new ol.style.Style({
    text: new ol.style.Text({
      font: (bold ? "bold " : "") + (italic ? "italic " : "") + size + 'px Optima, Calibri,sans-serif',
      overflow: true,
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

    if (prop.place == "city") {
      labelStyle = createLabelStyle(prop.capital, false, prop.capital? 16 : 14);
    }
    else if (prop.place == "town") {
      labelStyle = createLabelStyle(false, false, 13);
    }
    else if (prop.place == "village") {
      labelStyle = createLabelStyle(false, false, 12);
    }
    else {
      labelStyle = createLabelStyle(false, false, 12);
    }
  }
  else if (prop.layer == "protected-area-names"){
    labelStyle = createLabelStyle(false, true, 12, "#107a43");
  }
  else if (prop.layer == "vegetation-names"){
    labelStyle = createLabelStyle(false, true, 12, "#107a43");
  }
  else if (prop.layer == "water-lines"){
    if (getZ() > 12) {
      labelStyle = createLabelStyle(false, true, 9, "#10587a");
    }
    else {
      return;
    }
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
  if (prop.layer == "protected-areas") {
    if (getZ() > 13) {
      return new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#33b857',
          width: 3,
        }),
      });
    }
    return;
  }
}
