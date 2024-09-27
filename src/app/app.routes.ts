import { Routes } from '@angular/router';
import { ServicosComponent } from './presentation/pages/servicos/servicos.component';
import { ProdutosComponent } from './presentation/pages/produtos/produtos/produtos.component';

export const routes: Routes = [
  { path: 'servicos', component: ServicosComponent },
  { path: 'produtos', component: ProdutosComponent },
];
