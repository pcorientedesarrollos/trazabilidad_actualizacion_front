import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtileriasComponent } from './utilerias.component';

describe('UtileriasComponent', () => {
  let component: UtileriasComponent;
  let fixture: ComponentFixture<UtileriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtileriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtileriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
