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

  verificarEncuesta(idUsuario: number): Promise<boolean> {
    return this.http.get(environment.apiEndpoints.versiContestoFeed + idUsuario)
      .toPromise()
      .then((result: any) => {
        return result.Existe === true ? true : false;
      })
      .catch((error) => {
        console.error('Error:', error);
        return false;
      });
  }

  enviarRespuesta(calificacion: string, idPregunta: number, idUsuario: number): Promise<boolean> {

    const formData = new FormData();
    formData.append("Calificacion", calificacion);
    formData.append("IdPregunta", idPregunta.toString());
    formData.append("IdUsuario", idUsuario.toString());

    return this.http.post<any>(environment.apiEndpoints.registrarFeedback, formData)
    .toPromise()
      .then((result: any) => {
        if (result === "Respuesta insertada correctamente.") {
          return true;
        }else{
          return false;
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        return false;
      });
  }
  
}