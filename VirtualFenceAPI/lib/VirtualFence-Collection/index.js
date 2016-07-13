function Feature(geometry, properties)
{
  return {
    "type"        : 'Feature',
    "geometry"    : geometry,
    "properties"  : properties || {}
  };
}

module.exports.Feature = Feature;

function FeatureCollection(features)
{
  return {
    "type"      : 'FeatureCollection',
    "features"  : features
  };
}

module.exports.FeatureCollection = FeatureCollection;

function Point(coordinates, properties)
{
  return Feature({
    "type"        : 'Point',
    "coordinate"  : coordinates.slice()
  }, properties);
}

module.exports.Point = Point;

function MultiPoint(coordinates, properties)
{
  return Feature({
    "type"        : 'MultiPoint',
    "coordinate"  : coordinates
  }, properties);
}

module.exports.MultiPoint = MultiPoint;

function LineString(coordinates, properties)
{
  return Feature({
    "type"        : 'LineString',
    "coordinate"  : coordinates
  }, properties);
}

module.exports.LineString = LineString;

function MultiLineString(coordinates, properties)
{
  return Feature({
    "type"        : 'MultiLineString',
    "coordinate"  : coordinates
  }, properties);
}

module.exports.MultiLineString = MultiLineString;

function Polygon(coordinates, properties)
{
  return Feature({
    "type"        : 'Polygon',
    "coordinate"  : coordinates
  }, properties);
}

module.exports.Polygon = Polygon;

function MultiPolygon(coordinates, properties)
{
  return Feature({
    "type"        : 'MultiPolygon',
    "coordinate"  : coordinates
  }, properties);
}

module.exports.MultiPolygon = MultiPolygon;

function GeometryCollection(geometries, properties)
{
  return Feature({
    "type"        : 'GeometryCollection',
    "coordinate"  : coordinates
  }, properties);
}

module.exports.GeometryCollection = GeometryCollection;
