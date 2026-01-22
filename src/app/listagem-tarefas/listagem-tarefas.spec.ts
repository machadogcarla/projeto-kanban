import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemTarefas } from './listagem-tarefas';

describe('ListagemTarefas', () => {
  let component: ListagemTarefas;
  let fixture: ComponentFixture<ListagemTarefas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemTarefas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemTarefas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
