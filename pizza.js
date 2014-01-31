(function(){
  var map = new OpenLayers.Map("mapdiv")
  , markersLayer = new OpenLayers.Layer.Markers("Markers")
  , zoom = 14
  , fromProjection = new OpenLayers.Projection("EPSG:4326") // Transform from WGS 1984
  , toProjection = new OpenLayers.Projection("EPSG:900913") // to Spherical Mercator Projection
  , markerSize = new OpenLayers.Size(21,25)
  , markerOffset = new OpenLayers.Pixel(-(markerSize.w/2), -markerSize.h)
  , pizzaMarker = new OpenLayers.Icon('marker.png', markerSize, markerOffset);

  var lonLat = new OpenLayers.LonLat(-73.959618, 40.79016).transform(fromProjection, toProjection);
  markersLayer.addMarker(new OpenLayers.Marker(lonLat, pizzaMarker));

  map.addLayer(new OpenLayers.Layer.OSM());
  map.addLayer(markersLayer);

  map.setCenter(lonLat, zoom);
})();

