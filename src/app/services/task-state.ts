import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../interface/task';

@Injectable({ providedIn: 'root' })
export class TaskStateService {
  // estado base
  tasks = signal<Task[]>([]);

  // filtros
  filters = signal({
    prioridade: null as string | null,
    busca: null as string | null,
    intervalo_datas: null as { start: string | null; end: string | null } | null,
  });

  // estado derivado (filtrado)
  filteredTasks = computed(() => {
    const tasks = this.tasks();
    const filters = this.filters();

    return tasks.filter((t) => {
      const matchPrioridade = !filters.prioridade || t.prioridade === filters.prioridade;

      const matchBusca =
        !filters.busca ||
        t.titulo.toLowerCase().includes(filters.busca.toLowerCase()) ||
        t.tags?.some((tag) => tag.toLowerCase().includes(filters.busca!.toLowerCase()));

      const matchData =
        !filters.intervalo_datas?.start ||
        !filters.intervalo_datas?.end ||
        (t.prazo >= filters.intervalo_datas.start && t.prazo <= filters.intervalo_datas.end);

      return matchPrioridade && matchBusca && matchData;
    });
  });
}
