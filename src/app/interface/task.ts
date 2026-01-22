export interface Task {
  id: number;
  titulo: string;
  descricao: string;
  prazo: string;
  prioridade: string;
  tags?: string;
  status: string;
}
