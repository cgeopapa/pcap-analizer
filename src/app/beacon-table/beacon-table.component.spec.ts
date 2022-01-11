import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaconTableComponent } from './beacon-table.component';

describe('BeaconTableComponent', () => {
  let component: BeaconTableComponent;
  let fixture: ComponentFixture<BeaconTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeaconTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeaconTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
