import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Habitacion, Localidad, Tipo } from './tab1.model';

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
  private tipos: Tipo[] = [
    {
      tipo: 'Suite',
      imagen: 'assets/images/Suite.jpg'
    },
    {
      tipo: 'Mediana',
      imagen: 'assets/images/Mediana.jpg'
    },
    {
      tipo: 'Pequeña',
      imagen: 'assets/images/Pequeña.jpg'
    }
  ];

  constructor(
    private httpClient: HttpClient
  ) {
    this.httpClient.get<{ [key: string]: Habitacion } >('https://hotel-105b0-default-rtdb.firebaseio.com/habitaciones.json')
    .subscribe(
      restData => {
        const habitaciones = [];
        for( const key in restData){
          if( restData.hasOwnProperty(key) ){
            habitaciones.push(new Habitacion(
              key,
              restData[key].ubicacion,
              restData[key].numeroHabitacion,
              restData[key].tipo,
              restData[key].precioXNoche,
              restData[key].estado,
              restData[key].ocupacion
            ));
          }
        }
        this.habitaciones = habitaciones;
      }
    );
  }
  agregarHabitacion(id: string, ubicacion: string, numeroHabitacion: number, tipo: string, precioXNoche: number,
                    estado: string, ocupacion: string){
    estado = 'Activo';
    ocupacion = 'Desocupada';
    const nuevaHabitacion = new Habitacion(
      id,
      ubicacion,
      numeroHabitacion,
      tipo,
      precioXNoche,
      estado,
      ocupacion
    );
    this.httpClient.post<{name: string}>('https://hotel-105b0-default-rtdb.firebaseio.com/habitaciones.json',
    {
      ...nuevaHabitacion,
      id: null
    }).subscribe(
      (restData) => {
        nuevaHabitacion.id = restData.name;
      }
    );
  }
  getTodos(){
    return [...this.habitaciones];
  }
  getLocalidades(){
    return [...this.localidades];
  }
  getTipos(){
    return [...this.tipos];
  }
}
