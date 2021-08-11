export interface Habitacion{
  id: string;
  ubicacion: string;
  numeroHabitacion: number;
  tipo: string;
  precioXNoche: number;
  estado: string;
  ocupacion: string;
}
export class Habitacion{
  constructor(
    public id: string,
    public ubicacion: string,
    public numeroHabitacion: number,
    public tipo: string,
    public precioXNoche: number,
    public estado: string,
    public ocupacion: string
  ){}
}
export interface Localidad{
  nombre: string;
  imagen: string;
}
export interface Tipo{
  tipo: string;
  imagen: string;
}
