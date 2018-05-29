import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendTaskComponent } from './recommend-task.component';

describe('RecommendTaskComponent', () => {
  let component: RecommendTaskComponent;
  let fixture: ComponentFixture<RecommendTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
