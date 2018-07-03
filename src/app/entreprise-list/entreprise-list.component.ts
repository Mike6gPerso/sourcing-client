import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { EntrepriseService } from '../entreprise.service';
import { Entreprise } from '../entreprise';

@Component({
  selector: 'app-entreprise-list',
  templateUrl: './entreprise-list.component.html',
  styleUrls: ['./entreprise-list.component.css']
})
export class EntrepriseListComponent implements OnInit {

	entreprises: any;

  constructor(private entrepriseService: EntrepriseService) { }

  ngOnInit() {
  	this.getEntreprisesList();
  }

  getEntreprisesList() {
  	 // Use snapshotChanges().map() to store the key
  	this.entrepriseService.getEntreprisesList().snapshotChanges().pipe(
  		map(changes => 
  			changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
  		)
  	).subscribe(entreprises => {
  		this.entreprises = entreprises;
  	});
  }



}
