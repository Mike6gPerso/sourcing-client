import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepriseSearchComponent } from './entreprise-search.component';

describe('EntrepriseSearchComponent', () => {
  let component: EntrepriseSearchComponent;
  let fixture: ComponentFixture<EntrepriseSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrepriseSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepriseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
