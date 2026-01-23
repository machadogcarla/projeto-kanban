import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrgentTasksBadgeComponent } from './urgent-tasks-badge';

describe('UrgentTasksBadgeComponent', () => {
  let component: UrgentTasksBadgeComponent;
  let fixture: ComponentFixture<UrgentTasksBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrgentTasksBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrgentTasksBadgeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
