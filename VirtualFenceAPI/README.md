# VirtualFence API
This is a JavaScript library for spatial data. It includes spatial operations, helper function, and collection for create GeoJSON data.

## Collection
* Feature
* FeatureCollection
* Point
* MultiPoint
* LineString
* MultiLineString
* Polygon
* MultiPolygon
* GeometryCollection

## Helper function
Some functions to help you manipulate and work with GeoJSON.
* Convert radians to distance
* Convert distance to radians
* Convert distance to degrees

### Usages
```javascript
VirtualFence.RadiansToDistance(radians, unit); // degrees, radians, meters(m), kilometers(km)
VirtualFence.DistanceToRadians(distance, unit); // degrees, radians, meters(m), kilometers(km)
VirtualFence.DistanceToDegrees(distance, unit); // degrees, radians, meters(m), kilometers(km)
```

## Area
Calculate the area of features. Takes a one or more features and returns their area.

### Usages
```javascript
let polygon = {
  "type"        : "Feature",
  "geometry"    : {
    "type"        : "Polygon",
    "coordinates" : [
      [
        [],
        [],
        [],
        [],
        []
      ]
    ]
  },
  "properties"  : {}
};
  
let area = VirtualFence.Area(polygon); // return area in square meters
```

## Changelog list
* 1.0.0
  + Initial version
