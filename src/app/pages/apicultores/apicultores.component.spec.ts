import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApicultoresComponent } from './apicultores.component';

describe('ApicultoresComponent', () => {
  let component: ApicultoresComponent;
  let fixture: ComponentFixture<ApicultoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApicultoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApicultoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
