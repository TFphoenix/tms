import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreBreakfastComponent } from './explore-breakfast.component';

describe('ExploreBreakfastComponent', () => {
  let component: ExploreBreakfastComponent;
  let fixture: ComponentFixture<ExploreBreakfastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreBreakfastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreBreakfastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
