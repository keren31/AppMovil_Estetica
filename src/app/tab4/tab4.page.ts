import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CarritoPage } from '../carrito/carrito.page';  // Importa la página del carrito
import { NavController } from '@ionic/angular';  // Importa NavController
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private modalController: ModalController) {}  // Inyecta ModalController

  // Método para abrir el modal del carrito
  async openCarritoModal() {
    const modal = await this.modalController.create({
      component: CarritoPage,  // Carga la página CarritoPage dentro del modal
    });
    return await modal.present();
  }

  ngOnInit() {
  }

}
