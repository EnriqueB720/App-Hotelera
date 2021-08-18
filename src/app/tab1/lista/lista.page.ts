import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Habitacion } from '../tab1.model';
import { ActivatedRoute } from '@angular/router';
import { FirebaseServiceService } from 'src/app/tabs/firebase-service.service';
import { User } from 'src/app/tab3/user.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  habitaciones: Habitacion[] = [];
  rol = "";
  user: User[];
  constructor(
    private hotelServicio: HotelService,
    private activatedRoutes: ActivatedRoute,
    public firebaseService: FirebaseServiceService
  ) {}

  ngOnInit() {
    this.activatedRoutes.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('Filtro')){
          this.habitaciones = this.hotelServicio.getTodos();
        }else{
          const filtro = paramMap.get('Filtro');
          this.habitaciones = this.hotelServicio.getHabitacionesFiltradas(filtro);
        }
      }
    );
  }
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

    this.rol = "";
    if(this.firebaseService.userlogued[0] !== undefined){
      this.user =  this.firebaseService.userlogued;
      this.rol = this.user[0].rol;
    }
  }
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

