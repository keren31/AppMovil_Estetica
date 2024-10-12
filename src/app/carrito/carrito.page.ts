import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';  
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  constructor(private modalController: ModalController, private router: Router) {}  // Inyecta el Router

  // Método para redirigir a la página de perfil
  goToProfile() {
    this.router.navigate(['/tabs/tab3']);  // Navega a la página de perfil (ajusta la ruta si es necesario)
  }

  async closeModal() {
    await this.modalController.dismiss();  // Cierra el modal
  }


  ngOnInit() {
  }
  count = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
  
  
}
