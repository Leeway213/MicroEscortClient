import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPublisherComponent } from './task-publisher.component';

describe('TaskPublisherComponent', () => {
  let component: TaskPublisherComponent;
  let fixture: ComponentFixture<TaskPublisherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskPublisherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
