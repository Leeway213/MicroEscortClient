import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskHouseComponent } from './task-house.component';

describe('TaskHouseComponent', () => {
  let component: TaskHouseComponent;
  let fixture: ComponentFixture<TaskHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
