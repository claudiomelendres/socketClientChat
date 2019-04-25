import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuariosActivosObs: Observable<any>;

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit() {
    this.usuariosActivosObs = this.chatService.getUsuariosActivos();

    // Emitir el obtenerUsuarios
    this.chatService.emitirUsuariosActivos();
  }

}
