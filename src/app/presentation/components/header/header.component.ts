import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Output() pagina = new EventEmitter<pagina>();

  paginaSelecionada: number = 0;
  paginas: Array<pagina> = [
    { id: 1, descricao: 'Serviços', link: 'servicos' },
    { id: 2, descricao: 'Pedidos', link: '' },
    { id: 3, descricao: 'Funcionários', link: '' },
    { id: 4, descricao: 'Extrato', link: '' },
    { id: 5, descricao: 'Estoque', link: '' },
    { id: 6, descricao: 'Relatórios', link: '' },
    { id: 7, descricao: 'Pagamentos', link: '' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['']);
  }

  trocarPagina(pagina: pagina) {
    this.router.navigate([pagina.link]);
    this.pagina.emit(pagina);
  }
}

type pagina = {
  id: number;
  link: string;
  descricao: string;
};
