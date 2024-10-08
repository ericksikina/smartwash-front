import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SplitButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Output() logoutEmitter = new EventEmitter<boolean>();

  items: MenuItem[];
  email: String = localStorage.getItem('email')!;

  paginaSelecionada: number = 9;
  paginas: Array<pagina> = [
    { id: 1, descricao: 'Serviços', link: 'servicos' },
    { id: 2, descricao: 'Produtos', link: 'produtos' },
    { id: 3, descricao: 'Funcionários', link: 'funcionarios' },
    { id: 4, descricao: 'Cliente', link: 'clientes' },
    { id: 5, descricao: 'Fornecedor', link: 'fornecedores' },
    { id: 6, descricao: 'Pedido', link: 'pedidos' },
    { id: 7, descricao: 'Compra', link: 'compras' },
    { id: 8, descricao: 'Baixa no Estoque', link: 'baixas-estoque' },
    { id: 9, descricao: 'Relatorios', link: '' },
  ];

  constructor(private router: Router) {
    this.items = [
      {
        label: 'Baixa no Estoque',
        command: () => {
          this.trocarPagina(this.paginas[7]);
          this.paginaSelecionada = this.paginas[7].id;
        },
      },
    ];
  }

  ngOnInit(): void {
    this.router.navigate(['']);
  }

  trocarPagina(pagina: pagina) {
    this.router.navigate([pagina.link]);
  }

  logout() {
    localStorage.clear();
    this.logoutEmitter.emit(false);
  }
}

type pagina = {
  id: number;
  link: string;
  descricao: string;
};
