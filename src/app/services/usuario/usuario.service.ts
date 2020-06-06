import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    private http: HttpClient,
    public _router: Router
  ) {
    this.cargarStorage();
  }

  estaLogueado(){
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage(){

    this.token = ( localStorage.getItem('token') ) ? localStorage.getItem('token') : '';
    this.usuario = (localStorage.getItem('usuario')) ? JSON.parse( localStorage.getItem('usuario') ) : '';

  }

  guardarStorage(id: string, token: string, usuario: Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  loginGoogle( token: string ) {

    const url = URL_SERVICIOS + '/login/google';
    // tslint:disable-next-line: object-literal-shorthand
    return this.http.post( url, { token: token } )
      .pipe(map( (resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      }));
  }

  login( usuario: Usuario, recordar: boolean = false ){

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
    .pipe(map( (resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      return true;
    }));
  }

  crearUsuario( usuario: Usuario ) {

    const url = URL_SERVICIOS + '/usuario/create';

    return this.http.post( url, usuario )
      .pipe(map( (resp: any) => {
        swal.fire('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }));
  }

  logout(){
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');

    this._router.navigate(['/login']);
  }
}
