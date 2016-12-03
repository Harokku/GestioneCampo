import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DepotComponent } from './depot/depot.component';
import {MaterializeModule} from "angular2-materialize";
import { StampingsComponent } from './stampings/stampings.component';

@NgModule({
  declarations: [
    AppComponent,
    DepotComponent,
    StampingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
