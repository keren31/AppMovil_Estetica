import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PerfilService } from '../services/perfil.service';
import { UserData } from '../interface/userData';
import { ToastController } from '@ionic/angular';
import { CarritoService } from '../services/carrito.service';
import { Carrito } from '../interface/carrito';
import { GooglePayEventsEnum, PaymentFlowEventsEnum, PaymentSheetEventsEnum, Stripe } from '@capacitor-community/stripe';
import { environment } from 'src/environments/environment';
import { first, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Direccion } from '../interface/pedidos';
import { PedidosService } from '../services/pedidos.service';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  isStripeModalOpen = false; // Variable para controlar el estado del modal
  userData!: UserData;
  productosCarrito: Carrito[] = [];
  iva=0;
  envio=38;
  total=0;
  totalCarritoObtenido=0;
  setloading: boolean=true;
  data: any= {}

  direcciones: Direccion[] = [];

  constructor(private modalController: ModalController, 
    private perfilService: PerfilService, 
    private toastController: ToastController,
    private carritoService: CarritoService,
    private http : HttpClient,
    private pedidos: PedidosService
  ) {
    Stripe.initialize({
      publishableKey: environment.stripe.publishableKey,
    });
  }  // Inyecta el Router

  async closeModal() {
    await this.modalController.dismiss();  // Cierra el modal
  }


  ngOnInit() {
    setTimeout(() => {
      this.traerDatosUsuario();
      this.obtenerProductoCarrito();
    }, 500);
   
  }
  ionViewWillEnter() {
    this.traerDatosUsuario();
    this.obtenerProductoCarrito();
  }

   // Función para abrir el modal de Stripe
   openStripeModal() {
    this.isStripeModalOpen = true;
  }
   // Función para cerrar el modal de Stripe
   closeStripeModal() {
    this.isStripeModalOpen = false;
  }


  //modificaciones
  async traerDatosUsuario() {
    try {
      this.userData = await this.perfilService.obtenerDatosUsuario();
      this.perfilService.traerDirecciones(this.userData.idUsuario).subscribe({
        next: (direcciones) => {
          if (direcciones && direcciones.length > 0) {
            this.direcciones = direcciones.slice(-1); 
            console.log('Direcciones obtenidas:', this.direcciones);
          } else {
            console.warn('No hay direcciones disponibles para mostrar.');
            this.direcciones = [];
          }
        },
        error: (error) => {
          console.error('Error al obtener direcciones:', error);
          setTimeout(() => this.traerDatosUsuario(), 2000); // Reintentar después de 2 segundos si falla
        },
      });
      console.log('Datos del usuario obtenidos:', this.userData);
    } catch (error) {
      console.error('Error al obtener datos de usuario', error);
    }
  }

  async agregarAlCarrito(producto: any) {
    const agregado = await this.carritoService.agregarAlCarrito(this.userData.idUsuario, producto.idProducto);
    if (agregado) {  
      this.obtenerProductoCarrito(); // Refresca el carrito
    } else {
      await this.mostrarToast('Ha ocurrido un error al agregar el producto', 'danger');
    }
  }

  async eliminarDelCarrito(producto: any) {
    const agregado = await this.carritoService.eliminardelCarrito(this.userData.idUsuario, producto.idProducto, producto.idCarritoProductos);
    if (agregado) {  
      this.obtenerProductoCarrito(); // Refresca el carrito
    } else {
      await this.mostrarToast('Ha ocurrido un error', 'danger');
    }
  }

  async obtenerProductoCarrito() {
    if (!this.userData || !this.userData.idUsuario) {
      console.error('Error: idUsuario no está disponible');
    
      return;
    }

    try {
      const data = await lastValueFrom(this.carritoService.obtenerProductoCarrito(this.userData.idUsuario));
      this.productosCarrito = data;
      
      this.totalCarritoObtenido = data.reduce((total, item) => {
        return total + item.PrecioUnitario * item.Cantidad;
      }, 0);

      this.iva= this.totalCarritoObtenido*0.16;

      this.total=this.totalCarritoObtenido+this.iva+this.envio;
      console.log(this.total)

      console.log('Carrito cargado:', this.productosCarrito);
      console.log('Total calculado:', this.total);

      this.data = {
        name: this.userData.Nombre,
        email: this.userData.Correo,
        amount: this.total*100,
        currency: 'mxn',
      };
      console.log('Datos de pago inicializados:', this.data);

      this.setloading=false;
        
   
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
      this.setloading=true;
     
    }
  }

  async mostrarToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }

  httpPost(body:any) {
    return this.http.post<any>(environment.api + 'payment-sheet', body).pipe(first());
  }

  splitAndJoin(paymentIntent: any) {
    const result = paymentIntent.split('').slice(0, 2).join('');
    console.log(result);
    return result;
  }
  async paymentSheet() {
    if (!this.data.amount) {
      console.error('Error: datos de pago incompletos');
      return;
    }
    
    console.log(this.userData.idUsuario, this.productosCarrito[0].idCarrito,this.total ,this.direcciones[0].DireccionID)
    try {
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
        console.log('PaymentSheetEventsEnum.Completed');
      });

      const data$ = this.httpPost(this.data);
      const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(data$);

      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        merchantDisplayName: 'EsteticaPlaton',
      });

      const result = await Stripe.presentPaymentSheet();
      if (result && result.paymentResult === PaymentSheetEventsEnum.Completed) {
        this.splitAndJoin(paymentIntent);
        console.log(this.userData.idUsuario, this.productosCarrito[0].idCarrito,this.total ,this.direcciones[0].DireccionID)
        this.pedidos.crearPedidos(this.userData.idUsuario, this.productosCarrito[0].idCarrito,this.total ,this.direcciones[0].DireccionID);

      }
    } catch (e) {
      console.log(e);
    }
  }
  async googlePay() {
    const isAvailable = Stripe.isGooglePayAvailable().catch(() => undefined);
    if (isAvailable === undefined) {
      return;
    }
  
    Stripe.addListener(GooglePayEventsEnum.Completed, () => {
      console.log('GooglePayEventsEnum.Completed');
    });
    
    const data$ = this.httpPost(this.data);

    const { paymentIntent } = await lastValueFrom(data$);

    await Stripe.createGooglePay({
      paymentIntentClientSecret: paymentIntent,

      paymentSummaryItems: [{
        label: 'QuickDH',
        amount: 1099.00
      }],
      merchantIdentifier: 'QuickDH',
      countryCode: 'MX',
      currency: 'MXN',
    });

    const result = await Stripe.presentGooglePay();
    if (result.paymentResult === GooglePayEventsEnum.Completed) {
      this.splitAndJoin(paymentIntent);
    }
  }

  async paymentFlow() {
    /* 
    With PaymentFlow, you can make payments in two steps flow. 
    When the user presses the submit button, 
    the system only gets the card information, 
    and puts it in a pending state. 
    After that, when the program executes the confirmation method, 
    the payment is executed. In most cases, 
    it is used in a flow that is interrupted by a final confirmation screen.
    */
    // be able to get event of PaymentFlow
    Stripe.addListener(PaymentFlowEventsEnum.Completed, () => {
      console.log('PaymentFlowEventsEnum.Completed');
    });
    
    // const data = new HttpParams({
    //   fromObject: this.data
    // });
  
    // Connect to your backend endpoint, and get every key.
    // const data$ = this.http.post<{
    //   paymentIntent: string;
    //   ephemeralKey: string;
    //   customer: string;
    // }>(environment.api + 'payment-sheet', data).pipe(first());

    const data$ = this.httpPost(this.data);

    const {paymentIntent, ephemeralKey, customer} = await lastValueFrom(data$);

    // Prepare PaymentFlow with CreatePaymentFlowOption.
    await Stripe.createPaymentFlow({
      paymentIntentClientSecret: paymentIntent,
      // setupIntentClientSecret: setupIntent,
      customerEphemeralKeySecret: ephemeralKey,
      customerId: customer,
      merchantDisplayName: 'Jeziel'
    });

    // Present PaymentFlow. *Not completed yet.*
    const presentResult = await Stripe.presentPaymentFlow();
    console.log('presentResult: ', presentResult); // { cardNumber: "●●●● ●●●● ●●●● **" }

    // Confirm PaymentFlow. Completed.
    const confirmResult = await Stripe.confirmPaymentFlow();
    console.log('confirmResult: ', confirmResult);
    if (confirmResult.paymentResult === PaymentFlowEventsEnum.Completed) {
      // Happy path
      this.splitAndJoin(paymentIntent);
    }
  }

  
  
}
