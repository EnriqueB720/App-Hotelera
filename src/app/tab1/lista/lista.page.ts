import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Habitacion } from '../tab1.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  habitaciones: Habitacion[] = [];
  constructor(
    private hotelServicio: HotelService
  ) {}

  ngOnInit() {
    this.habitaciones = this.hotelServicio.getTodos();
  }
  ionViewWillEnter(){
    setTimeout(() => {
      this.habitaciones = this.hotelServicio.getTodos();
    }, 150);
  }
  doRefresh(event){
    setTimeout(() => {
      this.habitaciones = this.hotelServicio.getTodos();
      event.target.complete();
    }, 1000);
  }
}

