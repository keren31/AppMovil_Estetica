import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Carrito } from '../interface/carrito';


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

  eliminardelCarrito(idUsuario: number, idProducto: number,productoAEliminar:number): Promise<boolean> {
    const data = new FormData();
    data.append('idUsuario', idUsuario.toString());
    data.append('idProducto', idProducto.toString());
    data.append("idCarritoProductos", productoAEliminar.toString())

    return this.http.post(this.apiEndpoints.quitarProductos, data)
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
  obtenerProductoCarrito(idUsuario: number){
    return this.http.get<Carrito[]>(this.apiEndpoints.traerCarritoID + idUsuario)
  }
}
