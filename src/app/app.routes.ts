import { Routes } from '@angular/router';
import { ServicosComponent } from './presentation/pages/servicos/servicos.component';
import { LoginComponent } from './presentation/pages/login/login.component';

export const routes: Routes = [
  { path: 'servicos', component: ServicosComponent },
  { path: '', component: LoginComponent },
];
