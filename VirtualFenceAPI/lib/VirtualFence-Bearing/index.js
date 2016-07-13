const GetCoordinates   = require('../VirtualFence-Helper').GetCoordinates;

const DEGREESTORADIANS = Math.PI / 180;
const RADIANSTODEGREES = 180 / Math.PI;

function Bearing(from, to)
{
  let coord1 = GetCoordinates(from),
      coord2 = GetCoordinates(to);

  let lng1 = DEGREESTORADIANS * coord1[0],
      lng2 = DEGREESTORADIANS * coord2[0],
      lat1 = DEGREESTORADIANS * coord1[1],
      lat2 = DEGREESTORADIANS * coord2[1];

  let a = Math.sin(lng2 - lng1) * Math.cos(lng2),
      b = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1);

  return RADIANSTODEGREES * Math.atan2(a, b);
}

module.exports = Bearing;
