import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListTasksComponent } from './core/list-tasks/list-tasks';
import { SharedTaskModule } from './shared.module';
import { Toast } from "primeng/toast";

@Component({
  selector: 'app-root',
  imports: [SharedTaskModule, RouterOutlet, Toast, ListTasksComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('project-kanban');

}
