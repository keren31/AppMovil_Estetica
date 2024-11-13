import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDataStorageService } from './user-data-storage.service';
import { UserData } from '../interface/userData';
import { Router } from '@angular/router';
import { Direccion } from '../interface/pedidos';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  telefono : string = '';
  userData1!: UserData;
  obetnerLasDireccion=environment.apiEndpoints.traerDirecciones;
  constructor(private http: HttpClient,
    private userStorage: UserDataStorageService,
    private router: Router
  ) { }


  async obtenerDatosUsuario(){
    this.userData1 = await this.userStorage.traerDatosUsuario();
    return this.userData1;
  }


  cerrarSesion(){
    this.userStorage.borrarDatosUsuario();
    this.router.navigate(['/login']);
  }


  traerDirecciones(idUsuario : number){
    return this.http.get<Direccion[]>(this.obetnerLasDireccion + idUsuario);
  }
  
}