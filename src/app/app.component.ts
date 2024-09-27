import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './presentation/components/header/header.component';
import { LoginComponent } from './presentation/pages/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, HeaderComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'front';

  tokenExiste: boolean = false;

  ngOnInit(): void {
    localStorage.setItem('token', '');
    // localStorage.setItem(
    //   'token',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImVyaWNrZHVhcnRlc2lraW5hQGdtYWlsLmNvbSIsImV4cCI6MTc0Mzc4MjU2OH0.hPnJiEF9PtWw0i-qeaYZtFlyyrtfSFn0FAa5oCQpmkU'
    // );
    this.tokenExiste = localStorage.getItem('token')!.length > 0;
  }

  trocarPagina(event: any) {
    console.log(event);
  }
}
