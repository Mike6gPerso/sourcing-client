import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

import { EntrepriseService } from '../entreprise.service';
import { Entreprise } from '../entreprise';

@Component({
  selector: 'entreprise-details',
  templateUrl: './entreprise-details.component.html',
  styleUrls: ['./entreprise-details.component.css']
})
export class EntrepriseDetailsComponent implements OnInit {

  entrepriseId: string;
  entreprise: Observable<Entreprise>;
  edit: Object = {'entreprise': false, 'context': false};
  entrepriseForm : FormGroup;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private entrepriseService: EntrepriseService,
    private location: Location,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.loadEntreprise();

    this.entrepriseForm = this.formBuilder.group({
      'entreprise': [{ value: '', disabled: true}],
      'context': [{ value: '', disabled: true}], 
      'descriptif': ['']
    });

/*
    this.entrepriseForm = new FormGroup({
       entreprise: new FormControl(),
       context: new FormControl()
    });
    */
  }

  private loadEntreprise(): void {
    this.entrepriseId = this.route.snapshot.paramMap.get('id');
    console.log("id: " + this.entrepriseId);
    this.entreprise = this.entrepriseService.getEntreprise(this.entrepriseId).valueChanges();
    this.entreprise.subscribe( e => this.updateForm(e)
      );
    //console.log("this.entreprise:" + JSON.stringify(this.entreprise));
  }

  private updateForm(e : Entreprise){
    this.entrepriseForm.controls.entreprise.setValue(e.entreprise);
    this.entrepriseForm.controls.context.setValue(e.context);
    this.entrepriseForm.controls.descriptif.setValue(e.descriptif);
  //setTimeout(() => this.autoSize.resizeToFitContent());
  this.loading = false;
}

private toggleEditField(field: string){
  this.edit[field] = !this.edit[field];
  //this.entrepriseForm.controls[field].enable();
  if(this.edit[field]){
    this.entrepriseForm.controls[field].enable();
  } else {
    this.entrepriseForm.controls[field].disable();
  }
}

goBack(): void {
  this.location.back();
}
onSubmit(value: any): void {
  console.log('isDirty: ' + this.entrepriseForm.dirty);
  console.log(value);
  this.entrepriseService.updateEntreprise(this.entrepriseId, value);
}

}
