export class Habitacion{
  constructor(
    public id: string,
    public ubicacion: string,
    public numeroHabitacion: number,
    public tipo: string,
    public precioXNoche: number,
    public descripcion: string,
    public estado: string,
    public imagen: string,
    public cantMaxPersonas: number
  ){}
}
export interface Localidad{
  nombre: string;
  imagen: string;
  descripcion: string;
}
export interface Tipo{
  tipo: string;
  imagen: string;
  descripcion: string;
}
