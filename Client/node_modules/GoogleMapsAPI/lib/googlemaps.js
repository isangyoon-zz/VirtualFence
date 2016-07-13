((root, factory) => {
  if (root === null) throw new Error('VirtualFence GoogleMapsLoader can be used only in broswer');

  if (typeof define === 'function' && define.amd) define(factory);
  else if (typeof exports === 'object') module.exports = factory();
  else root.VirtualFenceGoogleMaps = factory();
})(typeof window !== 'undefined' ? window : null, () => {
  'use strict';

  const LastReleasedVersion = '3.24'; // Latest Release Version 3.24 (Forzen Version 3.23)

  let google          = null,
      script          = null,
      isLoaded        = false;

  let callbacks = [],
      events    = [];

  let VirtualFenceGoogleMaps                  = {};
  VirtualFenceGoogleMaps.URL                  = 'https://maps.googleapis.com/maps/api/js';
  VirtualFenceGoogleMaps.KEY                  = null;
  VirtualFenceGoogleMaps.VERSION              = LastReleasedVersion;
  VirtualFenceGoogleMaps.LIBRARIES            = [];
  VirtualFenceGoogleMaps.LANGUAGE             = null;
  VirtualFenceGoogleMaps.REGION               = null;
  VirtualFenceGoogleMaps.CHANNEL              = null;
  VirtualFenceGoogleMaps.CLIENT               = null;
  VirtualFenceGoogleMaps.WINDOW_CALLBACK_NAME = '__google_maps_api_provider_initializator__';

  VirtualFenceGoogleMaps.load = (callback) => {
    if (google === null)
    {
      if (isLoaded === true)
      {
        if(callback) callbacks.push(callback);
      }
      else
      {
        isLoaded = true;

        window[VirtualFenceGoogleMaps.WINDOW_CALLBACK_NAME] = () => { ready(callback); };
        VirtualFenceGoogleMaps.create();
      }
    }
    else if (callback)
    {
      callback(google);
    }
  };

  VirtualFenceGoogleMaps.loaded = () => {
    return google !== null;
  };

  VirtualFenceGoogleMaps.onLoad = (callback) => { events.push(callback); };

  VirtualFenceGoogleMaps.create = () => {
    script      = document.createElement('script');
    script.type = 'text/javascript';
    script.src  = VirtualFenceGoogleMaps.scriptURL();

    document.body.appendChild(script);
  };

  VirtualFenceGoogleMaps.scriptURL = () => {
    let URL = VirtualFenceGoogleMaps.URL;

    URL += '?callback=' + VirtualFenceGoogleMaps.WINDOW_CALLBACK_NAME;
    if (VirtualFenceGoogleMaps.VERSION)               URL += '&v=' + VirtualFenceGoogleMaps.VERSION;
    if (VirtualFenceGoogleMaps.KEY)                   URL += '&key=' + VirtualFenceGoogleMaps.KEY;
    if (VirtualFenceGoogleMaps.LIBRARIES.length > 0)  URL += '&libraries=' + VirtualFenceGoogleMaps.LIBRARIES.join(',');
    if (VirtualFenceGoogleMaps.LANGUAGE)              URL += '&language=' + VirtualFenceGoogleMaps.LANGUAGE;
    if (VirtualFenceGoogleMaps.REGION)                URL += '&region=' + VirtualFenceGoogleMaps.REGION;
    if (VirtualFenceGoogleMaps.CHANNEL)               URL += '&channel=' + VirtualFenceGoogleMaps.CHANNEL;
    if (VirtualFenceGoogleMaps.CLIENT)                URL += '&client=' + VirtualFenceGoogleMaps.CLIENT;

    return URL;
  };

  VirtualFenceGoogleMaps.unload = (callback) => {
    let unload = () => {
      VirtualFenceGoogleMaps.KEY                  = null;
      VirtualFenceGoogleMaps.VERSION              = LastReleasedVersion;
      VirtualFenceGoogleMaps.LIBRARIES            = [];
      VirtualFenceGoogleMaps.LANGUAGE             = null;
      VirtualFenceGoogleMaps.REGION               = null;
      VirtualFenceGoogleMaps.CHANNEL              = null;
      VirtualFenceGoogleMaps.CLIENT               = null;

      google      = null;
      isLoaded    = null;
      callbacks   = [];
      events      = [];

      if (typeof window.google !== 'undefined') delete window.google;
      if (typeof window[VirtualFenceGoogleMaps.WINDOW_CALLBACK_NAME] !== 'undefined') delete window[VirtualFenceGoogleMaps.WINDOW_CALLBACK_NAME];
      if (script !== null)
      {
        script.parentElement.removeChild(script);
        script = null;
      }

      if (callback) callback();
    };

    if (isLoaded) VirtualFenceGoogleMaps.load(() => { unload(); });
    else unload();
  };

  let ready = (callback) => {
    isLoaded = false;

    if (google === null) google = window.google;

    for (let i = 0; i < events.length; ++i)
    {
      events[i](google);
    }

    if (callback) callback(google);

    for (let i = 0; i < callbacks.length; ++i)
    {
      callbacks[i](google);
    }

    callbacks = [];
  };

  return VirtualFenceGoogleMaps;
});
