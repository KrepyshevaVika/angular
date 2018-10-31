import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWithFieldsComponent } from './form-with-fields.component';

describe('FormWithFieldsComponent', () => {
  let component: FormWithFieldsComponent;
  let fixture: ComponentFixture<FormWithFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWithFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWithFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
