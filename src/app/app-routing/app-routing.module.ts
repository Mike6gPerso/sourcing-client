import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { CommonModule } from '@angular/common';

import { SearchComponent } from '../search/search.component';
import { DocumentComponent } from '../document/document.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { DataVizComponent } from '../data-viz/data-viz.component';
import { EntrepriseSearchComponent } from '../entreprise-search/entreprise-search.component';
import { EntrepriseDetailsComponent } from '../entreprise-details/entreprise-details.component';


const appRoutes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'dataviz', component: DataVizComponent },
  { path: 'documents', component: DocumentComponent },
  { path: 'entreprises', component: EntrepriseSearchComponent },
  { path: 'entreprises/:id', component: EntrepriseDetailsComponent },
  { path: '', redirectTo: '/entreprises', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
    exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
