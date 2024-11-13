// registro.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiEndpoints = environment.apiEndpoints;

  constructor(private http: HttpClient) {}

  // Método para verificar si el correo ya está registrado
  verificarCorreo(correo: string): Observable<any> {
    const formData = new FormData();
    formData.append('Correo', correo);

    return this.http.post(this.apiEndpoints.verificarCorreoRegistro, formData);
  }

  // Método para registrar un nuevo usuario
  registrarUsuario(data: FormData): Observable<any> {
    const url = `${this.apiEndpoints.agregarUsuarios}`;
    return this.http.post(url, data);
  }
}
