import { Routes } from '@angular/router';
import { ServicosComponent } from './presentation/pages/servicos/servicos.component';
import { ProdutosComponent } from './presentation/pages/produtos/produtos.component';
import { ClientesComponent } from './presentation/pages/clientes/clientes.component';
import { FuncionariosComponent } from './presentation/pages/funcionarios/funcionario.component';

export const routes: Routes = [
  { path: 'servicos', component: ServicosComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'funcionarios', component: FuncionariosComponent },
];
