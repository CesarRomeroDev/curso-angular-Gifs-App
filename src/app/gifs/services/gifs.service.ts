import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'pI9n7APMJPo0BNPF0YhLw2xdjBfXWqsq'
  private _historial: string[] = [];

  public resultados: any[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor( private http:HttpClient){}

  buscarGifs( query: string ) {

    query = query.trim().toLocaleLowerCase();    //para quitar espacios y no repetir mayusculas y minusculas de la misma letra 


    if( !this._historial.includes(query)){    //!si no lo incluye es donde ahi lo voy a insertar solo si no existe
      this._historial.unshift( query );  //insertar al inicio .unshift
      this._historial = this._historial.splice(0,10);   //solo agrega 10 a la lista
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=pI9n7APMJPo0BNPF0YhLw2xdjBfXWqsq&q=${ query }`)
      .subscribe( (resp:any) =>  {
        console.log(resp.data);
        this.resultados = resp.data;
      })
    
  }
}
