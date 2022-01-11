import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnsTableComponent } from './dns-table.component';

describe('DnsTableComponent', () => {
  let component: DnsTableComponent;
  let fixture: ComponentFixture<DnsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DnsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DnsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
