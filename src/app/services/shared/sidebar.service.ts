import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'ProgressBar', url: '/progress' },
<<<<<<< HEAD
        { titulo: 'Gráficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'RxJs', url: '/rxjs' }
      ]
    }
  ];
=======
        { titulo: 'Gráficas', url: '/graficas1' }
      ]
    }
  ]
>>>>>>> 644ad412ef23f84a1c79424147a31883a7602dce

  constructor() { }

}
