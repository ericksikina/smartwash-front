import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Output() logoutEmitter = new EventEmitter<boolean>();

  email: String = localStorage.getItem('email')!;

  paginaSelecionada: number = 0;
  paginas: Array<pagina> = [
    { id: 1, descricao: 'Serviços', link: 'servicos' },
    { id: 2, descricao: 'Produtos', link: 'produtos' },
    { id: 3, descricao: 'Funcionários', link: '' },
    { id: 4, descricao: 'Cliente', link: 'clientes' },
    { id: 5, descricao: 'Fornecedor', link: '' },
    { id: 6, descricao: 'Pedido', link: '' },
    { id: 7, descricao: 'Compra', link: '' },
  ];

  constructor(private router: Router) {}

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
