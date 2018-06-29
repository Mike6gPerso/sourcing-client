import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { CommonModule } from '@angular/common';

import { SearchComponent } from '../search/search.component';
import { DocumentComponent } from '../document/document.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { DataVizComponent } from '../data-viz/data-viz.component';


const appRoutes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'dataviz', component: DataVizComponent },
  { path: 'document', component: DocumentComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
    exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
