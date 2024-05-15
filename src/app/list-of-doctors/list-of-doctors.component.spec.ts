import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfDoctorsComponent } from './list-of-doctors.component';

describe('ListOfDoctorsComponent', () => {
  let component: ListOfDoctorsComponent;
  let fixture: ComponentFixture<ListOfDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfDoctorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListOfDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
