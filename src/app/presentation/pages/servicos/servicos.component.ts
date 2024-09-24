import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [TableModule],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.css',
})
export class ServicosComponent {
  servicos: Array<servico> = [
    {
      id: '001',
      descricao: 'Desenvolvimento de site',
      preco: 1500.0,
      status: Status.ATIVO,
    },
    {
      id: '002',
      descricao: 'Revisão de código',
      preco: 500.0,
      status: Status.INATIVO,
    },
    {
      id: '003',
      descricao: 'Criação de logo',
      preco: 700.0,
      status: Status.ATIVO,
    },
    {
      id: '004',
      descricao: 'Consultoria de marketing',
      preco: 1200.0,
      status: Status.INATIVO,
    },
    {
      id: '005',
      descricao: 'Manutenção de servidor',
      preco: 2500.0,
      status: Status.ATIVO,
      function() {
        console.log('AAEEE');
      },
    },
  ];
}

type servico = {
  id: string;
  descricao: string;
  preco: number;
  status: Status;
  function?: Function;
};

enum Status {
  ATIVO = 'A',
  INATIVO = 'I',
}
