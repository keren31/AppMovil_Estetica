import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalleservicio',
  templateUrl: './detalleservicio.component.html',
  styleUrls: ['./detalleservicio.component.scss'],
})
export class DetalleservicioComponent  implements OnInit {


  @Input() servicio: any;  // Recibe el servicio desde el moda
  
  constructor(private modalController: ModalController, private router: Router, private navCtrl: NavController) { }
  goToTab2() {
    this.closeModal()
    this.navCtrl.navigateRoot('/tabs/tab2');  // Navega a tab2
  }

  async closeModal() {
    await this.modalController.dismiss();  // Cierra el modal
  }


  ngOnInit() {}

  

}
