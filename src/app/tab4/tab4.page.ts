import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CarritoPage } from '../carrito/carrito.page';  // Importa la página del carrito
import { NavController } from '@ionic/angular';  // Importa NavController
import { IonModal } from '@ionic/angular';
import { Products } from '../interface/productos';
import { ProductosService } from '../services/productos.service';
import { CarritoService } from '../services/carrito.service';
import { ToastController } from '@ionic/angular';
import { UserData } from '../interface/userData';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  userData!: UserData;
  products:Products[]=[];
  constructor(private modalController: ModalController, private productosservice: ProductosService, private carritoService: CarritoService, private toastController: ToastController, private perfilService: PerfilService,) {}  // Inyecta ModalController

  // Método para abrir el modal del carrito
  async openCarritoModal() {
    const modal = await this.modalController.create({
      component: CarritoPage,  // Carga la página CarritoPage dentro del modal
    });
    return await modal.present();
  }

  ngOnInit() {
    this.getTraerProductos()
    this.traerDatosUsuario();
  
  }

  ionViewWillEnter() {
    this.traerDatosUsuario();
  }

  getTraerProductos(){
    this.productosservice.getALLProducts()
    .subscribe(products=>{
      this.products=products;
      console.log(products)
    }
    )
  }
  //aqui empiza modificaciones
  async traerDatosUsuario() {
    try {
      this.userData = await this.perfilService.obtenerDatosUsuario();
      console.log('Datos del usuario obtenidos:', this.userData);
    } catch (error) {
      console.error('Error al obtener datos de usuario', error);
    }
  }

  async agregarAlCarrito(producto: any) {
    const agregado = await this.carritoService.agregarAlCarrito(this.userData.idUsuario, producto.idProducto);
    if (agregado) {
      await this.mostrarToast('Producto agregado al carrito con éxito', 'success');
    } else {
      await this.mostrarToast('Error al agregar el producto al carrito', 'danger');
    }
  }

  async mostrarToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }

}
