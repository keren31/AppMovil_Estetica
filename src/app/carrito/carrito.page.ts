import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';  
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PerfilService } from '../services/perfil.service';
import { UserData } from '../interface/userData';
import { ToastController } from '@ionic/angular';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  userData!: UserData;
  productosCarrito: any[] = [];

  constructor(private modalController: ModalController, 
    private router: Router, 
    private perfilService: PerfilService, 
    private toastController: ToastController,
    private carritoService: CarritoService
  ) {}  // Inyecta el Router

  async closeModal() {
    await this.modalController.dismiss();  // Cierra el modal
  }


  ngOnInit() {
    setTimeout(() => {
      this.traerDatosUsuario();
      
    }, 500);
  }
  ionViewWillEnter() {
    this.traerDatosUsuario();
  }

  
  count = 0;
  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
  //modificaciones
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
      this.obtenerProductoCarrito(); // Refresca el carrito
    } else {
      await this.mostrarToast('Ha ocurrido un error al agregar el producto', 'danger');
    }
  }

  async obtenerProductoCarrito() {
    this.productosCarrito = await this.carritoService.obtenerProductoCarrito(this.userData.idUsuario);
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
