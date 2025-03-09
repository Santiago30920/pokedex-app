import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAbilitieComponent } from './add-abilitie.component';

describe('AddAbilitieComponent', () => {
  let component: AddAbilitieComponent;
  let fixture: ComponentFixture<AddAbilitieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAbilitieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAbilitieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
