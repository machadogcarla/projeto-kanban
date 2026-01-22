import { Component, OnInit } from '@angular/core';
import { TarefasService } from '../services/tarefas-service';
import { Tarefa } from '../interface/tarefa';
import { CardTarefa } from "../core/card-tarefa/card-tarefa";

@Component({
  selector: 'app-listagem-tarefas',
  imports: [CardTarefa],
  templateUrl: './listagem-tarefas.html',
  styleUrl: './listagem-tarefas.css',
})
export class ListagemTarefas implements OnInit {
  public loading: boolean = false;
  public tarefas: Tarefa[] = [];
  public aFazer: Tarefa[] = [];
  public emAndamento: Tarefa[] = [];
  public concluido: Tarefa[] = [];

  constructor(private tarefaService: TarefasService) {}

  ngOnInit(): void {
    this.carregarTarefas();
  }

  private carregarTarefas() {
    this.loading = true;

    this.tarefaService.getTarefas().subscribe({
      next: (data) => {
        this.tarefas = data;
        this.aFazer = this.tarefas.filter((t) => t.status === 'a-fazer');
        this.emAndamento = this.tarefas.filter((t) => t.status === 'em-andamento');
        this.concluido = this.tarefas.filter((t) => t.status === 'concluido');
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar tarefas', err);
        this.loading = false;
      },
    });
  }


}
