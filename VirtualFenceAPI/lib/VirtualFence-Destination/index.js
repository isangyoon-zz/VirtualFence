const GetCoordinates   = require('../VirtualFence-Helper').GetCoordinates;

const DEGREESTORADIANS = Math.PI / 180;
const RADIANSTODEGREES = 180 / Math.PI;

function Destination(from, distance, bearing)
{
  let coord = GetCoordinates(from);

  let lng1 = DEGREESTORADIANS * coord[0],
      lat1 = DEGREESTORADIANS * coord[1];

  let bearingRadians = DEGREESTORADIANS * bearing;

  let radians = DistanceToRadians(distance);

  let lat2 = Math.asin(Math.sin(lat1) * Math.cos(radians) + Math.cos(lat1) * Math.sin(radians) * Math.cos(bearingRadians)),
      lng2 = lng1 + Math.atan2(Math.sin(bearingRadians) * Math.sin(radians) * Math.cos(lat1), Math.cos(radians) - Math.sin(lat1) * Math.sin(lat2));

  return {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [RADIANSTODEGREES * lng2, RADIANSTODEGREES * lat2]
    }
  };
}

module.exports =  Destination;
