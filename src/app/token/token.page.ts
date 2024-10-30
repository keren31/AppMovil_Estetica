import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.page.html',
  styleUrls: ['./token.page.scss'],
})
export class TokenPage implements OnInit {
  email : string = '';
  token : string = '';
  bol : boolean = false;

  constructor(private tokenService: TokenService, private router: Router) { }

  async ngOnInit() {
    this.email = await this.tokenService.traerEmail()
    console.log("Email:", this.email);
  }

  updateToken() {
    const digit1 = (document.getElementById('digit1') as HTMLInputElement).value;
    const digit2 = (document.getElementById('digit2') as HTMLInputElement).value;
    const digit3 = (document.getElementById('digit3') as HTMLInputElement).value;
    const digit4 = (document.getElementById('digit4') as HTMLInputElement).value;
    const digit5 = (document.getElementById('digit5') as HTMLInputElement).value;
    const digit6 = (document.getElementById('digit6') as HTMLInputElement).value;

    this.token = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`;
  }

  async verificarToken(){
    //console.log("Token:", this.token, "Email:",this.email);
    this.bol = await this.tokenService.validarToken(this.email, this.token);
    if(!this.bol){
      console.log('El token esta mal, revisa tu correo');
    }
    else{
      console.log('Perfecto, redireccionando a la siguiente parte');
      this.router.navigate(['/actualizarcontra']);

    }
  }

}
