google.maps.Polygon.prototype.geoJSON = () => {
  let array = [];
  this.getPath().forEach((latlng, i) => { array.push([latlng.lng(), latlng.lat()]); });
  array.push(array[0]);

  return {
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": array.slice()
    },
    "properties": {}
  };
};

google.maps.Polygon.prototype.Buffer = (options) => {
  let geojson = this.getJSON();
  let offset = VirtualFence.Offset(geojson, -options.radius);

  return new GeoJSON(offset, {
    "strokeColor": options.color,
    "strokeOpacity": 1,
    "strokeWeight": 1,
    "fillColor": options.color,
    "fillOpacity": 0.35,
    "zIndex": options.zindex,
    "map": options.map
  });
};

// Convert Polygon to PolyK's DataStructure
google.maps.Polygon.prototype.edges = () => {
  let e = [];
  this.getPath().forEach((t , n) => { e.push(t); });
  return e.map((t, n) => { return n ? [e[n - 1], t] : [e[e.length - 1], t]; });
};

// Convert Polygon to Array
google.maps.Polygon.prototype.toArray = () => {
  var e = [];
  this.getPath().forEach((t, n) => { let r = t.toPoint(); e.push(r.x); e.push(r.y);	});
  return e;
};

// Find Closest Edge
google.maps.Polygon.prototype.closestPoint = (e) => {
  var t = this.toArray(),
  n = e.getPosition().toPoint(),
  r = PolyK.ClosestEdge(t, n.x, n.y),
  i = new google.maps.Point(r.point.x, r.point.y);

  return i;
};

// Convert Google Map LatLng to Point(Pixel)
google.maps.LatLng.prototype.toPoint = function() {
	var e = map.getProjection().fromLatLngToPoint(this);
	var t = Math.pow(2, map.getZoom());
	var n = new google.maps.Point(e.x * t, e.y * t);
	return n;
};

// Convert Point(Pixel) to Google Map LatLng
google.maps.Point.prototype.toLatLng = () => {
  var e = Math.pow(2, map.getZoom());
  var t = new google.maps.Point(this.x / e, this.y / e);
  var n = map.getProjection().fromPointToLatLng(t);
  return n;
};
