import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Habitacion } from '../tab1.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  habitaciones: Habitacion[] = [];
  constructor(
    private hotelServicio: HotelService,
    private activatedRoutes: ActivatedRoute
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
    )
  }
  ionViewWillEnter(){
    setTimeout(() => {
      this.activatedRoutes.paramMap.subscribe(
        paramMap => {
          if(!paramMap.has('Filtro')){
            this.habitaciones = this.hotelServicio.getTodos();
          }else{
            const filtro = paramMap.get('Filtro');
            setTimeout(() => {
              this.habitaciones = this.hotelServicio.getHabitacionesFiltradas(filtro);
            }, 100);
          }
        }
      )
    }, 150);
  }
  doRefresh(event){
    setTimeout(() => {
      this.activatedRoutes.paramMap.subscribe(
        paramMap => {
          if(!paramMap.has('Filtro')){
            this.habitaciones = this.hotelServicio.getTodos();
          }else{
            const filtro = paramMap.get('Filtro');
            this.habitaciones = this.hotelServicio.getHabitacionesFiltradas(filtro);
          }
        }
      )
      event.target.complete();
    }, 1000);
  }
}

