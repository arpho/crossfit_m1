import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JustTestComponent } from './just-test.component';

describe('JustTestComponent', () => {
  let component: JustTestComponent;
  let fixture: ComponentFixture<JustTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JustTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JustTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
