const GeometryArea = require('geojson-area').geometry;

function Area(geojson)
{
  switch(geojson.type)
  {
    case 'FeatureCollection':
      let sum = 0;
      for(let i = 0; i < geojson.features.length; ++i)
      {
        if(geojson.features[i].geometry)
        {
          sum += GeometryArea(geojson.features[i].geometry);
        }
      }

      return sum;

    case 'Feature':
      return GeometryArea(geojson.geometry);

    default:
      return GeometryArea(geojson);
  }
}

module.exports = Area;
