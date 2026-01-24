import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmationComponent } from './modal-confirmation';
import { ConfirmationService, MessageService } from 'primeng/api';

describe('ModalConfirmationComponent', () => {
  let component: ModalConfirmationComponent;
  let fixture: ComponentFixture<ModalConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalConfirmationComponent],
      providers: [MessageService, ConfirmationService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConfirmationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
