import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewClientDialogComponent } from './new-client-dialog.component';

describe('NewClientDialogComponent', () => {
  let component: NewClientDialogComponent;
  let fixture: ComponentFixture<NewClientDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewClientDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
