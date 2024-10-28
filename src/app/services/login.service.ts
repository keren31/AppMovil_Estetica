import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl: string = environment.apiEndpoints.loginUrl;
  traerDatosURL: string = environment.apiEndpoints.traerDatosUsuario;
  verificarCorreoUrl: string = environment.apiEndpoints.verificarCorreo;

  constructor(private router: Router, private http: HttpClient) { }
  
  verificarCorreoEstetica(email:string): Promise<boolean>{
    const formData = new FormData();
    formData.append("Correo", email);

    return this.http.post(this.verificarCorreoUrl, formData)
      .toPromise()
      .then((result: any) => {
        if (result === "No existe") {
          return false;
        }
        if (result === "Correo Existe") {
          return true;
        }
        return false;
      })
      .catch((error) => {
        console.error('Error during login:', error);
        return false;
      });
  }
  login(email: string, password: string): Promise<boolean> {
    const formData = new FormData();
    formData.append("Correo", email);
    formData.append("Contrasena", password);
    formData.append("ip", '89165168');
  
      return this.http.post(this.loginUrl, formData)
      .toPromise()
      .then((result: any) => {
        if (result === "Error en tus credenciales") {
          return false;
        }
        if (result === "Contraseña correcta") {
          return true;
        }
        return false;
      })
      .catch((error) => {
        console.error('Error during login:', error);
        return false;
      });
  }

}
