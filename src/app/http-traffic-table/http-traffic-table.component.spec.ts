import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpTrafficTableComponent } from './http-traffic-table.component';

describe('HttpTrafficTableComponent', () => {
  let component: HttpTrafficTableComponent;
  let fixture: ComponentFixture<HttpTrafficTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpTrafficTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpTrafficTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
