import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'; 
import { Observable } from 'rxjs';

@Component({
	selector: 'app-document',
	templateUrl: './document.component.html',
	styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

	documents: Observable<any[]>;

	constructor(db: AngularFireDatabase) { 
		this.documents = db.list('entreprises').valueChanges();
		//this.items = db.list('/entreprises');
	}

	ngOnInit() {
	}

}
