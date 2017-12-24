import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingHouseComponent } from './training-house.component';

describe('TrainingHouseComponent', () => {
  let component: TrainingHouseComponent;
  let fixture: ComponentFixture<TrainingHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
