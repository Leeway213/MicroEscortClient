import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionViewerComponent } from './introduction-viewer.component';

describe('IntroductionViewerComponent', () => {
  let component: IntroductionViewerComponent;
  let fixture: ComponentFixture<IntroductionViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroductionViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
