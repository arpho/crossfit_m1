import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as firebase from 'firebase/app';
import { ProfileService } from './services/user/profile.service';
import { AuthGuard } from '../app/services/user/authguard';
import { AuthService } from './services/user/auth.service';
import { ItemModule } from '../app/modules/item-module/item-module';
import { JustTestComponent } from './just-test/just-test.component';

@NgModule({
  declarations: [
    AppComponent,
    JustTestComponent,
  ],
  exports: [],
  entryComponents: [],
  imports: [
    BrowserModule,
    CommonModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ItemModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    AuthGuard,
    ProfileService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

