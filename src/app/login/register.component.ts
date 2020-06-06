import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    private _usuarioService: UsuarioService,
    private router: Router
  ) { }

  sonIguales(campo1: string, campo2: string) {
  return ( group: FormGroup ) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true
      };
    };
  }

  ngOnInit(): void {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password', 'password2' ) });
  }

  registrarUsuario(){

    if (this.forma.invalid){
      // Si el formulario es invalido => password no iguales
      return;
    }

    if ( !this.forma.value.condiciones ){
      // si no acepto las condiciones
      swal.fire('Importante','Debe de aceptar las condiciones', 'warning');
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
      this.forma.value.apellido
    );

    this._usuarioService.crearUsuario( usuario )
      .subscribe(resp => { this.router.navigate(['/login']); });
  }

}
