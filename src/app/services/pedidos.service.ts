import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedidos } from '../interface/pedidos';
import { environment } from 'src/environments/environment';
import { UserData } from '../interface/userData';
import { UserDataStorageService } from './user-data-storage.service';
import { NavController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private apiUrl = environment.apiEndpoints.obtenerPedidos;
  private agregarPedido = environment.apiEndpoints.agregarPedidoCAN
  userData!: UserData;
  constructor(private http: HttpClient, private userStprage: UserDataStorageService, private nav:NavController) { }

  getPedidos(idUsuario: number) {
    const url = `${this.apiUrl}${idUsuario}`; // Agrega el idUsuario al final de la URL
    return this.http.get<Pedidos>(url);
  }
  
  async crearPedidos(idUsuario: number, idCarrito: number, total: number, idDireccion: number){
    const data= new FormData();
    data.append("idTipoPago",'2')
    data.append("idUsuario",idUsuario.toString())
    data.append("idCarrito",idCarrito.toString())
    data.append("Total",total.toString())
    data.append("idDireccion",idDireccion.toString())
    return this.http.post(this.agregarPedido, data)
      .toPromise()
      .then((result: any) => {
        if (result === "Error interno") {
          console.log('Error interno del servidor')
        }
        if (result === "Exito") {
         
         this.nav.navigateForward('mispedidos')
        }
        return false;
      })
      .catch((error) => {
        console.error('Error during login:', error);
        return false;
      });
  }


}