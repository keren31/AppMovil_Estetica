import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss']
})
export class Tab3Page {
  constructor(private modalController: ModalController) {}  // Inyecta ModalController

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  
}

