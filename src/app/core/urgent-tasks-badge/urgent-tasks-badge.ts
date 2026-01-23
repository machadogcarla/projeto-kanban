import { Component, inject } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { TaskStateService } from '../../services/task-state';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
  selector: 'app-urgent-tasks-badge',
  imports: [BadgeModule,OverlayBadgeModule],
  templateUrl: './urgent-tasks-badge.html',
  styleUrl: './urgent-tasks-badge.css',
})
export class UrgentTasksBadgeComponent {
  public taskState = inject(TaskStateService);

  get urgentCount(): number {
    return this.taskState.tasks().filter(task => task.prioridade === 'urgente' && task.status != 'concluido').length;
  }
}
