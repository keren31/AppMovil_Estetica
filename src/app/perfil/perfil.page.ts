import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private router: Router) {}  // Inyecta el Router

  // Método para redirigir a la página de perfil
  goToHome() {
    this.router.navigate(['/tabs/tab1']);  // Navega a la página de perfil (ajusta la ruta si es necesario)
  }


  ngOnInit() {
  }

}
