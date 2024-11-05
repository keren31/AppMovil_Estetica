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
    misCitas: 'https://lacasadelmariscoweb.azurewebsites.net//api/CasaDelMarisco/ObtenerCitasCANPorId?idUsuario=',
    estadoCita: 'https://lacasadelmariscoweb.azurewebsites.net//api/CasaDelMarisco/CambiarEstadoCitas',
    traerCitaDetalle: 'https://lacasadelmariscoweb.azurewebsites.net//api/CasaDelMarisco/TraerCitaPorID', 
    actualizarCita: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/EditarCita'
  },
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
