import { Component, OnInit } from '@angular/core';
import { NotificationSuccessService } from 'src/app/services';

@Component({
  selector: 'app-notification-success',
  templateUrl: './notification-success.component.html',
  styleUrls: ['./notification-success.component.css'],
})
export class NotificationSuccessComponent implements OnInit {
  isVisible = false;
  errorMessage = '';

  constructor(private notificationService: NotificationSuccessService) {}

  ngOnInit() {
    this.notificationService.mostrarNotificacao$.subscribe((mensagem) => {
      this.errorMessage = mensagem;
      this.isVisible = true;
      setTimeout(() => {
        this.fecharNotificacao();
      }, 5000); // Fecha a notificação após 5 segundos (ajuste conforme necessário)
    });
  }

  fecharNotificacao() {
    this.isVisible = false;
  }
}
