import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeBreakfastComponent } from './customize-breakfast.component';

describe('CustomizeBreakfastComponent', () => {
  let component: CustomizeBreakfastComponent;
  let fixture: ComponentFixture<CustomizeBreakfastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizeBreakfastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomizeBreakfastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
