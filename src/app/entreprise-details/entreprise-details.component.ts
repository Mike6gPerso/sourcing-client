import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

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
  edit: any = {'entreprise': false, 'context': false, 'url': false};
  entrepriseForm : FormGroup;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private entrepriseService: EntrepriseService,
    private location: Location,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.loadEntreprise();

    this.entrepriseForm = this.formBuilder.group({
      'entreprise': [{ value: 'abcd', disabled: true}],
      'context': [{ value: '', disabled: true}], 
      'url': [{ value: '', disabled: true}], 
      'descriptif': [''],
      'keywords': this.formBuilder.array([])
    });


  }

  private loadEntreprise(): void {
    this.entrepriseId = this.route.snapshot.paramMap.get('id');
    console.log("id: " + this.entrepriseId);
    this.entreprise = this.entrepriseService.getEntreprise(this.entrepriseId).valueChanges();
    this.entreprise.subscribe( e => this.updateForm(e)
      );
    //console.log("this.entreprise:" + JSON.stringify(this.entreprise));
  }
  private cleanFormArray(formArray: FormArray):void {
    while(formArray.length != 0) {
      formArray.removeAt(0);
    }
  }
  

  private updateForm(e : Entreprise){
    console.log("updateForm!");
    this.entrepriseForm.controls.entreprise.setValue(e.entreprise);
    this.entrepriseForm.controls.context.setValue(e.context);
    this.entrepriseForm.controls.descriptif.setValue(e.descriptif);
    this.entrepriseForm.controls.url.setValue(e.url);
    this.cleanFormArray(this.entrepriseForm.controls.keywords as FormArray);
    if(e.keywords){
      for(let keyword of e.keywords){
        (this.entrepriseForm.controls.keywords as FormArray).push(new FormControl(keyword));
      }
    }
    this.loading = false;
}


toggleEditField(field: string){
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
  this.entrepriseForm.enable();
  //console.log('isDirty: ' + this.entrepriseForm.dirty);
  console.log(value);
  this.entrepriseService.updateEntreprise(this.entrepriseId, this.entrepriseForm.value).then(
    () =>
    this.snackBar.open('Saved',  '', {
      duration: 1000,
    })
    );

  for(let field in this.edit){
    this.edit[field] = false;
    this.entrepriseForm.controls[field].disable();
  }
}

get keywords(): FormArray {
    return this.entrepriseForm.get("keywords") as FormArray;
 } 

removeKeyword(keywordIndex: number){
  console.log('removing keyword with index: ' + keywordIndex);
  (this.entrepriseForm.controls.keywords as FormArray ).removeAt(keywordIndex);
}

addKeyword(){
  (this.entrepriseForm.controls.keywords as FormArray ).push(new FormControl());
  
}
}
