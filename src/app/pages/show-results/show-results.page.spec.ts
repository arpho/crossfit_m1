import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResultsPage } from './show-results.page';

describe('ShowResultsPage', () => {
  let component: ShowResultsPage;
  let fixture: ComponentFixture<ShowResultsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowResultsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
