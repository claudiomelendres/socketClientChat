import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario = null;


  constructor(
    private socket: Socket,
    private router: Router
  ) {
      this.cargarStorage();
      this.checkStatus();
    }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      this.cargarStorage();  // esto para conservar los nombres despues de que el servidor se reconecta
    });

    this.socket.on('disconnect', () => {
      console.log('desconectado del servidor');
      this.socketStatus = false;
    });
  }


  // emit('EVENTO', payload, callback?)
  emit( evento: string, payload?: any, callback?: Function ) {
    console.log('Emitiendo', evento);
    this.socket.emit( evento, payload, callback);
  }


  listen( evento: string ) {
    return this.socket.fromEvent( evento );
  }


  loginWS( nombre: string ) {

    // console.log('Configurando', nombre );
    // this.socket.emit( 'configurar-usuario', { nombre: nombre }, ( resp ) => {
    //   console.log( resp );
    // } );
    //// comentado por que utilizaremos lo siguiente que ya creamos

    return new Promise ( (resolve, reject) => {
      this.emit( 'configurar-usuario', { nombre }, resp => {
        // console.log( resp );

        this.usuario = new Usuario( nombre );
        this.guardarStorage();

        resolve();
      });
    });
  }

  logoutWS() {
    this.usuario = null;
    localStorage.removeItem('usuario');

    const payload = {
      nombre: 'sin-nombre'
    };

    this.emit('configurar-usuario', payload, () => {} ); // por que me pide si o si un callback
    this.router.navigateByUrl('');
  }


  getUsuario() {
    return this.usuario;
  }

  guardarStorage() {
    localStorage.setItem( 'usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    if ( localStorage.getItem('usuario') ) {
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.loginWS( this.usuario.nombre );
    }
  }

}
