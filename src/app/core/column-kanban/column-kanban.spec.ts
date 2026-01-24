import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnKanbanComponent } from './column-kanban';
import { MessageService } from 'primeng/api';

describe('ColumnKanbanComponent', () => {
  let component: ColumnKanbanComponent;
  let fixture: ComponentFixture<ColumnKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnKanbanComponent],
      providers: [MessageService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnKanbanComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
