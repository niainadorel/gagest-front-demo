import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewFournisseurDialogComponent } from './new-fournisseur-dialog.component';

describe('NewFournisseurDialogComponent', () => {
  let component: NewFournisseurDialogComponent;
  let fixture: ComponentFixture<NewFournisseurDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFournisseurDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFournisseurDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
