import { Injectable } from '@angular/core';
import { UserDataStorageService } from './user-data-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActualizarcontraService {

  actualizarcontra = environment.apiEndpoints.actializarContra;
  email : string = '';
  constructor(private http : HttpClient, private userStorageService : UserDataStorageService, private router: Router) { }

  verificarPassword(password: string, passwordVerified: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (password.length < 8) {
        return resolve(false);
      }  
      if (!/\d/.test(password)) {
        return resolve(false);
      }

      if (!/[A-Z]/.test(password)) {
        return resolve(false);
      }
      if (password !== passwordVerified) {
        return resolve(false);
      }
      return resolve(true);
    });
  }

  async cambiarPassword(password: string){
    this.email = await this.userStorageService.traerEmailGuardado();

    const formData = new FormData();
    formData.append('Correo', this.email);
    formData.append('Contrasena', password);
    formData.append('ip', '2021');
    
    this.http.post(this.actualizarcontra, formData)
    .toPromise()
    .then((result: any) => {
      if (result === "Error en las credenciales") {
        console.log('No se pudo intentalo más tarde');
      }
      if (result === "Contraseña modificada correctamente") {
        console.log('Contraseña cambiada correctamente');
        this.router.navigate(['/login']);
      }
      return false;
    })
    .catch((error) => {
      console.error('Error during login:', error);
      return false;
    });
  }
}
