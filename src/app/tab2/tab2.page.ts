import { Component, OnInit } from '@angular/core';
import { CitaService } from '../services/citas.service'; // Importa el servicio de citas
import Swal from 'sweetalert2';
import { UserData } from '../interface/userData';
import { PerfilService } from '../services/perfil.service';
import { Servicios } from '../interface/servicios';
import { ToastController, ModalController } from '@ionic/angular';
import { FeedbackComponent } from '../feedback/feedback.component';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  userData!: UserData;
  fechaCita: string = '';
  horaCita: string = '';
  telefono: string = '';
  correo: string = '';
  servicio: string = '';
  fechaCitaError: string = '';
  horaCitaError: string = '';
  dataServicio: Servicios[] = [];
  horariosDisponibles: { hora: string, ocupada: boolean }[] = [];

  constructor(private citaService: CitaService, private perfilService: PerfilService,  private toastController: ToastController, private modalController: ModalController ) {}

  ngOnInit() {
    this.obtenerDatosServicios();
  }

  ionViewWillEnter() {
    this.traerDatosUsuario();
    this.obtenerDatosServicios();
  }

  async traerDatosUsuario() {
    try {
      this.userData = await this.perfilService.obtenerDatosUsuario();
      console.log('Datos del usuario obtenidos:', this.userData);
    } catch (error) {
      console.error('Error al obtener datos de usuario', error);
    }
  }

  // Función para obtener los servicios disponibles
  obtenerDatosServicios() {
    this.citaService.obtenerServicios().subscribe(servicios=>{
      this.dataServicio = servicios;
      console.log(this.dataServicio)
    })
  }

  // Función que se ejecuta al cambiar la fecha seleccionada
  handleFechaCitaChange(fecha: string) {
    this.fechaCita = fecha;
    const selectedDate = new Date(fecha);
    const dayOfWeek = selectedDate.getDay();
    
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      //this.fechaCitaError = 'No abre los fines de semana';
      this.mostrarToast('No abre los fines de semana', 'warning', 'warning-outline');
    } else {
      this.fechaCitaError = '';
      this.obtenerHorariosPorFecha(); // Llama a la función para obtener los horarios disponibles
    }
  }

  // Función para obtener y mapear los horarios disponibles
  obtenerHorariosPorFecha() {
    if (this.fechaCita) {
      this.citaService.obtenerHorariosFecha(this.fechaCita)
        .then((horarios: string[]) => {
          // Mapear la respuesta en el select
          this.horariosDisponibles = horarios.map(hora => ({ hora, ocupada: false }));
        })
        .catch(error => {
          console.error('Error al obtener horarios:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al obtener los horarios. Inténtalo de nuevo más tarde.'
          });
        });
    }
  }

  // Función para enviar los datos al API y agendar la cita
  async handleSubmit() {
    if (this.fechaCitaError || this.horaCitaError || !this.servicio) {
      console.log('Formulario no válido');
      return;
    }

    const exito=await this.citaService.agregarCita(this.userData.idUsuario, parseInt(this.servicio), this.fechaCita, this.horaCita, this.userData.Telefono, this.userData.Correo);
    if (exito) {
      // Mostrar toast de éxito
      this.mostrarToast('Cita agendada exitosamente', 'success', 'checkmark-circle-outline');
      this.fechaCita = '';
      this.horaCita = '';
      this.servicio = '';

      this.abrirFeedbackModal();
    } else {
      // Mostrar toast de error
      this.mostrarToast('No se pudo agregar la cita. Inténtalo de nuevo más tarde', 'danger', 'close-circle-outline');
    }
    
  }
  // Función para mostrar el toast
  async mostrarToast(mensaje: string, color: string = 'success', icono: string = '') {

    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, // Duración en milisegundos
      color: color,
      position: 'top', // Posición del toast
      icon: icono
    });
    toast.present();
  }
  async abrirFeedbackModal() {
    const modal = await this.modalController.create({
      component: FeedbackComponent // Asegúrate de usar el nombre correcto de tu componente de feedback
    });
    return await modal.present();
  }
}
