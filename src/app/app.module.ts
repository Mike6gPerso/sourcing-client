import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { LayoutModule } from '@angular/cdk/layout';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { NavComponent } from './nav/nav.component';
import { SearchComponent } from './search/search.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DataVizComponent } from './data-viz/data-viz.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SearchComponent,
    PageNotFoundComponent,
    DataVizComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CustomMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
