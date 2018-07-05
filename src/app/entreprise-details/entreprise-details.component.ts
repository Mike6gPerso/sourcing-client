import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { FormControl, FormBuilder } from '@angular/forms';

import { EntrepriseService } from '../entreprise.service';
import { Entreprise } from '../entreprise';

@Component({
  selector: 'entreprise-details',
  templateUrl: './entreprise-details.component.html',
  styleUrls: ['./entreprise-details.component.css']
})
export class EntrepriseDetailsComponent implements OnInit {

	entreprise: Observable<Entreprise>;

  
  constructor(
            private route: ActivatedRoute,
            private entrepriseService: EntrepriseService,
            private location: Location
            ) { }

  ngOnInit(): void {
    this.loadEntreprise();
  }

  private loadEntreprise(): void {
    let id = this.route.snapshot.paramMap.get('id');
    console.log("id: " + id);
    this.entreprise = this.entrepriseService.getEntreprise(id).valueChanges();
    //console.log("this.entreprise:" + JSON.stringify(this.entreprise));
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
