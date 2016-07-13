const GetCoordinates    = require('../VirtualFence-Helper').GetCoordinates;
const RadiansToDistance = require('../VirtualFence-Helper').RadiansToDistance;

function Distance(from, to)
{
  let degreeToRadians = Math.PI / 180;

  let coord1 = GetCoordinates(from),
      coord2 = GetCoordinates(to);

  let dLat = degreeToRadians * (coord2[1] - coord1[1]),
      dLng = degreeToRadians * (coord2[0] - coord1[0]);

  let lat1 = degreeToRadians * coord1[1],
      lat2 = degreeToRadians * coord2[1];

  let a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLng / 2), 2) * Math.cos(lat1) * Math.cos(lat2);

  return RadiansToDistance(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1- a)));
}

module.exports = Distance;
