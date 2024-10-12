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

}
