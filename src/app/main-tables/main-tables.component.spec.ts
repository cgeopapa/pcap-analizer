import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTablesComponent } from './main-tables.component';

describe('MainTablesComponent', () => {
  let component: MainTablesComponent;
  let fixture: ComponentFixture<MainTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
