import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit , OnDestroy {

  texto = '';
  mensajesSubcription: Subscription;
  elemento: HTMLElement;

  mensajes: any[] = [];

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit() {

    this.elemento = document.getElementById('chat-mensajes');

    this.mensajesSubcription = this.chatService.getMessages().subscribe( msg => {
      // console.log(msg);

      this.mensajes.push( msg );

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
  }

  ngOnDestroy() {
    this.mensajesSubcription.unsubscribe();
  }

  enviar() {
    // console.log( this.texto );

    if ( this.texto.trim().length === 0) {
      return;
    }

    this.chatService.sendMessage( this.texto );
    this.texto = '';
  }

}
