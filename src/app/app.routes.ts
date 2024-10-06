import { Routes } from '@angular/router';
import { ServicosComponent } from './presentation/pages/servicos/servicos.component';
import { ProdutosComponent } from './presentation/pages/produtos/produtos.component';
import { ClientesComponent } from './presentation/pages/clientes/clientes.component';
import { FuncionariosComponent } from './presentation/pages/funcionarios/funcionario.component';
import { FornecedoresComponent } from './presentation/pages/fornecedores/fornecedores.component';

export const routes: Routes = [
  { path: 'servicos', component: ServicosComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'funcionarios', component: FuncionariosComponent },
  { path: 'fornecedores', component: FornecedoresComponent },
];
