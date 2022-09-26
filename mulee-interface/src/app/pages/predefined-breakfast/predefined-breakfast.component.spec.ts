import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredefinedBreakfastComponent } from './predefined-breakfast.component';

describe('PredefinedBreakfastComponent', () => {
  let component: PredefinedBreakfastComponent;
  let fixture: ComponentFixture<PredefinedBreakfastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredefinedBreakfastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredefinedBreakfastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
