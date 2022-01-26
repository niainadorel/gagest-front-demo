import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewSortieComponent } from './new-sortie.component';

describe('NewSortieComponent', () => {
  let component: NewSortieComponent;
  let fixture: ComponentFixture<NewSortieComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSortieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
