import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private router: Router) {}  // Inyecta el Router

  // Método para redirigir a la página de perfil
  goToProfile() {
    this.router.navigate(['/perfil']);  // Navega a la página de perfil (ajusta la ruta si es necesario)
  }

  goToTab2() {
    this.router.navigate(['/tabs/tab2']); // Asegúrate de que '/tab2' sea la ruta correcta
  }

  goToTab3() {
    this.router.navigate(['/tabs/tab3']); // Asegúrate de que '/tab3' sea la ruta correcta
  }

  goToTab4() {
    this.router.navigate(['/tabs/tab4']); // Asegúrate de que '/tab2' sea la ruta correcta
  }

}
