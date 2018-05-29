import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIdentificationComponent } from './update-identification.component';

describe('UpdateIdentificationComponent', () => {
  let component: UpdateIdentificationComponent;
  let fixture: ComponentFixture<UpdateIdentificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateIdentificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
