import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  get historial(){                             // se consume la informacion que viene de gifs.ts
    return this.gifsService.historial;
  }

  constructor( private gifsService: GifsService ) {}  // se consume informacion que viene de busqueda.component.ts

  buscar( termino: string ){
    this.gifsService.buscarGifs(termino);
  }
  

}
