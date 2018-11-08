import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPercentagesPage } from './show-percentages.page';

describe('ShowPercentagesPage', () => {
  let component: ShowPercentagesPage;
  let fixture: ComponentFixture<ShowPercentagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPercentagesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPercentagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
