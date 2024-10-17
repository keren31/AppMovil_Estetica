import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Servicios } from '../interface/servicios';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  mostrarServiciosUrl: string = environment.apiEndpoints.mostrarServiciosUrl;
  constructor(private router: Router, private http: HttpClient) { }

  getALLServicios(){
    return this.http.get<Servicios[]>(this.mostrarServiciosUrl);
  }
}
