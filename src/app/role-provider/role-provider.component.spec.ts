import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleProviderComponent } from './role-provider.component';

describe('RoleProviderComponent', () => {
  let component: RoleProviderComponent;
  let fixture: ComponentFixture<RoleProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
