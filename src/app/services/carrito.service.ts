import { Injectable } from '@angular/core';
import { UserData } from '../interface/userData';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductosService } from './productos.service';
import { Products } from '../interface/productos';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiEndpoints = environment.apiEndpoints;

  constructor(private http: HttpClient) { }

  // Método para agregar un producto al carrito
  agregarAlCarrito(idUsuario: number, idProducto: number): Promise<boolean> {
    const data = new FormData();
    data.append('idUsuario', idUsuario.toString());
    data.append('idProducto', idProducto.toString());

    return this.http.post(this.apiEndpoints.agregarProductoCarrito, data)
      .toPromise()
      .then((result: any) => {
        if (result === 'Exito') {
          return true;
        }
        return false;
      })
      .catch((error) => {
        console.error('Error al agregar al carrito:', error);
        return false;
      });
  }

  // Método para obtener los productos en el carrito del usuario
  obtenerProductoCarrito(idUsuario: number): Promise<any[]> {
    const data = new FormData();
    data.append('idUsuario', idUsuario.toString());

    return this.http.post(this.apiEndpoints.traerCarritoID, data)
      .toPromise()
      .then((result: any) => {
        if (Array.isArray(result)) {
          return result;
        }
        return []; // Retorna un arreglo vacío si la respuesta no es la esperada
      })
      .catch((error) => {
        console.error('Error al obtener productos del carrito:', error);
        return []; // Retorna un arreglo vacío en caso de error
      });
  }
}
