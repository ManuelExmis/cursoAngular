import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.contar3()
      .then( ( mensaje ) => console.log("Termino: ", mensaje) )
      .catch( ( error ) => console.error("Ocurrio un error: ", error) );
   }

  ngOnInit() {
  }

  contar3(): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      let contador = 0;
      let intervalor = setInterval( () => {
        contador += 1;
        console.log( contador );
        if ( contador === 3 ) {
          resolve( true );
          // reject(true);
          clearInterval(intervalor);
        }
      }, 1000 );
    } );
  }
}
