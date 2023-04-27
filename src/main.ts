import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import mapboxgl  from 'mapbox-gl';

if(!navigator.geolocation){
  alert("navigation fail")
  throw new Error('navigation fail')
}


mapboxgl.accessToken = environment.map_box;

if (environment.production) {
  enableProdMode();
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    if ('serviceWorker' in navigator && environment.production) {
      navigator.serviceWorker.register('/ngsw-worker.js');
    }
  })
  .catch(err => console.error(err));

