import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongmaoTrainComponent } from './longmao-train.component';

describe('LongmaoTrainComponent', () => {
  let component: LongmaoTrainComponent;
  let fixture: ComponentFixture<LongmaoTrainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongmaoTrainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongmaoTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
