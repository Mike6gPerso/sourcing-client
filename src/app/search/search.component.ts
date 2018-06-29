import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import {MatSnackBar} from '@angular/material';

import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	searchCtrl: FormControl;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, public snackBar: MatSnackBar) {
  	this.searchCtrl = new FormControl();
  }

  ngOnInit() {
  }

  doSearch() {
    this.snackBar.open('Clicked',  'ok', {
      duration: 800,
    });
  }

}
