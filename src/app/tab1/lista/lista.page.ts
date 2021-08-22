import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Habitacion } from '../tab1.model';
import { ActivatedRoute } from '@angular/router';
import { FirebaseServiceService } from 'src/app/tabs/firebase-service.service';
import { Usuario } from 'src/app/tab3/user.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage{
  habitaciones: Habitacion[] = [];
  rol = '';
  usuario: Usuario[];
  constructor(
    private hotelServicio: HotelService,
    private activatedRoutes: ActivatedRoute,
    public firebaseService: FirebaseServiceService
  ) {}

  ionViewWillEnter(){
    setTimeout(() => {
      this.activatedRoutes.paramMap.subscribe(
        paramMap => {
          if(!paramMap.has('Filtro')){
            setTimeout(() =>
            {this.habitaciones = this.hotelServicio.getTodos();
            },50);
          }else{
            const filtro = paramMap.get('Filtro');
            setTimeout(() => {
              this.habitaciones = this.hotelServicio.getHabitacionesFiltradas(filtro);
            }, 50);
          }
        }
      );
    }, 150);

    this.rol = '';
    if(this.firebaseService.userlogued[0] !== undefined){
      this.usuario =  this.firebaseService.userlogued;
      this.rol = this.usuario[0].rol;
    }
  }
  //Refresher (Ionic Component) por si la habitacion nueva o una modificacion no se visualiza
  doRefresh(event){
    setTimeout(() => {
      this.activatedRoutes.paramMap.subscribe(
        paramMap => {
          if(!paramMap.has('Filtro')){
            setTimeout(() =>
            {this.habitaciones = this.hotelServicio.getTodos();
            },50);
          }else{
            const filtro = paramMap.get('Filtro');
            this.habitaciones = this.hotelServicio.getHabitacionesFiltradas(filtro);
          }
        }
      );
      event.target.complete();
    }, 1000);
  }
}

