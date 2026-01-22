import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListagemTarefas } from './listagem-tarefas/listagem-tarefas';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListagemTarefas],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('project-kanban');

}
