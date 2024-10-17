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
  constructor(private router: Router, private http: HttpClient) { }

  getALLProducts(){
    return this.http.get<Products[]>(this.mostrarproductosUrl);
  }
}
