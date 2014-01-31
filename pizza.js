(function(){
  var map = new OpenLayers.Map("mapdiv")
  , markersLayer = new OpenLayers.Layer.Markers("Markers")
  , zoom = 14
  , fromProjection = new OpenLayers.Projection("EPSG:4326") // Transform from WGS 1984
  , toProjection = new OpenLayers.Projection("EPSG:900913") // to Spherical Mercator Projection
  , markerSize = new OpenLayers.Size(21,25)
  , markerOffset = new OpenLayers.Pixel(-(markerSize.w/2), -markerSize.h)
  , pizzaIcon = new OpenLayers.Icon('marker.png', markerSize, markerOffset);

  var i, pizzerias = window.pizzerias;
  for (i = 0; i < pizzerias.length; i++) {
    var shop = pizzerias[i]
    var lonLat = new OpenLayers.LonLat(shop.lng, shop.lat).transform(fromProjection, toProjection);
    markersLayer.addMarker(new OpenLayers.Marker(lonLat, pizzaIcon.clone()));
  }

  map.addLayer(new OpenLayers.Layer.OSM());
  map.addLayer(markersLayer);

  map.setCenter(lonLat, zoom);
})();

