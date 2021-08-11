import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Habitacion } from '../tab1.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  habitaciones: Habitacion[];
  constructor(
    private hotelServicio: HotelService
  ) { }

  ngOnInit() {

  }
  ionViewWillEnter(){
    this.habitaciones = this.hotelServicio.getTodos();
  }
}
