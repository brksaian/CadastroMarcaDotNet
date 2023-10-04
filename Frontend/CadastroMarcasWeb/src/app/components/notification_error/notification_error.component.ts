import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services';

@Component({
  selector: 'app-notification_error',
  templateUrl: './notification_error.component.html',
  styleUrls: ['./notification_error.component.css'],
})
export class NotificationErrorComponent implements OnInit {
  isVisible = false;
  errorMessage = '';

  constructor(private notificationService: NotificationService) {}

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
