import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestAnnoncePage } from './GestAnnoncePage';

describe('GestAnnoncePage', () => {
  let component: GestAnnoncePage;
  let fixture: ComponentFixture<GestAnnoncePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GestAnnoncePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
