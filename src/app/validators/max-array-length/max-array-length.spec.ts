import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxArrayLength } from './max-array-length';

describe('MaxArrayLength', () => {
  let component: MaxArrayLength;
  let fixture: ComponentFixture<MaxArrayLength>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaxArrayLength]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxArrayLength);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
