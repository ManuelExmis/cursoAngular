import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  public subscrition: Subscription;

  constructor() { 
    this.subscrition = this.regresaObservable()
      .subscribe( ( numero ) => {
        console.log('Subs: ', numero);
      }, (error) => {
        console.error('error en el obs: ', error);
      }, () => {
        console.log('El observador termino!');
      } );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('la pagina se va a cerrar');
    this.subscrition.unsubscribe();
  }

  regresaObservable(): Observable<number> {
    return new Observable( (observer) => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador += 1;
        let salida = {
          valor: contador
        };
        observer.next( salida );

        // if ( contador === 3 ) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }

        // if ( contador === 2 ) {
        //   // clearInterval( intervalo );
        //   observer.error('Auxilio!');
        // }
      }, 500 );
    } )
    .retry(2)
    .map( (data: any) => {
      return data.valor;
    } )
    .filter( (valor, index) => {
      if ( valor % 2 === 1 ) {
        return true;
      } else {
        return false;
      }
    } );
  }
}
