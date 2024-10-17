import { Component, OnInit } from '@angular/core';

import { LoginService } from '../services/login.service';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  passwordVisible: boolean = false; 
  bol : boolean = false;
  constructor(private serviceLogin:LoginService,private toastController: ToastController) { }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;  // Cambia el estado de visibilidad
  }

  ngOnInit() {
  }

  async long(){
    
    this.bol = await this.serviceLogin.verificarCorreoEstetica(this.email);
    if (!this.bol){
      console.log('No encontramos una cuenta asociada a ese correo');
    }
    else{
      console.log('aqui se obtendran los datos del usuario')
    }
    
  }

  onSubmit() {
    if(this.email.length >0 && this.password.length >0){
      var result = this.login(); 
    }else{
      console.log('Captura tus datos correctamente por favor');
      console.log(this.email)
      console.log(this.password)
    }
  }

  async login(){
    this.bol = await this.serviceLogin.login(this.email, this.password);
    if(this.bol){
      console.log('aqui se obtendran los datos del usuario')
    }
    else await this.presentToast('Verifique los datos por favor') 
  }

  
  async presentToast(mesa:string) {
    const toast = await this.toastController.create({
      message: mesa,
      duration: 1500,
      position: 'top',
      color: 'danger',
      icon: 'alert-circle',
    });

    await toast.present();
  }

}
