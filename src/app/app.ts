import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListTasks } from './list-tasks/list-tasks';
import { SharedTaskModule } from './shared.module';

@Component({
  selector: 'app-root',
  imports: [SharedTaskModule, RouterOutlet, ListTasks],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('project-kanban');

}
