// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiEndpoints: {
    loginUrl: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/Login',
    traerDatosUsuario: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerUsuario?Correo=',
    verificarCorreo: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/VerificarCorreo', 
    mostrarproductosUrl: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerProductosCan',
    mostrarServiciosUrl: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/ObtenerServiciosCAN',
    obtenerPedidos: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerPedidosCAN?UsuarioID=',
    recuperarcontra: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/ActualizarTokenEstetica',
    actualizarToken: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/ActualizarToken',
    verificarToken: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/VerificarToken',
    actializarContra: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/RecuperarContrasena',
    horariosDisponibles: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/ObtenerHorasDisponibles?fecha=',
    agendarCita: 'https://lacasadelmariscoweb.azurewebsites.net//api/CasaDelMarisco/AgregarCita?usuario_id=', 
    misCitas: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/ObtenerCitasCANPorId?idUsuario=',
    estadoCita: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/CambiarEstadoCitas',
    traerCitaDetalle: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerCitaPorID', 
    actualizarCita: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/EditarCita',
    traerDirecciones: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerDirecciones?UsuarioID=',
    agregarProductoCarrito: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/AgregarProductosCarritoCAN',
    quitarProductos: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/QuitarProductosCarritoCAN',
    traerCarritoID: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerCarritoPorUsuarioCAN?idUsuario=',
    agregarPedido: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/AgregarPedidoCAN',
    traerProductoPorId: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerProductoPorIDCAN',
    verificarCorreoRegistro: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/VerificarCorreo?Correo=',
    agregarUsuarios: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/AgregarUsuarios?Nombre=',
  },
  stripe:{
    publishableKey: 'pk_test_51QJNwTL7B8edvQLxcXAxjJTDJ5jD1BtDxSJbDam9BK8YRnnHaYkUttd3DqQyNcsNSqNRI61mHFVlyqhjb4pLxcY300c85IWxmt',
    secretKey: 'sk_test_51QJNwTL7B8edvQLx2zjx6YPNHdlqk8MfavP3hP1j4gdkg2zYWvx5qDSs2ODcvaJf2h9HPXow56AcqiJJxjbORYuG00VyJwNd0s'
  },
  api: 'https://lacasadelmariscoweb.azurewebsites.net/api/EsteticaApi/'
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
