export interface Task {
  id: number;
  titulo: string;
  descricao: string;
  prazo: string;
  prioridade: string;
  tags?: string;
  status: string;
}


export interface ModalConfirmationInterface {
 target: EventTarget;
 message: string;
 header: string;
 rejectLabel: string;
 acceptLabel: string;
 icon: string;

}
