import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { EntrepriseService } from '../entreprise.service';
import { Entreprise } from '../entreprise';
import {MatSnackBar} from '@angular/material';

import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	searchCtrl: FormControl;
  entreprises: Entreprise[] = [];
  entreprisesObs: Subject<Entreprise[]> = new BehaviorSubject<Entreprise[]>([]);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, 
     private entrepriseService: EntrepriseService, public snackBar: MatSnackBar) {
  	this.searchCtrl = new FormControl();
  }

  ngOnInit() {
  }

  doSearch() {
    console.log(this.searchCtrl.value);
    this.snackBar.open('Clicked',  'ok', {
      duration: 800,
    });
    
    this.entrepriseService.searchKeyword(this.searchCtrl.value).subscribe(r => this.entreprisesObs.next(r));
     /* .subscribe(entreprises => {
         //console.log("entreprises: " + JSON.stringify(entreprises, null, 2));
         this.entreprises = entreprises;
     });
     */
    
  }

}
