import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackDetailsComponent } from './snack-details.component';

describe('SnackDetailsComponent', () => {
  let component: SnackDetailsComponent;
  let fixture: ComponentFixture<SnackDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
