import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../services/usuario/usuario.service';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame = false;
  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    init_plugins();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }

    this.googleInit();
  }

  googleInit() {

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '916431318010-e6cvdiqi3djg85m2dk20ktb5sjcm8blc.apps.googleusercontent.com',
        cookiepolicy: 'single_host_policy',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });

  }

  attachSignin( element ) {

    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile();

      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle( token )
        .subscribe( () => window.location.href = '#/dashboard' );

    } );

  }

  ingresar( forma: NgForm ) {
    console.log(forma.valid);
    console.log(forma.value);
    // this.router.navigate([ '/dashboard' ]);
    const usuario = new Usuario('', forma.value.email, forma.value.password);
    this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe( respuesta => this.router.navigate([ '/dashboard' ]) );
  }
}
