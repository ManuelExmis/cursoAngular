import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgreso') txtProgreso: ElementRef;

  @Input('nombre') leyenda:string = 'leyenda';
  @Input() progreso:number = 22;

  @Output('actaulizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    // console.log('constructor: ', this.progreso);
    // console.log('progreso ', this.progreso);
   }

  ngOnInit() {
    // console.log('ngOnInit: ', this.progreso)
  }

  onChange(newValue: number) {
    // let elemHTML: any = document.getElementsByName('progreso')[0];
    // console.log('viewchild ', this.txtProgreso);
    if(newValue >= 100) {
      this.progreso = 100;
    } else if(newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    this.txtProgreso.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(valor) {
    this.progreso = this.progreso + valor;
    if ( this.progreso > 100 ) {
      this.progreso = 100;
      this.cambioValor.emit( this.progreso );
      return;
    }
    if ( this.progreso < 0 ) {
      this.progreso = 0;
      this.cambioValor.emit( this.progreso );
      return;
    }
    this.cambioValor.emit( this.progreso );
    this.txtProgreso.nativeElement.focus();
  }

}
