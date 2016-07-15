# Google Maps API for VirtualFence
Wrapper for asynchronously used Google Maps API for VirtualFence Client.
This can be used only for CommonJS environments.

## Usages
```javascript
const GoogleMaps = require('GoogleMapsAPI');

var map = null;
GoogleMaps.load((google) => {
  let map_element = document.getElementById('map');
  let map_options = {
    "center"  : { "lat" : LATITUDE, "lng" : LONGITUDE },
    "zoom"    : ZOOM_LEVEL
  };
  
  map = new google.maps.Map(map_element, map_options);
});
```

**If your environment not support CommonJS, you can use `VirtualFenceGoogleMaps` variable.
It is already in `window` object.**

## Options
```javascript
VirtualFenceGoogleMaps.VERSION    = '3.exp';                  // Version
VirtualFenceGoogleMaps.KEY        = 'yourapikey';             // API Key
VirtualFenceGoogleMaps.LIBRARIES  = ['drawing', 'geometry'];  // Libraries
VirtualFenceGoogleMaps.LANGUAGE   = 'ko';                     // Localization
VirtualFenceGoogleMaps.REGION     = 'KR';                     // Region Code
VirtualFenceGoogleMaps.CHANNEL    = 'yourchannel';            // Channel
VirtualFenceGoogleMaps.CLIENT     = 'yourclientkey';          // Business Client key
```

## Load and Unload API
```javascript
GoogleMaps.load((arg1, arg2, ...) => {
  /* callback function */
});
  
GoogleMaps.unload((arg1, arg2, ...) => {
  /* callback function */
});
```

## Changelog list
* 1.0.0
  + Initial version
  + Support CommonJS, AMD, Node.js
