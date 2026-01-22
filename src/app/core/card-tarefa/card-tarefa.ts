import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Tarefa } from '../../interface/tarefa';

@Component({
  selector: 'app-card-tarefa',
  imports: [CommonModule, DragDropModule, CardModule, DatePipe],
  templateUrl: './card-tarefa.html',
  styleUrl: './card-tarefa.css',
})
export class CardTarefa {

  @Input() lista: Tarefa[]  = [];

  drop(event: CdkDragDrop<Tarefa[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const tarefa = event.container.data[event.currentIndex];
      tarefa.status = event.container.id;

      // Aqui você pode chamar PUT depois:
      // this.tarefaService.editTarefa(tarefa.id, tarefa).subscribe();
    }
  }
}
