module.exports = {
  "Area"        : require('../VirtualFence-Area'),
  "Bearing"     : require('../VirtualFence-Bearing'),
  "Centroid"    : require('../VirtualFence-Centroid'),
  "Destination" : require('../VirtualFence-Destination'),
  "Distance"    : require('../VirtualFence-Distance'),
  "Inside"      : require('../VirtualFence-Inside'),
  "Midpoint"    : require('../VirtualFence-Midpoint'),
  "Offset"      : require('../VirtualFence-Offset')
  // Intersect
  // Closest
};

var Collection = require('../VirtualFence-Collection');
module.exports.Feature            = Collection.Feature;
module.exports.FeatureCollection  = Collection.FeatureCollection;
module.exports.Point              = Collection.Point;
module.exports.MultiPoint         = Collection.MultiPoint;
module.exports.LineString         = Collection.LineString;
module.exports.MultiLineString    = Collection.MultiLineString;
module.exports.Polygon            = Collection.Polygon;
module.exports.MultiPolygon       = Collection.MultiPolygon;
module.exports.GeometryCollection = Collection.GeometryCollection;
