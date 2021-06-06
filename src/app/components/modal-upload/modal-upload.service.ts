import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ModalUploadService {

  public tipo: string;
  public id: string;
  
  public oculto: string = 'oculto';
  
  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log('inicio modal upload service');
    }
    
    ocultarModal() {
      this.oculto = 'oculto';
      this.id = null;
      this.tipo = null;
    }
    
    mostrarModal(id: string, tipo: string) {
      this.oculto = '';
      this.id = id;
      this.tipo = tipo;
    }
}
