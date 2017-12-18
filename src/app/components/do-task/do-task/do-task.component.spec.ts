import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoTaskComponent } from './do-task.component';

describe('DoTaskComponent', () => {
  let component: DoTaskComponent;
  let fixture: ComponentFixture<DoTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
