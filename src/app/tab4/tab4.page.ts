import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CarritoPage } from '../carrito/carrito.page';  // Importa la página del carrito
import { NavController } from '@ionic/angular';  // Importa NavController
import { IonModal } from '@ionic/angular';
import { Products } from '../interface/productos';
import { ProductosService } from '../services/productos.service';
import { CarritoService } from '../services/carrito.service';
import { ToastController } from '@ionic/angular';
import { UserData } from '../interface/userData';
import { PerfilService } from '../services/perfil.service';
import { GooglePayEventsEnum, PaymentFlowEventsEnum, PaymentSheetEventsEnum, Stripe } from '@capacitor-community/stripe';
import { environment } from 'src/environments/environment';
import { first, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  userData!: UserData;
  products:Products[]=[];
  filteredProducts: Products[] = []; // Productos después de aplicar el filtro
  searchQuery: string = ''; // Para el texto de búsqueda
  selectedCategory: number | null = null;
  categories = [
    { id: 1, name: 'Jugetes', icon: 'tennisball-outline' },
    { id: 2, name: 'Collares', icon: 'medal-outline' },
    { id: 3, name: 'Accesorios', icon: 'heart-circle-outline' },
    { id: 4, name: 'correas', icon: 'paw-outline' }
    
  ];
  productoDetalle: Products | undefined;
  data: any= {}
  constructor(    private http : HttpClient, private modalController: ModalController, private productosservice: ProductosService, private carritoService: CarritoService, private toastController: ToastController, private perfilService: PerfilService,) {
    Stripe.initialize({
      publishableKey: environment.stripe.publishableKey,
    });
  }  // Inyecta ModalController

  // Método para abrir el modal del carrito
  async openCarritoModal() {
    const modal = await this.modalController.create({
      component: CarritoPage,  // Carga la página CarritoPage dentro del modal
    });
    return await modal.present();
  }

  ngOnInit() {
    this.getTraerProductos()
    this.traerDatosUsuario();
    this.data = {
      name: 'EsteticaPlaton',
      email: 'EsteticaPlaton@gmail.com',
      amount: 10000,
      currency: 'mxn',
    };
  
  }

  ionViewWillEnter() {
    this.traerDatosUsuario();
  }

  getTraerProductos(){
    this.productosservice.getALLProducts()
    .subscribe(products=>{
      this.products=products;
      this.filteredProducts = products; // Inicialmente, muestra todos los productos
      console.log(products)
    }
    )
  }

  filterByCategory(categoryId: number | null) {
    this.selectedCategory = categoryId;
    if (categoryId === null) {
      this.filteredProducts = this.products; // Muestra todos los productos si no hay categoría seleccionada
    } else {
      this.filteredProducts = this.products.filter(product => product.idCategoria === categoryId);
    }
  }

  // Función para filtrar productos por nombre según el texto ingresado
  filterProducts() {
    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.Nombre.toLowerCase().includes(query)
    );
  }

  //aqui empiza modificaciones
  async traerDatosUsuario() {
    try {
      this.userData = await this.perfilService.obtenerDatosUsuario();
      console.log('Datos del usuario obtenidos:', this.userData);
    } catch (error) {
      console.error('Error al obtener datos de usuario', error);
    }
  }

  openProductDetail(product: any): void {
    this.productoDetalle = product;
  }

  cerrarModal(): void {
    this.productoDetalle = undefined;

  }


  async agregarAlCarrito(producto: any) {
    console.log(producto.idProducto)
    console.log(this.userData.idUsuario)
    const agregado = await this.carritoService.agregarAlCarrito(this.userData.idUsuario, producto.idProducto);
    console.log(agregado)
    if (agregado) {
      await this.mostrarToast('Producto agregado al carrito con éxitoso', 'success', 'checkmark-circle-outline');
    } else {
      await this.mostrarToast('Error al agregar el producto al carrito', 'danger', 'close-circle-outline');
    }
  }

  async mostrarToast(message: string, color: string, icono: string = '') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top',
      icon: icono
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
        //console.log(this.userData.idUsuario, this.carrito[0].idCarrito,this.total ,this.direcciones[0].DireccionID)
        //this.pedidosS.crearPedidos(this.userData.idUsuario, this.carrito[0].idCarrito,this.total ,this.direcciones[0].DireccionID);
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
