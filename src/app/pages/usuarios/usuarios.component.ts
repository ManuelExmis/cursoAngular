import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion.subscribe( (respuesta) => {
      this.cargarUsuarios();
    } )
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal(id, 'usuarios');
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde )
        .subscribe( (respuesta: any) => {
          
          this.totalRegistros = respuesta.total;
          this.usuarios = respuesta.usuarios;
          this.cargando = false;

          if (this.desde >= respuesta.total) {
            this.cambiarDesde(-5);
          }
        } );
  }

  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  bucarUsuario( termino: string ) {

    if (termino.length < 1) {
      this.cargarUsuarios();
      return;
    }
    
    this.cargando = true;
    this._usuarioService.buscarUsuarios(termino)
      .subscribe( (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
      } );

  }

  guardarUsuario( usuario: Usuario ) {
    this._usuarioService.actualizarUsuario(usuario)
      .subscribe();
  }

  borrarUsuario( usuario: Usuario ) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
  
    swal({
            title: "¿Estas seguro?",
            text: "Esta a punto de borrar a " + usuario.nombre,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              this._usuarioService.borrarusuario( usuario._id )
                .subscribe( result => {
                  if (result) {
                    this.cargarUsuarios();
                  }
                } );
            } 
          });
    
  }
}
