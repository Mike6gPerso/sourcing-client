import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
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
    this.entreprisesRef.update(key, value).catch(error => this.handleError(error));
  }
 
  deleteEntreprise(key: string): void {
    this.entreprisesRef.remove(key).catch(error => this.handleError(error));
  }
 
  getEntreprisesList(): AngularFireList<Entreprise> {
  	//return this.db.database.ref(this.dbPath).limitToFirst(10);
  	/*
  	return this.db.list(this.dbPath, { 
  		query : {
  			limitToFirst: 5
  		}

  	});
  	*/
    return this.entreprisesRef;
  }
 
  deleteAll(): void {
    this.entreprisesRef.remove().catch(error => this.handleError(error));
  }
 
  private handleError(error) {
    console.log(error);
  }
}
