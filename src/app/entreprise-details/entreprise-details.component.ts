import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { EntrepriseService } from '../entreprise.service';
import { Entreprise } from '../entreprise';

@Component({
  selector: 'entreprise-details',
  templateUrl: './entreprise-details.component.html',
  styleUrls: ['./entreprise-details.component.css']
})
export class EntrepriseDetailsComponent implements OnInit {

	/*@Input() */
  entreprise: Observable<Entreprise>;

  
  constructor(
            private route: ActivatedRoute,
            private entrepriseService: EntrepriseService,
            private location: Location
            ) { }

  ngOnInit(): void {
    this.getEntreprise();
  }

  getEntreprise(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.entreprise = this.entrepriseService.getEntreprise(id).valueChanges();
  }

/*
  updateActive(isActive: boolean) {
    this.entrepriseService.updateEntreprise(this.entreprise.key, { active: isActive });
  }
 
  deleteCustomer() {
    this.entrepriseService.deleteEntreprise(this.entreprise.key);
  }
*/
  goBack(): void {
    this.location.back();
  }

}
