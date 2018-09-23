import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrListPage } from './pr-list.page';

describe('PrListPage', () => {
  let component: PrListPage;
  let fixture: ComponentFixture<PrListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
