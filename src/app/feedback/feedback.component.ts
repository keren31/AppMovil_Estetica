import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {
  constructor(private modalController: ModalController) {}

  // Función para cerrar el modal
  closeFeedback() {
    this.modalController.dismiss();
  }
}
