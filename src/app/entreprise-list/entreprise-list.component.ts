import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { MatSort, MatPaginator, MatTableDataSource, MatProgressSpinnerModule } from '@angular/material';

import { EntrepriseService } from '../entreprise.service';
import { Entreprise } from '../entreprise';

@Component({
	selector: 'app-entreprise-list',
	templateUrl: './entreprise-list.component.html',
	styleUrls: ['./entreprise-list.component.scss']
})
export class EntrepriseListComponent implements OnInit, AfterViewInit {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

	@Input('list') entreprises: BehaviorSubject<Entreprise[]>;
	entrepriseSubscription: Subscription;
  //@Input('column') column : string;
	displayedColumns: string[] = ['score', 'edit', 'entreprise', 'context', 'descriptif'];
	dataSource : MatTableDataSource<Entreprise>;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private entrepriseService: EntrepriseService) { }

	ngOnInit() {
    if(this.entreprises == null){
      //this.getEntreprisesList();
    }
    this.dataSource = new MatTableDataSource<Entreprise>();
	}

	ngAfterViewInit() {
    
		// If the user changes the sort order, reset back to the first page.
    	this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
      //
      this.entreprises.subscribe(entreprises => {
        //console.log('up');
         //this.entreprises = entreprises;
        this.dataSource = new MatTableDataSource<Entreprise>(entreprises);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loadingSubject.next(false);
     });
      
	}

	getEntreprisesList() {
     this.loadingSubject.next(true);
  	 // Use snapshotChanges().map() to store the key
  	 this.entrepriseSubscription = this.entrepriseService
  	 	//.getEntreprisesList()
  	 	.getPaginatedEntreprises(0,100)
  	 	.snapshotChanges().pipe(
  	 	map(changes => 
  	 		changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
  	 		)
  	 	).subscribe(entreprises => {
  	 		//this.entreprises = entreprises;
  	 		//console.log("entreprises: " + JSON.stringify(entreprises, null, 2));
  	 		this.dataSource = new MatTableDataSource<Entreprise>(entreprises);
  	 		this.dataSource.paginator = this.paginator;
  	 		this.dataSource.sort = this.sort;
        this.loadingSubject.next(false);
  	 	});
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
  	//Might not be necessary due to the pipe method
  	this.entrepriseSubscription.unsubscribe();
  }

  deleteEntreprises() {
    console.log('nope !');
  }

  onViewButtonClick(row: Entreprise){
    console.log(JSON.stringify(row));
  }


}
