(function(){
  'use strict';

  var map = new OpenLayers.Map("mapdiv")
  , markersLayer = new OpenLayers.Layer.Markers("Markers")
  , zoom = 14
  , fromProjection = new OpenLayers.Projection("EPSG:4326") // Transform from WGS 1984
  , toProjection = new OpenLayers.Projection("EPSG:900913") // to Spherical Mercator Projection
  , markerSize = new OpenLayers.Size(21,25)
  , markerOffset = new OpenLayers.Pixel(-(markerSize.w/2), -markerSize.h)
  , protoPizzaIcon = new OpenLayers.Icon('marker.png', markerSize, markerOffset)
  , pizzerias = window.pizzerias;

  for (var i = 0; i < pizzerias.length; i++) {
    (function(i) {
    var shop = pizzerias[i]
    , lonLat = new OpenLayers.LonLat(shop.lng, shop.lat).transform(fromProjection, toProjection)
    , pizzaIcon = protoPizzaIcon.clone()
    , marker = new OpenLayers.Marker(lonLat, pizzaIcon);

    marker.events.register('mouseover', marker, mouseOverMarker);
    marker.events.register('mouseout', marker, mouseOutMarker);
    marker.events.register('mousedown', marker, makePopupHandler(shop, lonLat, pizzaIcon));

    markersLayer.addMarker(marker);
    })(i);
  }

  map.addLayer(new OpenLayers.Layer.Google("GMaps", { type: google.maps.MapTypeId.ROADMAP, numZoomLevels: 20 }));
  map.addLayer(markersLayer);

  var timesSqLonLat = new OpenLayers.LonLat(-73.987386, 40.755166).transform(fromProjection, toProjection);
  map.setCenter(timesSqLonLat, zoom);

  return 'fuck yeah';

  function makePopupHandler(shop, lonLat, anchor) {
    return function() {
      for (var popupIndex in map.popups) { (function(popup){ popup.destroy() })(map.popups[popupIndex]); }

      var popup = new OpenLayers.Popup.FramedCloud(
        shop.name // id
        , lonLat
        , null // autocalculate size
        , getPopupContent(shop)
        , anchor
        , true // show X close button
      );
      popup.maxSize = new OpenLayers.Size(250,450);

      map.addPopup(popup);
    };
  }

  function mouseOverMarker(event) {
    event.target.setAttribute('src', 'marker-anim.gif');
    event.target.setAttribute('style', 'cursor:pointer;position:relative;width:' + markerSize.x + 'px;height:' + markerSize.y + 'px;');
  }

  function mouseOutMarker(event) {
    event.target.setAttribute('src', 'marker.png');
    event.target.setAttribute('style', 'cursor:default;position:relative;width:' + markerSize.x + 'px;height:' + markerSize.y + 'px;');
  }

  function getPopupContent(shop) {
    return '<b>' + shop.name + '</b><br />"' + shop.desc + '"' + '<br />'
      + '<span style="font-size: 11px;">' + shop.addr + '</span><br />'
      + '<a href="' + shop.link + '" target="_blank">Read review</a>';
  }
})();

