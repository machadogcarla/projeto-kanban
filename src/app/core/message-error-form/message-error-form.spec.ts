import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageErrorForm } from './message-error-form';

describe('MessageErrorForm', () => {
  let component: MessageErrorForm;
  let fixture: ComponentFixture<MessageErrorForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageErrorForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageErrorForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
