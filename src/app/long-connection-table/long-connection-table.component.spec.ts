import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongConnectionTableComponent } from './long-connection-table.component';

describe('LongConnectionTableComponent', () => {
  let component: LongConnectionTableComponent;
  let fixture: ComponentFixture<LongConnectionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongConnectionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LongConnectionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
