import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private serviceLogin:LoginService,private toastController: ToastController,private router: Router) { }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;  // Cambia el estado de visibilidad
  }

  ngOnInit() {
  }


  async onSubmit() {
    if(this.email.length >0 && this.password.length >0){
      var result = await this.login();
      if (result === true) {
        console.log('Redirigiendo a /tabs');  
      } else {
        await this.presentToast('Verifique los datos por favor');
      }
    }else{
      await this.presentToast('Capture sus datos correctamete')
      console.log(this.email)
      console.log(this.password)
    }
  }

  async login(): Promise<boolean>{
    this.bol = await this.serviceLogin.login(this.email, this.password);
    console.log('Resultado de login:', this.bol); 
    if(this.bol){
      console.log('aqui se obtendran los datos del usuario')
      this.router.navigate(['/tabs']);
      return true;
    }
    else {
      await this.presentToast('Verifique los datos por favor');
      return false; // Retorna false si el login falla
    }
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
