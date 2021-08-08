import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Habitacion, Localidad } from './tab1.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private habitaciones: Habitacion[] = [];
  private localidades: Localidad[] = [
    {
      nombre: 'Guanacaste',
      imagen: 'assets/images/Guanacaste.jpg'
    },
    {
      nombre: 'Puntarenas',
      imagen: 'assets/images/Puntarenas.jpg'
    },
    {
      nombre: 'Limon',
      imagen: 'assets/images/Limon.jpg'
    },
    {
      nombre: 'San Jose',
      imagen: 'assets/images/San Jose.jpg'
    },
  ];

  constructor(
    private httpClient: HttpClient
  ) { }
  agregarHabitacion(id: string, ubicacion: string, numeroHabitacion: number, imagenes: string[],
                    cantidadPersonas: number, cantidadCuartos: number, tipo: string, precioXNoche: number){
    const nuevaHabitacion = new Habitacion(
      id,
      ubicacion,
      numeroHabitacion,
      imagenes,
      cantidadPersonas,
      cantidadCuartos,
      tipo,
      precioXNoche
    );
    this.httpClient.post('https://hotel-105b0-default-rtdb.firebaseio.com/habitaciones.json', { ...nuevaHabitacion, id:  null });
  }
  getlocalidades(){
    return [...this.localidades];
  }
}
