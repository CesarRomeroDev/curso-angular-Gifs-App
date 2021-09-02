import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'pI9n7APMJPo0BNPF0YhLw2xdjBfXWqsq'
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs'
  private _historial: string[] = [];

  public resultados: Gif[] = [];
  

  get historial(){
    return [...this._historial];
  }

  constructor( private http:HttpClient){
   
    this._historial = JSON.parse(localStorage.getItem('historial')!); //para que se guarde en memoria en el navegador
    this.resultados = JSON.parse(localStorage.getItem('resultados')!);

  }

  buscarGifs( query: string ) {

    query = query.trim().toLocaleLowerCase();    //para quitar espacios y no repetir mayusculas y minusculas de la misma letra 


    if( !this._historial.includes(query)){    //!si no lo incluye es donde ahi lo voy a insertar solo si no existe
      this._historial.unshift( query );  //insertar al inicio .unshift
      this._historial = this._historial.splice(0,10);   //solo agrega 10 a la lista

      localStorage.setItem('historial', JSON.stringify(this._historial));  //esta linea nos dice para guardar el historial en el navegador.
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

      console.log(params);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe( (resp) =>  {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      })
    
  }
}
