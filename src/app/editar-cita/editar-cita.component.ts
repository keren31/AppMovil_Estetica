import { Component, OnInit, Input } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { MisCitasDetalle } from '../interface/miscitas';
import { MiscitasService } from '../services/miscitas.service';
import { CitaService } from '../services/citas.service';
import { Servicios } from '../interface/servicios';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-cita',
  templateUrl: './editar-cita.component.html',
  styleUrls: ['./editar-cita.component.scss'],
})
export class EditarCitaComponent implements OnInit {
  @Input() idCita: number = 0;
  citaDetalle!: MisCitasDetalle;
  dataServicio: Servicios[] = [];
  servicio: string = '';
  fechaCita: string = '';
  horaCita: string = '';
  horaCitaAntes: string='';
  horariosDisponibles: { hora: string, ocupada: boolean }[] = [];

  constructor(
    private modalController: ModalController,
    private miscitasService: MiscitasService,
    private citaService: CitaService,
    private toastController: ToastController,
  ) {}

  ngOnInit() {
    this.obtenerDetalleCita();
    this.obtenerDatosServicios();
  }

  async closeModal(success: boolean = false) {
    await this.modalController.dismiss(success);  // Cierra el modal y pasa el éxito
  }
  

  async handleSubmit() {
    console.log(this.idCita);
    console.log(this.servicio);
    console.log(this.fechaCita);

    console.log(this.citaDetalle.Telefono);
    const horaFinal = this.horaCita === '' ? this.horaCitaAntes : this.horaCita;
    console.log(horaFinal);
    const exito=await this.miscitasService.actualizarCita(this.idCita,parseInt(this.servicio),this.fechaCita,horaFinal,this.citaDetalle.Telefono);
    console.log(exito)
    if (exito) {
      // Mostrar toast de éxito
      this.mostrarToast('Cita actualizada exitosamente', 'success', 'checkmark-circle-outline');
      this.closeModal(true);
    } else {
      // Mostrar toast de error
      this.mostrarToast('No se pudo agregar la cita. Inténtalo de nuevo más tarde', 'danger', 'close-circle-outline');
    }
    
  }

  obtenerDetalleCita() {
    console.log(this.idCita);
    this.miscitasService.obtenerDetalleCita(this.idCita).subscribe((citaDetalle) => {
      this.citaDetalle = citaDetalle;
      this.citaDetalle.fecha = citaDetalle.fecha.split('T')[0];
      this.fechaCita = this.citaDetalle.fecha.toString(); 
      this.servicio = this.citaDetalle.servicio_id.toString();  
      this.horaCitaAntes=this.citaDetalle.Hora;
      console.log(this.horaCita);
      this.obtenerHorariosPorFecha();
    });
  }

  obtenerDatosServicios() {
    this.citaService.obtenerServicios().subscribe((servicios) => {
      this.dataServicio = servicios;
      console.log(this.dataServicio);
    });
  }

  handleFechaCitaChange(fecha: string) {
    this.fechaCita = fecha;
    const selectedDate = new Date(fecha);
    const dayOfWeek = selectedDate.getDay();

    if (dayOfWeek === 5 || dayOfWeek === 6) {
      this.mostrarToast('No abre los fines de semana', 'warning', 'warning-outline');
    } else {
      // Limpiar los horarios antes de obtener los nuevos
      this.horariosDisponibles = [];
      this.obtenerHorariosPorFecha();
    }
  }

  obtenerHorariosPorFecha() {
    if (this.fechaCita) {
      this.citaService
        .obtenerHorariosFecha(this.fechaCita)
        .then((horarios: string[]) => {
          // Actualizar los horarios disponibles con la nueva fecha
          this.horariosDisponibles = horarios.map((hora) => ({ hora, ocupada: false }));
          console.log('Horarios disponibles para la fecha seleccionada:', this.horariosDisponibles);
        })
        .catch((error) => {
          console.error('Error al obtener horarios:', error);
        });
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
}
