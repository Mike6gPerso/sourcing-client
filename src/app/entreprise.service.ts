import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Entreprise } from './entreprise';


@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
	private dbPath = '/entreprises';

	entreprisesRef: AngularFireList<Entreprise> = null;

  constructor(private db: AngularFireDatabase) { 
  	this.entreprisesRef = db.list(this.dbPath);
  }

  createEntreprise(entreprise: Entreprise): void {
  	this.entreprisesRef.push(entreprise);
  }

  updateEntreprise(key: string, value: any): void {
    let itemRef = this.db.object(this.dbPath + '/' + key);
    itemRef.update(value).then(_ => console.log('updated!')).catch(error => this.handleError(error));
    //this.entreprisesRef.update(this.dbPath + '/' + key, value).then(_ => console.log('updated!')).catch(error => this.handleError(error));
  }
 
  deleteEntreprise(key: string): void {
    this.entreprisesRef.remove(key).catch(error => this.handleError(error));
  }
 
  getEntreprisesList(): AngularFireList<Entreprise> {
  	return this.entreprisesRef;
  }

  getPaginatedEntreprises(start: number = 0, end: number = 10): AngularFireList<Entreprise>  {
  	return this.db.list(this.dbPath, ref => ref.limitToFirst(end));
  }
 
  deleteAll(): void {
    //this.entreprisesRef.remove().catch(error => this.handleError(error));
  }

  getEntreprise(id: string): AngularFireObject<Entreprise> {
    return this.db.object(this.dbPath + '/' + id);
      //.subscribe(entreprise => { return entreprise });

  }
 
  private handleError(error) {
    console.log(error);
  }
}
