import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DessertDetailsComponent } from './dessert-details.component';

describe('DessertDetailsComponent', () => {
  let component: DessertDetailsComponent;
  let fixture: ComponentFixture<DessertDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DessertDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DessertDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
