import { Component, OnInit, Input } from '@angular/core';

import { EntrepriseService } from '../entreprise.service';
import { Entreprise } from '../entreprise';

@Component({
  selector: 'entreprise-details',
  templateUrl: './entreprise-details.component.html',
  styleUrls: ['./entreprise-details.component.css']
})
export class EntrepriseDetailsComponent implements OnInit {

	@Input() entreprise: Entreprise;

  constructor(private entrepriseService: EntrepriseService) { }

  ngOnInit() {
  }

  updateActive(isActive: boolean) {
    this.entrepriseService.updateEntreprise(this.entreprise.key, { active: isActive });
  }
 
  deleteCustomer() {
    this.entrepriseService.deleteEntreprise(this.entreprise.key);
  }

}
