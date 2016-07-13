const GetCoordinates = require('../VirtualFence-Helper').GetCoordinates;

function Inside(point, polygon)
{
  let points    = GetCoordinates(point),
      polygons  = polygon.geometry.coordinates;

  if (polygon.geometry.type === 'Polygon')
  {
    polygons = [polygons];
  }

  let isInside  = false,
      i         = 0;
  while (i < polygons.length && !isInside)
  {
    if (inCircuit(points, coordinates[i][0]))
    {
      let isInHole = false;
      let j = 1;

      while (j < coordinates[i].length && !isInHole)
      {
        if (inCircuit(point, coordinates[i][j]))
        {
          isInHole = true;
        }

        ++j;
      }

      if (!isInHole)
      {
        isInside = true;
      }
    }

    ++i;
  }

  return isInside;
}

module.exports.Inside = Inside;

function inCircuit(point, circuit)
{
  var isInside = false;

  for (let i = 0, j = circuit.length - 1; i < circuit.length ;  j = i++)
  {
    let x1 = circuit[i][0],
        y1 = circuit[i][1];

    let x2 = circuit[j][0],
        y2 = circuit[j][1];

    let isIntersect = ((y1 > point[1]) !== (y2 > point[1])) && (point[0] < (x2 - x1) * (point[1] - y1) / (y2 -  y1) + x1);

    isInside = (isIntersect) ? !isInside : isInside;
  }

  return isInside;
}
