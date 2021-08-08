export interface Habitacion{
  id: string;
  ubicacion: string;
  numeroHabitacion: number;
  imagenes: string[];
  cantidadPersonas: number;
  cantidadCuartos: number;
  tipo: string;
  precioXNoche: number;
}
export class Habitacion{
  constructor(
    public id: string,
    public ubicacion: string,
    public numeroHabitacion: number,
    public imagenes: string[],
    public cantidadPersonas: number,
    public cantidadCuartos: number,
    public tipo: string,
    public precioXNoche: number
  ){}
}
export interface Localidad{
  nombre: string;
  imagen: string;
}
