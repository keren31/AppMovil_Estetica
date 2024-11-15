import { Component, OnInit } from '@angular/core';
import { UserDataStorageService } from './services/user-data-storage.service';
import { UserData } from './interface/userData';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private navController: NavController,
    private userDataStorage: UserDataStorageService,
    private loadingController: LoadingController // Agrega el controlador de carga
  ) {}

  async ngOnInit() {
    this.showLoadingSpinner();
    setTimeout(() => {
      this.checkUserSession();
    }, 1000);
  }

  async showLoadingSpinner() {
    const loading = await this.loadingController.create({
      message: 'Cargando datos...',
      spinner: 'crescent', // Tipo de spinner, puedes cambiarlo si prefieres otro estilo
      cssClass: 'fullscreen-loader', // Clase CSS personalizada
      backdropDismiss: false // Evita que se cierre al tocar fuera
    });
    await loading.present();
  }

  async checkUserSession() {
    try {
      // Obtén los datos del usuario desde el almacenamiento
      const userData: UserData = await this.userDataStorage.traerDatosUsuario();

      console.log('Datos de usuario al iniciar:', userData);

      if (userData) {
        // Si existe userData, redirige al home
        this.navController.navigateRoot('/tabs/tab1');
      }
    } finally {
      // Oculta el spinner
      this.loadingController.dismiss();
    }
  }
}
