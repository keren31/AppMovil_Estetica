import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserData } from '../interface/userData';
import { NavController } from '@ionic/angular';
import { PerfilService } from '../services/perfil.service';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  userData!: UserData;

  responses = [
    { question: 4, rating: '' }, // Pregunta sobre facilidad
    { question: 5, rating: '' }, // Pregunta sobre satisfacción
  ];

  constructor(private modalController: ModalController,private perfilService:PerfilService,
    private nav:NavController) {}

  async ngOnInit() {
    await this.traerDatosUsuario();
  }
  cerrarModal() {
    // Cierra el modal actual y navega al tab1
    this.modalController.dismiss().then(() => {
      this.nav.navigateRoot('/tabs/tab1');
    });
  }
  selectAnswer(index: number, value: string) {
    this.responses[index].rating = value;
  }
    
  async traerDatosUsuario() {
    try {
      this.userData = await this.perfilService.obtenerDatosUsuario();
      console.log('Datos de usuario obtenidos:', this.userData);
    } catch (error) {
      console.error('Error al obtener datos de usuario:', error);
    }
  }
  // Función para cerrar el modal
  closeFeedback() {
    this.modalController.dismiss();
  }

  async enviarFeedback() {
    try {
      // Iterar sobre las respuestas
      for (const response of this.responses) {
        if (response.rating) {
          // Llamar a la función para enviar cada respuesta
          await this.perfilService.enviarRespuesta(response.rating, response.question, this.userData.idUsuario);
        } else {
          console.warn(`La pregunta ${response.question} no tiene una respuesta seleccionada.`);
        }
      }
  
      // Si todas las respuestas se enviaron correctamente
      console.log('Respuestas enviadas correctamente:', this.responses);
      this.closeFeedback(); // Cerrar el modal
      this.nav.navigateForward('/tabs/tab1'); // Redirigir al usuario
    } catch (error) {
      console.error('Error al enviar el feedback:', error);
      alert('Ocurrió un error al enviar el feedback.');
    }
  }
  
}
