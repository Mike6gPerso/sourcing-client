import { Component, OnInit } from '@angular/core';
import { EntrepriseService } from '../entreprise.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-entreprise-search',
  templateUrl: './entreprise-search.component.html',
  styleUrls: ['./entreprise-search.component.css']
})
export class EntrepriseSearchComponent implements OnInit {

	private term: string = '';

	//entreprises: any;

  constructor(private entrepriseService: EntrepriseService,
  	private route: ActivatedRoute,
  	private router: Router) {
  	this.route.params.subscribe(params => {
      //console.log(params);
      if (params['term']) {
        this.term = params['term'];
        this.onSearch(this.term)
      }
    });
   }

  ngOnInit() {
  }

  doSearch() {
  	this.router.navigate(['entreprise', {term: this.term}]);
  }

  onSearch(term: string){
  	//this.getEntreprisesList();;
  }
/*
  getEntreprisesList() {
  	 // Use snapshotChanges().map() to store the key
  	this.entrepriseService.getEntreprisesList().snapshotChanges().pipe(
  		map(changes => 
  			changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
  		)
  	).subscribe(entreprises => {
  		this.entreprises = entreprises;
  	});
  }*/

}
