const JSTS              = require('jsts');
const Normalize         = require('geojson-normalize');
const DistanceToDegrees = require('../VirtualFence-Helper').DistanceToDegrees;
const FeatureCollection = require('../VirtualFence-Collection').FeatureCollection;

function Offset(feature, radius)
{
  let degrees           =  DistanceToDegrees(radius);
  let featureCollection =  Normalize(feature);
  let offset = Normalize(FeatureCollection(featureCollection.features.map((f) => {
    return Process(f, degrees);
  })));

  if (offset.features.length > 1)
  {
    return offset;
  }
  else if (offset.features.length === 1)
  {
    return offset.features[0];
  }
}

module.exports = Offset;

function Process(feature, radius)
{
  let reader    = new JSTS.io.GeoJSONReader(),
      writer    = new JSTS.io.GeoJSONWriter();

  let geometry  = reader.read(feature.geometry),
      buffer    = geometry.buffer(radius);

  buffer = writer.write(buffer);

  return {
    "type"        : 'Feature',
    "geometry"    : buffer,
    "properties"  : {}
  };
}
