import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcopiadoresComponent } from './acopiadores.component';

describe('AcopiadoresComponent', () => {
  let component: AcopiadoresComponent;
  let fixture: ComponentFixture<AcopiadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcopiadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcopiadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
