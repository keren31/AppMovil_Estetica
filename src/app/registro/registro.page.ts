import { Component } from '@angular/core';
import { RegistroService } from '../services/registro.service';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  nombre = '';
  apellidoP = '';
  apellidoM = '';
  email = '';
  password = '';
  password2 = '';
  telefono = '';
  fechaNac = '';
  showPassword = false;
  showPassword2 = false;

  // Propiedades para la barra de fortaleza de contraseña
  passwordStrength = 0; // Valor de 0 a 100
  passwordStrengthText = '';
  mostrarBarraFortaleza = false; 

  constructor(
    private registroService: RegistroService,
    private toastController: ToastController,
    private nav: NavController
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordVisibility2() {
    this.showPassword2 = !this.showPassword2;
  }

   // Evaluar la fortaleza de la contraseña
   evaluarFortalezaPassword(password: string) {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;

    this.passwordStrength = strength;

    if (strength < 40) {
      this.passwordStrengthText = 'Débil';
    } else if (strength < 80) {
      this.passwordStrengthText = 'Media';
    } else {
      this.passwordStrengthText = 'Fuerte';
    }
  }

  // Muestra la barra cuando el usuario enfoca el campo de contraseña
  onPasswordFocus() {
    this.mostrarBarraFortaleza = true;
  }

  // Oculta la barra cuando el usuario sale del campo de contraseña
  onPasswordBlur() {
    this.mostrarBarraFortaleza = false;
  }

   // Nueva función para validar campos vacíos
   validarCampos(): boolean {
    if (!this.nombre || !this.apellidoP || !this.apellidoM || !this.email || !this.password || !this.password2 || !this.telefono || !this.fechaNac) {
      this.showToast('Todos los campos son obligatorios', 'danger');
      return false;
    }
    if (this.password !== this.password2) {
      this.showToast('Las contraseñas no coinciden', 'danger');
      return false;
    }
    return true;
  }

  async registrarUsuario() {
    // Validar campos antes de proceder
    if (!this.validarCampos()) {
      return;
    }
    // Verificar si el correo ya existe antes de registrar el usuario
    const correoDisponible = await this.verificarCorreo();
    if (!correoDisponible) {
      this.showToast('Este correo ya está registrado', 'danger');
      return;
    }

    // Preparar datos del formulario
    const data = new FormData();
    data.append('Nombre', this.nombre);
    data.append('ApellidoPaterno', this.apellidoP);
    data.append('ApellidoMaterno', this.apellidoM);
    data.append('Correo', this.email);
    data.append('Telefono', this.telefono);
    data.append('Contrasena', this.password);
    data.append('FechaNacimiento', this.fechaNac);

    // Llamada al servicio de registro
    this.registroService.registrarUsuario(data).subscribe(
      async () => {
        // Mostrar mensaje de éxito
        this.showToast('Registro exitoso', 'success');
        // Redirigir al usuario a la página de login o principal
        this.nav.navigateForward('/login')
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
        this.showToast('Error al registrar usuario, intenta nuevamente', 'danger');
      }
    );
  }

  async verificarCorreo() {
    try {
      const response = await this.registroService.verificarCorreo(this.email).toPromise();
      return response !== 'Correo Existe';
    } catch (error) {
      console.error('Error al verificar correo:', error);
      this.showToast('Error al verificar el correo', 'danger');
      return false;
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}
