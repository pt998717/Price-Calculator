import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalHospitalViewContainerComponent } from './animal-hospital-view-container.component';

describe('AnimalHospitalViewContainerComponent', () => {
  let component: AnimalHospitalViewContainerComponent;
  let fixture: ComponentFixture<AnimalHospitalViewContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalHospitalViewContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalHospitalViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
