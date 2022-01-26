import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SortieComponent } from './sortie.component';

describe('SortieComponent', () => {
  let component: SortieComponent;
  let fixture: ComponentFixture<SortieComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SortieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
