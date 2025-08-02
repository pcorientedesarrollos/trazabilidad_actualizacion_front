import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiariosComponent } from './apiarios.component';

describe('ApiariosComponent', () => {
  let component: ApiariosComponent;
  let fixture: ComponentFixture<ApiariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
