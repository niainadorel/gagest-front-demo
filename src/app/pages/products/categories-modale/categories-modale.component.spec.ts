import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoriesModaleComponent } from './categories-modale.component';

describe('CategoriesModaleComponent', () => {
  let component: CategoriesModaleComponent;
  let fixture: ComponentFixture<CategoriesModaleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesModaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
