import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Products } from '../interface/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  mostrarproductosUrl: string = environment.apiEndpoints.mostrarproductosUrl;
  traerProductosporID: string= environment.apiEndpoints.traerProductoPorId;
  constructor(private router: Router, private http: HttpClient) { }

  getALLProducts(){
    return this.http.get<Products[]>(this.mostrarproductosUrl);
  }

  obtenerDetallesProducto(idProducto: number){
    const formdata = new FormData();
    formdata.append("idProducto", idProducto.toString());

    return this.http.post<Products>(this.traerProductosporID,formdata);
  }

}