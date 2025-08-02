import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportesComponent } from './transportes.component';

describe('TransportesComponent', () => {
  let component: TransportesComponent;
  let fixture: ComponentFixture<TransportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
