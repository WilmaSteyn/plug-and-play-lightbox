import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LightboxComponent } from './components/lightbox/lightbox.component';
import {LightboxOverlayComponent} from './components/lightbox/lightbox-overlay.component';
import {FullscreenComponent} from './components/fullscreen/fullscreen.component';
import {Lightbox} from './components/lightbox/services/lightbox.service';
import {LightboxConfig} from './components/lightbox/services/lightbox-config.service';
import {LightboxEvent, LightboxWindowRef} from './components/lightbox/services/lightbox-event.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LightboxComponent,
    LightboxOverlayComponent,
    FullscreenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    Lightbox,
    LightboxConfig,
    LightboxEvent,
    LightboxWindowRef
  ],
  entryComponents: [ LightboxOverlayComponent, LightboxComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
