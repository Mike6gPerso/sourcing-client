import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { EntrepriseService } from '../entreprise.service';
import { Entreprise } from '../entreprise';

@Component({
	selector: 'app-entreprise-list',
	templateUrl: './entreprise-list.component.html',
	styleUrls: ['./entreprise-list.component.css']
})
export class EntrepriseListComponent implements OnInit {

	entreprises: any;
	entrepriseSubscription: Subscription;
	columnsToDisplay: string[] = ['entreprise', 'context'];
	dataSource : MatTableDataSource<Entreprise>; //= new MatTableDataSource<>();

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private entrepriseService: EntrepriseService) { }

	ngOnInit() {
		this.getEntreprisesList();
		this.dataSource.paginator = this.paginator;
	}

	getEntreprisesList() {
  	 // Use snapshotChanges().map() to store the key
  	 this.entrepriseSubscription = this.entrepriseService.getPaginatedEntreprises(0,10).snapshotChanges().pipe(
  	 	map(changes => 
  	 		changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
  	 		)
  	 	).subscribe(entreprises => {
  	 		this.entreprises = entreprises;
  	 		this.dataSource = new MatTableDataSource<Entreprise>(entreprises);
  	 	});
  	//subscription.unsubscribe();
  }

  ngOnDestroy() {
  	//Might not be necessary due to the pipe method
  	this.entrepriseSubscription.unsubscribe();
  }



}
