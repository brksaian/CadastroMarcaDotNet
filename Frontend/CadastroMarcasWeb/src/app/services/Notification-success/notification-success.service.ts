import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationSuccessService {
  private mostrarNotificacaoSubject = new Subject<string>();

  mostrarNotificacao$ = this.mostrarNotificacaoSubject.asObservable();

  mostrarNotificacao(mensagem: string) {
    this.mostrarNotificacaoSubject.next(mensagem);
  }
}
