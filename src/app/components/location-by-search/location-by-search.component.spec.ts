import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationBySearchComponent } from './location-by-search.component';

describe('LocationBySearchComponent', () => {
  let component: LocationBySearchComponent;
  let fixture: ComponentFixture<LocationBySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationBySearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationBySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
