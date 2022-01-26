import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModifDialogComponent } from './modif-dialog.component';

describe('ModifDialogComponent', () => {
  let component: ModifDialogComponent;
  let fixture: ComponentFixture<ModifDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
