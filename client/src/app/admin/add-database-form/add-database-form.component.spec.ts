import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDatabaseFormComponent } from './add-database-form.component';

describe('AddDatabaseFormComponent', () => {
  let component: AddDatabaseFormComponent;
  let fixture: ComponentFixture<AddDatabaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDatabaseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDatabaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
