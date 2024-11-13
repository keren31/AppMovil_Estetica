import { Component, OnInit } from '@angular/core';
import { UserData } from '../interface/userData';
import { PerfilService } from '../services/perfil.service';
import { Pedidos } from '../interface/pedidos';
import { PedidosService } from '../services/pedidos.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-mispedidos',
  templateUrl: './mispedidos.page.html',
  styleUrls: ['./mispedidos.page.scss'],
})
export class MispedidosPage implements OnInit {

  misPedidos: Pedidos = { Pedidos: [] };
  loading: boolean = true;
  userData!: UserData;
  isLoading: boolean = true;

  ionViewWillEnter() {
    this.datosUsuario();
  
  }
  

  constructor(private router: Router, private pedidosService: PedidosService, private perfilService: PerfilService) {}

  async ngOnInit() {
    
  }

  goToPerfil() {
    this.router.navigate(['/perfil']);  // Navega a la página de perfil (ajusta la ruta si es necesario)
  }

  async datosUsuario() {
    try {
      this.userData = await this.perfilService.obtenerDatosUsuario();
      console.log('Datos de usuario:', this.userData);

      // Verificación de idUsuario
      if (this.userData && this.userData.idUsuario) {
        this.cargarPedidos();
      } else {
        console.error('Error: idUsuario no está disponible en userData');
        this.loading = false;
      }

    } catch (error) {
      console.error('Error al obtener datos de usuario', error);
      this.loading = false;
    }
  }

  cargarPedidos() {
    if (!this.userData || !this.userData.idUsuario) {
      console.error('Error: idUsuario no está disponible');
      this.loading = false;
      return;
    }

    console.log('ID de usuario para cargar pedidos:', this.userData.idUsuario);
    this.pedidosService.getPedidos(this.userData.idUsuario).subscribe(
      (data) => {
        this.misPedidos = data || { Pedidos: [] }; // Asigna data o un objeto vacío si data es null o undefined
        this.loading = false;
        console.log('Pedidos cargados:', this.misPedidos);
      },
      (error) => {
        console.error('Error al cargar pedidos', error);
        this.loading = false;
      }
    );
  }
}
