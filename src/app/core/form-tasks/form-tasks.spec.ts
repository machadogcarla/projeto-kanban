import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTasksComponent } from './form-tasks';

describe('FormTasksComponent', () => {
  let component: FormTasksComponent;
  let fixture: ComponentFixture<FormTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTasksComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
