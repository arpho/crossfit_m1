import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrCreatePage } from './pr-create.page';

describe('PrCreatePage', () => {
  let component: PrCreatePage;
  let fixture: ComponentFixture<PrCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
