import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAgentTableComponent } from './user-agent-table.component';

describe('UserAgentTableComponent', () => {
  let component: UserAgentTableComponent;
  let fixture: ComponentFixture<UserAgentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAgentTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAgentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
