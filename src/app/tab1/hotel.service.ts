import { Injectable } from '@angular/core';
import { Habitacion } from './tab1.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private habitaciones: Habitacion[] = [
    {
      id: 'entry-1',
      ubicacion: 'Guanacaste',
      numeroHabitacion: 1,
      imagenes: [
                  'https://ar.zoetis.com/_locale-assets/mcm-portal-assets/publishingimages/especie/caninos_perro_img.png',
                  'https://ar.zoetis.com/_locale-assets/mcm-portal-assets/publishingimages/especie/caninos_perro_img.png'
                ],
      cantidadPersonas: 4,
      cantidadCuartos: 2,
      tipo: 'mediana',
      precioXNoche: 100000
    },
    {
      id: 'entry-2',
      ubicacion: 'Puntarenas',
      numeroHabitacion: 1,
      imagenes: [
                  'https://ar.zoetis.com/_locale-assets/mcm-portal-assets/publishingimages/especie/caninos_perro_img.png',
                  'https://ar.zoetis.com/_locale-assets/mcm-portal-assets/publishingimages/especie/caninos_perro_img.png'
                ],
      cantidadPersonas: 4,
      cantidadCuartos: 2,
      tipo: 'mediana',
      precioXNoche: 50000
    },
    {
      id: 'entry-3',
      ubicacion: 'Limon',
      numeroHabitacion: 1,
      imagenes: [
                  'https://ar.zoetis.com/_locale-assets/mcm-portal-assets/publishingimages/especie/caninos_perro_img.png',
                  'https://ar.zoetis.com/_locale-assets/mcm-portal-assets/publishingimages/especie/caninos_perro_img.png'
                ],
      cantidadPersonas: 4,
      cantidadCuartos: 2,
      tipo: 'mediana',
      precioXNoche: 70000
    },
    {
      id: 'entry-4',
      ubicacion: 'San Jose',
      numeroHabitacion: 1,
      imagenes: [
                  'https://ar.zoetis.com/_locale-assets/mcm-portal-assets/publishingimages/especie/caninos_perro_img.png',
                  'https://ar.zoetis.com/_locale-assets/mcm-portal-assets/publishingimages/especie/caninos_perro_img.png'
                ],
      cantidadPersonas: 4,
      cantidadCuartos: 2,
      tipo: 'mediana',
      precioXNoche: 800000
    },
  ];

  constructor() { }
}
