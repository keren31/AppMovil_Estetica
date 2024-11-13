import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Servicios } from '../interface/servicios';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiEndpoints = environment.apiEndpoints;

  constructor(private http: HttpClient) {}

  // Método para obtener los servicios disponibles
  obtenerServicios() {
    return this.http.get<Servicios[]>(this.apiEndpoints.mostrarServiciosUrl);
  }

  // Método para obtener horarios disponibles en una fecha específica
  obtenerHorariosFecha(fecha: string): Promise<string[]> {
    const formData = new FormData();
    formData.append('fecha', fecha);

    // Genera el arreglo de horas desde las 9:00 hasta las 16:00
    const horasDisponibles = [
      '09:00:00', '10:00:00', '11:00:00', '12:00:00',
      '13:00:00', '14:00:00', '15:00:00', '16:00:00'
    ];

    return this.http.post(this.apiEndpoints.horariosDisponibles, formData)
      .toPromise()
      .then((result: any) => {
        if (result === "No hay horas") {
          // Retorna todas las horas si no hay horarios ocupados
          return horasDisponibles;
        } else if (Array.isArray(result)) {
          // Filtra las horas disponibles para eliminar las que están ocupadas
          return horasDisponibles.filter(hora => !result.includes(hora));
        } else {
          return horasDisponibles; // Retorna todas las horas en caso de una respuesta inesperada
        }
      })
      .catch(error => {
        console.error('Error al obtener horarios:', error);
        return horasDisponibles; // Retorna todas las horas en caso de error
      });
  }

  // Método para agendar una cita
  agregarCita(usuario_id: number, servicio_id: number, fecha: string, hora: string, telefono: string, correo: string): Promise<boolean> {
    
    const body = new FormData();
    body.append('usuario_id', usuario_id.toString());
    body.append('servicio_id', servicio_id.toString());
    body.append('Fecha', fecha);
    body.append('Hora', hora);
    body.append('Telefono', telefono);
    body.append('Correo', correo);
  
    return this.http.post(this.apiEndpoints.agendarCita, body)
      .toPromise()
      .then((result: any) => {
        if (result === "Agregado!!") {
          return true;
        }
        return false;
      })
      .catch((error) => {
        console.error('Error while scheduling appointment:', error);
        return false;
      });
  }
}
