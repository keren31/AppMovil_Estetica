export interface MisCitas {
    IdCita: number;
    UsuarioId: number;
    Nombre: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    NombreServicio: string;
    Fecha: Date; // Si necesitas manejarla como fecha, puedes usar `Date` en lugar de `string`
    Correo: string;
    Telefono: string;
    Hora: string;
    Estado: string;
  }

  export interface MisCitasDetalle {
    servicio_id: number;
    fecha: String; // Si necesitas manejarla como fecha, puedes usar `Date` en lugar de `string`
    Telefono: string;
    Hora: string;
  }
