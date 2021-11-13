import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingButtonComponent } from './shopping-button.component';

describe('ShoppingButtonComponent', () => {
  let component: ShoppingButtonComponent;
  let fixture: ComponentFixture<ShoppingButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
