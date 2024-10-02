import { FormsModule } from '@angular/forms';
import { RegisterRequest } from './../../../core/models/auth/requests/RegisterRequest';
import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ToastModule, RippleModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  @Output() tokenExiste = new EventEmitter();
  registerRequest: RegisterRequest = new RegisterRequest();

  constructor(
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    localStorage.clear();
  }

  login() {
    this.showToast('info', 'Aguarde, estamos processando!');
    this.registerRequest.login =
      this.registerRequest.login.length > 0
        ? this.registerRequest.login.trim()
        : '';

    this.registerRequest.password =
      this.registerRequest.password.length > 0
        ? this.registerRequest.password.trim()
        : '';
    if (this.registerRequest.password.length > 3) {
      this.authService.login(this.registerRequest).subscribe(
        (success) => {
          this.clearToast();
          this.showToast('success', 'Logando!');
          localStorage.setItem('email', this.registerRequest.login);
          localStorage.setItem('token', success.token);
          this.tokenExiste.emit(localStorage.getItem('token')!.length > 0);
        },
        (error) => {
          this.clearToast();
          this.showToast('error', 'Conta não registrada');
        }
      );
    } else {
      this.clearToast();
      this.showToast('error', 'A senha deve possuir 8 digitos para mais');
    }
  }

  showToast(serverity: string, summary: string, detail?: string) {
    this.messageService.add({
      key: 'myKey',
      severity: serverity,
      summary: summary,
      detail: detail,
    });
    setTimeout(() => this.clearToast(), 5000);
  }

  clearToast() {
    this.messageService.clear();
  }
}
