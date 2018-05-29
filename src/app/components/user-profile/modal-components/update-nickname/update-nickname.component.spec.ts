import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNicknameComponent } from './update-nickname.component';

describe('UpdateNicknameComponent', () => {
  let component: UpdateNicknameComponent;
  let fixture: ComponentFixture<UpdateNicknameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNicknameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNicknameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
