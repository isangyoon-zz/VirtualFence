((root, factory) => {
  if (root === null) throw new Error('VirtualFence GoogleMapsLoader can be used only in broswer');

  if (typeof define === 'function' && define.amd) define(factory);
  else if (typeof exports === 'object') module.exports = factory();
  else root.VirtualFenceGoogleMapsLoader = factory();
})(typeof window !== 'undefined' ? window : null, () => {
  'use strict';

  const LastReleasedVersion = '3.24'; // Latest Release Version 3.24 (Forzen Version 3.23)

  let googlemaps      = null,
      script          = null,
      isLoaded        = false,
      loaderFunction  = null;

  let callbacks = [],
      events    = [];

  let VirtualFenceGoogleMapsLoader                  = {};
  VirtualFenceGoogleMapsLoader.URL                  = 'https://maps.googleapis.com/maps/api/js';
  VirtualFenceGoogleMapsLoader.KEY                  = null;
  VirtualFenceGoogleMapsLoader.VERSION              = LastReleasedVersion;
  VirtualFenceGoogleMapsLoader.LIBRARIES            = [];
  VirtualFenceGoogleMapsLoader.LANGUAGE             = null;
  VirtualFenceGoogleMapsLoader.REGION               = null;
  VirtualFenceGoogleMapsLoader.CHANNEL              = null;
  VirtualFenceGoogleMapsLoader.CLIENT               = null;
  VirtualFenceGoogleMapsLoader.WINDOW_CALLBACK_NAME = '__google_maps_api_provider_initializator__';
  VirtualFenceGoogleMapsLoader._googleMockApiObject = {};

  VirtualFenceGoogleMapsLoader.load = (callback) => {
    if (googlemaps === null)
    {
      if (isLoaded === true)
      {
        if(callback) callbacks.push(callback);
      }
      else
      {
        isLoaded = true;

        window[VirtualFenceGoogleMapsLoader.WINDOW_CALLBACK_NAME] = () => { ready(callback); };
      }
    }
    else if (callback)
    {
      callback(googlemaps);
    }
  };

  VirtualFenceGoogleMapsLoader.loaded = () => {
    return googlemaps !== null;
  };

  VirtualFenceGoogleMapsLoader.onLoad = (callback) => { events.push(callback); };

  VirtualFenceGoogleMapsLoader.create = () => {
    script      = document.createElement('script');
    script.type = 'text/javascript';
    script.src  = VirtualFenceGoogleMapsLoader.scriptURL();

    document.body.appendChild(script);
  };

  VirtualFenceGoogleMapsLoader.scriptURL = () => {
    let URL = VirtualFenceGoogleMapsLoader.URL;

    URL += '?callback=' + VirtualFenceGoogleMapsLoader.WINDOW_CALLBACK_NAME;
    if (VirtualFenceGoogleMapsLoader.VERSION)               URL += '&v=' + VirtualFenceGoogleMapsLoader.VERSION;
    if (VirtualFenceGoogleMapsLoader.KEY)                   URL += '&key=' + VirtualFenceGoogleMapsLoader.KEY;
    if (VirtualFenceGoogleMapsLoader.LIBRARIES.length > 0)  URL += '&libraries=' + VirtualFenceGoogleMapsLoader.LIBRARIES.join(',');
    if (VirtualFenceGoogleMapsLoader.LANGUAGE)              URL += '&language=' + VirtualFenceGoogleMapsLoader.LANGUAGE;
    if (VirtualFenceGoogleMapsLoader.REGION)                URL += '&region=' + VirtualFenceGoogleMapsLoader.REGION;
    if (VirtualFenceGoogleMapsLoader.CHANNEL)               URL += '&channel=' + VirtualFenceGoogleMapsLoader.CHANNEL;
    if (VirtualFenceGoogleMapsLoader.CLIENT)                URL += '&client=' + VirtualFenceGoogleMapsLoader.CLIENT;

    return URL;
  };

  VirtualFenceGoogleMapsLoader.purge = (callback) => {
    let purge = () => {
      VirtualFenceGoogleMapsLoader.KEY                  = null;
      VirtualFenceGoogleMapsLoader.VERSION              = LastReleasedVersion;
      VirtualFenceGoogleMapsLoader.LIBRARIES            = [];
      VirtualFenceGoogleMapsLoader.LANGUAGE             = null;
      VirtualFenceGoogleMapsLoader.REGION               = null;
      VirtualFenceGoogleMapsLoader.CHANNEL              = null;
      VirtualFenceGoogleMapsLoader.CLIENT               = null;

      googlemaps  = null;
      isLoaded    = null;
      callbacks   = [];
      events      = [];

      if (typeof window.googlemaps !== 'undefined') delete window.googlemaps;
      if (typeof window[VirtualFenceGoogleMapsLoader.WINDOW_CALLBACK_NAME] !== 'undefined') delete window[VirtualFenceGoogleMapsLoader.WINDOW_CALLBACK_NAME];
      if (script !== null)
      {
        script.parentElement.removeChild(script);
        script = null;
      }

      if (loaderFunction !== null)
      {
        VirtualFenceGoogleMapsLoader.create = loaderFunction;
        loaderFunction = null;
      }

      if (callback) callback();
    };

    if (isLoaded) VirtualFenceGoogleMapsLoader.load(() => { release(); });
    else release();
  };

  VirtualFenceGoogleMapsLoader.mock = () => {
    loaderFunction = VirtualFenceGoogleMapsLoader.create;

    VirtualFenceGoogleMapsLoader.create = () => {
      window.googlemaps = VirtualFenceGoogleMapsLoader._googleMockApiObject;
      window[VirtualFenceGoogleMapsLoader.WINDOW_CALLBACK_NAME]();
    };
  };

  let ready = (callback) => {
    isLoaded = false;

    if (googlemaps === null) googlemaps = window.googlemaps;

    for (let i = 0; i < events.length; ++i)
    {
      events[i](googlemaps);
    }

    if (callback) callback(googlemaps);

    for (let i = 0; i < callbacks.length; ++i)
    {
      callbacks[i](googlemaps);
    }

    callbacks = [];
  };

  return VirtualFenceGoogleMapsLoader;
});
