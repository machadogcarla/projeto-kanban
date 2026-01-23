import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnKanban } from './column-kanban';

describe('ColumnKanban', () => {
  let component: ColumnKanban;
  let fixture: ComponentFixture<ColumnKanban>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnKanban]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnKanban);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
