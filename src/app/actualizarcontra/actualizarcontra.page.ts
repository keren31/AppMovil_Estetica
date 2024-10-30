import { Component, OnInit } from '@angular/core';
import { ActualizarcontraService } from '../services/actualizarcontra.service';

@Component({
  selector: 'app-actualizarcontra',
  templateUrl: './actualizarcontra.page.html',
  styleUrls: ['./actualizarcontra.page.scss'],
})
export class ActualizarcontraPage implements OnInit {

  password : string = '';
  passwordVisible: boolean = false;
  passwordVerified : string = '';
  bol : boolean = false;

  constructor(private cambiarpwdService : ActualizarcontraService) { }

  ngOnInit() {
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  async verificarPassword(){
    console.log(this.password, 'HOLA' ,this.passwordVerified)
    this.bol = await this.cambiarpwdService.verificarPassword(this.password, this.passwordVerified);
    if(!this.bol){
      console.log('No contiene 8 caracteres, o no contiene algun caracter especial')
    }
    else{
      this.cambiarpwdService.cambiarPassword(this.password);
    }
  }

}
