const Distance          = require('../VirtualFence-Distance');
const Bearing           = require('../VirtualFence-Bearing');
const Destination       = require('../VirtualFence-Destination');
const DistanceToRadians = require('../VirtualFence-Helper').DistanceToRadians;

function Midpoint(from, to)
{
  let distance = Distance(from, to),
      heading = Bearing(from, to);

  return Destination(from, distance / 2, heading);
}

module.exports = Midpoint;
