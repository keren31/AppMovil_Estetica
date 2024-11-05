import { Injectable } from '@angular/core';
import { MisCitas, MisCitasDetalle } from '../interface/miscitas';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MiscitasService {
  private apiEndpoints = environment.apiEndpoints;
 
  constructor(private http: HttpClient, private toastController: ToastController ) { }


  obtenerCitas(idUsuario:number) {
    return this.http.get<MisCitas[]>(this.apiEndpoints.misCitas+idUsuario);
  }

async CancelarReservacion(idCita: number): Promise<boolean> {
  const data = new FormData();
  data.append("idCita", idCita.toString());
  data.append("Estado", 'Cancelada');
  data.append("ip", '526');

  try {
    const result: any = await this.http.post(this.apiEndpoints.estadoCita, data).toPromise();

    // Verificamos si el resultado es igual a "Cita pendiente"
    if (result === "Cita pendiente") {
      return true;
    } else {
      return false; // En caso de que el resultado no sea el esperado
    }
  } catch (error) {
    console.error("Error al cancelar la reservación:", error);
    return false; // Retornamos false en caso de error
  }
}
 
obtenerDetalleCita(idCita: number){
  const formdata = new FormData();
  formdata.append("idCita", idCita.toString());

  return this.http.post<MisCitasDetalle>(this.apiEndpoints.traerCitaDetalle,formdata);
}

async actualizarCita(idCita: number,servicioid : number,fecha:string, hora:string, telefono:string): Promise<boolean>{
  const formdata = new FormData();
  formdata.append("idCita", idCita.toString());
  formdata.append("servicio_id", servicioid.toString());
  formdata.append("Fecha", fecha);
  formdata.append("Hora", hora);
  formdata.append("Telefono",telefono);

  try {
    const result = await this.http.post(this.apiEndpoints.actualizarCita,formdata).toPromise();
    console.log(result)
    // Verificamos si el resultado es igual a "Cita pendiente"
    if (result === "Cita editada exitosamente!!") {
      return true;
    } else {
      return false; // En caso de que el resultado no sea el esperado
    }
  } catch (error) {
    console.error("Error al editar la cita:", error);
    return false; // Retornamos false en caso de error
  }
}
}
