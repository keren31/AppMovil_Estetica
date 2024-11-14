import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { MiscitasService } from '../services/miscitas.service';
import { PerfilService } from '../services/perfil.service';
import { UserData } from '../interface/userData';
import { MisCitas } from '../interface/miscitas';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { EditarCitaComponent } from '../editar-cita/editar-cita.component';
@Component({
  selector: 'app-miscitas',
  templateUrl: './miscitas.page.html',
  styleUrls: ['./miscitas.page.scss'],
})
export class MiscitasPage implements OnInit {
  userData!: UserData;
  citas: MisCitas[] = [];
  isLoading: boolean = true;
  isModalOpen = false;
  constructor(private router: Router, private perfilService: PerfilService, private miscitasService: MiscitasService, private toastController: ToastController,private modalController: ModalController) { }

  ngOnInit() {
    setTimeout(() => {
      this.traerDatosUsuario();
      this.cargarCitas();
    }, 500);
  }

  ionViewWillEnter() {
    this.traerDatosUsuario();
  }


  goToPerfil() {
    this.router.navigate(['/perfil']);  // Navega a la página de perfil (ajusta la ruta si es necesario)
  }

  async traerDatosUsuario() {
    try {
      this.userData = await this.perfilService.obtenerDatosUsuario();
      console.log('Datos del usuario obtenidos:', this.userData);
    } catch (error) {
      console.error('Error al obtener datos de usuario', error);
    }
  }

 // Función para cargar las citas del usuario específico, filtrar por estado "Activo" y ordenar por fecha desde la fecha actual en adelante
// Función para cargar las citas del usuario específico, filtrar por estado "Activo" y ordenar por fecha desde la fecha actual en adelante
// Función para cargar las citas del usuario específico, filtrar por estado "Activo" y ordenar por fecha desde la fecha actual en adelante
cargarCitas() {
  this.miscitasService.obtenerCitas(this.userData.idUsuario).subscribe(
    citas => {
      const now = new Date(); // Fecha y hora actual

      // Filtrar las citas por estado "Activo", fecha y hora en el futuro
      this.citas = citas
        .filter(cita => {
          const citaFecha = new Date(cita.Fecha);
          const citaHora = cita.Hora; // `cita.Hora` está en formato "HH:mm:ss"
          
          // Dividir la hora en horas, minutos y segundos
          const [hours, minutes, seconds] = citaHora.split(':').map(Number);
          
          // Establecer la hora de la cita en la fecha específica
          citaFecha.setHours(hours, minutes, seconds, 0);

          // Verificar que la cita esté en el futuro y no haya pasado la hora
          return (
            cita.Estado === 'Activo' &&
            (citaFecha > now || (citaFecha.getDate() === now.getDate() && citaFecha.getTime() > now.getTime()))
          );
        })
        .sort((a, b) => new Date(a.Fecha).getTime() - new Date(b.Fecha).getTime());

      console.log(this.citas);
      this.isLoading = false;
    },
    error => {
      console.error('Error al cargar las citas:', error);
      this.isLoading = false;
    }
  );
}



  async cancelarCita(idCita: number) {
    const exito = await this.miscitasService.CancelarReservacion(idCita);
  
    if (exito) {
      console.log("La cancelación fue exitosa.");
      this.mostrarToast("La cancelación ha sido exitosa", "success");
      this.cargarCitas();
    } else {
      console.log("No se pudo cancelar la cita.");
      this.mostrarToast("No se pudo cancelar la cita. Inténtelo más tarde", "warning");
    }
  }

  async openDetalleCitaModal(cita: number) {
    const modal = await this.modalController.create({
      component: EditarCitaComponent,  // Carga el componente dentro del modal
      componentProps: {
        'idCita': cita  // Pasa el servicio seleccionado al modal
      }
    });
    await modal.present();

    // Detecta si la actualización fue exitosa al cerrar el modal
    const { data: success } = await modal.onWillDismiss();
    if (success) {
      // Recarga las citas si la actualización fue exitosa
      this.cargarCitas();
    }
  }
   // Función para mostrar toast
   async mostrarToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      color: color,
      position: "top",
    });
    toast.present();
  }
}
