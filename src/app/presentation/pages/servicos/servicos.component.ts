import { ServicoResponse } from './../../../core/models/servicos/responses/ServicoResponse';
import { ServicosService } from './../../../core/services/servicos/servicos.service';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenuItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [
    TableModule,
    FormsModule,
    SplitButtonModule,
    InputSwitchModule,
    ButtonModule,
  ],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.css',
})
export class ServicosComponent implements OnInit {
  items: MenuItem[];
  servicos: Array<ServicoResponse> = [];
  ativo: boolean = true;
  servicoSelecionado?: ServicoResponse;

  constructor(private servicoService: ServicosService) {
    this.items = [
      {
        label: 'Alterar Status',
        command: () => {
          this.atualizarSituacaoServico(this.servicoSelecionado!.id);
        },
      },
      {
        label: 'Delete',
        command: () => {},
      },
      { label: 'Angular Website', url: 'http://angular.io' },
      { separator: true },
      { label: 'Upload', routerLink: ['/fileupload'] },
    ];
  }
  ngOnInit(): void {
    this.buscarListaDeServico();
  }

  public acaoClique(servico: ServicoResponse) {
    this.servicoSelecionado = servico;
  }

  buscarListaDeServico() {
    this.servicoService
      .buscarListaDeServicos(this.ativo ? 'ATIVO' : 'INATIVO')
      .subscribe((success) => {
        this.servicos = success;
      });
  }

  atualizarSituacaoServico(id: string) {
    this.servicoService.atualizarSituacaoServico(id).subscribe((success) => {
      this.buscarListaDeServico();
    });
  }
}
