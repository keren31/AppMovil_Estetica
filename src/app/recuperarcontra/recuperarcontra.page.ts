import { Component, OnInit } from '@angular/core';
import { RecuperarcontraService } from '../services/recuperarcontra.service';

@Component({
  selector: 'app-recuperarcontra',
  templateUrl: './recuperarcontra.page.html',
  styleUrls: ['./recuperarcontra.page.scss'],
})
export class RecuperarcontraPage implements OnInit {
  email: string = '';
  bol : boolean = false;

  constructor(private recuperarService: RecuperarcontraService) { }
  

  ngOnInit() {
  }
  async onSubmit() {
    if(this.email.length > 0){
      this.bol = await this.recuperarService.verificarCorreo(this.email);  
      if (!this.bol){
        console.log('No encontramos una cuenta asociada a ese correo');
      }
      else{
        await this.recuperarService.guardarEmail(this.email);
      }
    }else{
      console.log('Captura tus datos correctamente por favor');
    }
  }

}
