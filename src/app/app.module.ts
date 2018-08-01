import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
//import { AngularFirestoreModule } from 'angularfire2/firestore';

import { LayoutModule } from '@angular/cdk/layout';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { NavComponent } from './nav/nav.component';
import { SearchComponent } from './search/search.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DataVizComponent } from './data-viz/data-viz.component';
import { DocumentComponent } from './document/document.component';

import { environment } from '../environments/environment';
import { EntrepriseDetailsComponent } from './entreprise-details/entreprise-details.component';
import { EntrepriseListComponent } from './entreprise-list/entreprise-list.component';
import { EntrepriseSearchComponent } from './entreprise-search/entreprise-search.component';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SearchComponent,
    PageNotFoundComponent,
    DataVizComponent,
    DocumentComponent,
    EntrepriseDetailsComponent,
    EntrepriseListComponent,
    EntrepriseSearchComponent
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase, 'sourcing-stratups'),
    AngularFireDatabaseModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
