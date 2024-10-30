import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-miscitas',
  templateUrl: './miscitas.page.html',
  styleUrls: ['./miscitas.page.scss'],
})
export class MiscitasPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToPerfil() {
    this.router.navigate(['/perfil']);  // Navega a la página de perfil (ajusta la ruta si es necesario)
  }
}
