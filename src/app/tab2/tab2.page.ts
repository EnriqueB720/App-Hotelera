import { Component, OnInit } from '@angular/core';
import { HotelService } from '../tab1/hotel.service';
import { Habitacion } from '../tab1/tab1.model';
import { Usuario } from '../tab3/user.model';
import { FirebaseServiceService } from '../tabs/firebase-service.service';
import { reservaciones } from './reservaciones.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  usuario: Usuario[] = [];
  reservaciones: reservaciones[] = [];
  habitaciones: Habitacion[] = [];
  constructor(private hotelService: HotelService,
              private firebaseService: FirebaseServiceService) {
                this.hotelService.getReservaciones();
              }
ngOnInit(){
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for(let i = 0; i < this.reservaciones.length; i++){
    // eslint-disable-next-line arrow-body-style
    if(this.habitaciones.find((habitacion)=> {
      return habitacion.id === this.reservaciones[i].habitacion;}) === undefined){
        this.habitaciones.push(
          this.hotelService.getHabitacion(
            this.reservaciones[i].habitacion));
    }
  }
}
  ionViewWillEnter(){
    this.habitaciones = [];
    if(this.firebaseService.userlogued[0] !== undefined){
        this.usuario =  this.firebaseService.userlogued;
        this.reservaciones = this.hotelService.getReservacion(this.usuario[0].id);
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for(let i = 0; i < this.reservaciones.length; i++){
      // eslint-disable-next-line arrow-body-style
      if(this.habitaciones.find((habitacion)=> {
        return habitacion.id === this.reservaciones[i].habitacion;}) === undefined){
          this.habitaciones.push(
            this.hotelService.getHabitacion(
              this.reservaciones[i].habitacion));
      }
    }
    console.log(this.reservaciones);
    }
  }

  colorRandom(){
    const numero = Math.floor(Math.random() * 4) + 1;
    if(numero === 1){
      return 'azul';
    }else if (numero === 2){
      return 'verde';
    }else if(numero === 3){
      return 'amarillo';
    }else{
      return 'rojo';
    }
  }
}
