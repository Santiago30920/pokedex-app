import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketDexComponent } from './pocket-dex.component';

describe('PocketDexComponent', () => {
  let component: PocketDexComponent;
  let fixture: ComponentFixture<PocketDexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PocketDexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PocketDexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
