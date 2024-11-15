import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UserData } from '../interface/userData';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  userData!:UserData;
  constructor(private router: Router, private perfilService:PerfilService) {}  // Inyecta el Router

  ionViewWillEnter() {
    this.datosUsuario();
  }


  // Método para redirigir a la página de perfil
  goToHome() {
    this.router.navigate(['/tabs/tab1']);  // Navega a la página de perfil (ajusta la ruta si es necesario)
  }

  irAMisPedidos() {
    this.router.navigate(['/mispedidos']);
  }

  irAMisCitas() {
    this.router.navigate(['/miscitas']);
  }

  ngOnInit() {
    this.datosUsuario();
  }

  async datosUsuario() {
    this.userData = await this.perfilService.obtenerDatosUsuario();
  
  }


  cerrarSesion(){
    this.perfilService.cerrarSesion();
  }
}
