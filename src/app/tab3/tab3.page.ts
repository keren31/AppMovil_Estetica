import { Component, ViewChild,OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleservicioComponent } from '../detalleservicio/detalleservicio.component';
import { Servicios } from '../interface/servicios';
import { ServiciosService } from '../services/servicios.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss']
})
export class Tab3Page implements OnInit {
  
  servicios: Servicios []=[];

  constructor(private modalController: ModalController, private serviciosservices:ServiciosService) {}  // Inyecta ModalController

  // Método para abrir el modal del carrito
  async openDetalleServModal(servicio: Servicios) {
    const modal = await this.modalController.create({
      component: DetalleservicioComponent,  // Carga el componente dentro del modal
      componentProps: {
        'servicio': servicio  // Pasa el servicio seleccionado al modal
      }
    });
    return await modal.present();
  }

  ngOnInit() {
    this.getTraerServicios()
  }

 
  
  getTraerServicios(){
    this.serviciosservices.getALLServicios()
    .subscribe(ser=>{
      this.servicios=ser;
      console.log(ser)
    })
  }
  
}

