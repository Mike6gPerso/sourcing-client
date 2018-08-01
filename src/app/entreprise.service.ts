import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
//import { Http, Response } from '@angular/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Entreprise } from './entreprise';


@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
	private dbPath = '/entreprises';
  private API_URL = environment.apiUrl;

	entreprisesRef: AngularFireList<Entreprise> = null;

  constructor(private db: AngularFireDatabase, private http: HttpClient) { 
  	this.entreprisesRef = db.list(this.dbPath);
  }

  createEntreprise(entreprise: Entreprise): void {
  	this.entreprisesRef.push(entreprise);
  }

  updateEntreprise(key: string, value: any): any {
    let itemRef = this.db.object(this.dbPath + '/' + key);
    //itemRef.update(value).then(_ => console.log('updated!')).catch(error => this.handleError(error));
    return itemRef.update(value);
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


  searchKeyword(keyword: string): Observable<Entreprise[]> {
    return this.http.get(this.API_URL + keyword.replace(/\s/g, '+'))
    .pipe(
      map((res: Entreprise[]) => {/*console.log(res); */return res;})
      );
  }

  filterEntreprise(text: string): AngularFireList<Entreprise> {
    return this.db.list(this.dbPath, ref => ref.orderByChild('entreprise'));
  }
 
  deleteAll(): void {
    //this.entreprisesRef.remove().catch(error => this.handleError(error));
  }

  getEntreprise(id: string): AngularFireObject<Entreprise> {
    return this.db.object(this.dbPath + '/' + id);
  }
 
  private handleError(error) {
    console.log('what' + error);
  }
}
