const Area = require('../VirtualFence-Area');

function Centroid(geojson)
{
  let x = 0,
      y = 0;

  let points = geojson.coordinates[0];
  let j = points.length - 1;
  for(let i = 0; i < points.length; j = i++)
  {
    let pt1 = {
          "x" : points[i][1],
          "y" : points[i][0]
        },
        pt2 = {
          "x" : points[j][1],
          "y" : points[j][0]
        };

    let mult = pt1.x * pt2.y - pt2.x * pt1.y;

    x += (pt1.x + pt2.x) * mult;
    y += (pt1.y + pt2.y) * mult;
  }

  let div = Area(geojson) * 6;
  x /= div; y /= div;

  return {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [y, x]
    }
  };
}

module.exports = Centroid;
