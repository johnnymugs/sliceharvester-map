(function(){
  'use strict';

  var map = new OpenLayers.Map("mapdiv")
  , markersLayer = new OpenLayers.Layer.Markers("Markers")
  , zoom = 14
  , fromProjection = new OpenLayers.Projection("EPSG:4326") // Transform from WGS 1984
  , toProjection = new OpenLayers.Projection("EPSG:900913") // to Spherical Mercator Projection
  , markerSize = new OpenLayers.Size(21,25)
  , markerOffset = new OpenLayers.Pixel(-(markerSize.w/2), -markerSize.h)
  , protoPizzaIcon = new OpenLayers.Icon('marker.png', markerSize, markerOffset);

  var i, pizzerias = window.pizzerias;
  for (i = 0; i < pizzerias.length; i++) {
    (function(i) {
    var shop = pizzerias[i]
    , lonLat = new OpenLayers.LonLat(shop.lng, shop.lat).transform(fromProjection, toProjection)
    , pizzaIcon = protoPizzaIcon.clone()
    , marker = new OpenLayers.Marker(lonLat, pizzaIcon)
    , stupidBaseStyle = 'position:relative;width:21px;height:25px;';

    marker.events.register('mouseover', marker, function(event) {
      event.target.setAttribute('src', 'marker-anim.gif');
      event.target.setAttribute('style', stupidBaseStyle + 'cursor:pointer');
    });
    marker.events.register('mouseout', marker, function() {
      event.target.setAttribute('src', 'marker.png');
      event.target.setAttribute('style', stupidBaseStyle + 'cursor:default');
    });

    marker.events.register('mousedown', marker, function() {
      for (var popupIndex in map.popups) { (function(popup){ popup.destroy() })(map.popups[popupIndex]); }

      var popupContent = shop.name + '<br />"' + shop.desc + '"'
      , popup = new OpenLayers.Popup.FramedCloud(
        shop.name // id
        , lonLat
        , null // autocalculate size
        , popupContent
        , pizzaIcon // anchor
        , true // show X close button
      );

      map.addPopup(popup);
    });

    markersLayer.addMarker(marker);
    })(i);
  }

  map.addLayer(new OpenLayers.Layer.Google("GMaps",
    {type: google.maps.MapTypeId.ROADMAP, numZoomLevels: 20}));
  map.addLayer(markersLayer);

  var stupidShop = pizzerias[0];
  var stupidLonLat = new OpenLayers.LonLat(stupidShop.lng, stupidShop.lat).transform(fromProjection, toProjection)
   map.setCenter(stupidLonLat, zoom);
})();

