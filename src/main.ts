import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { initialize } from '@ionic/core/components';
import { defineCustomElements as defineIonicElements } from '@ionic/core/loader';
import { defineCustomElements as defineIonIcons } from 'ionicons/loader';

initialize();
defineIonicElements(window);
defineIonIcons(window);

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient()
  ],
}).catch(err => console.error(err));