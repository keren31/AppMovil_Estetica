import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CarritoPage } from '../carrito/carrito.page';  // Importa la página del carrito
import { NavController } from '@ionic/angular';  // Importa NavController
import { IonModal } from '@ionic/angular';
import { Products } from '../interface/productos';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  products:Products[]=[];
  constructor(private modalController: ModalController, private productosservice: ProductosService) {}  // Inyecta ModalController

  // Método para abrir el modal del carrito
  async openCarritoModal() {
    const modal = await this.modalController.create({
      component: CarritoPage,  // Carga la página CarritoPage dentro del modal
    });
    return await modal.present();
  }

  ngOnInit() {
    this.getTraerProductos()
  
  }

  getTraerProductos(){
    this.productosservice.getALLProducts()
    .subscribe(products=>{
      this.products=products;
      console.log(products)
    }
    )
  }

}
