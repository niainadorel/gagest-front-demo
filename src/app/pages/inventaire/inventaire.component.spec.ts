import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InventaireComponent } from './inventaire.component';

describe('InventaireComponent', () => {
  let component: InventaireComponent;
  let fixture: ComponentFixture<InventaireComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InventaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
