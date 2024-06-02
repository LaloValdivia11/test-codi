import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentUserPage } from './component-user.page';

describe('ComponentUserPage', () => {
  let component: ComponentUserPage;
  let fixture: ComponentFixture<ComponentUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
