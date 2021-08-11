import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { HotelService } from './hotel.service';
import { Localidad, Tipo } from './tab1.model';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  public localidades: Localidad[];
  public tipos: Tipo[];
  constructor(private hotelService: HotelService) {}
  ngOnInit(){
    this.localidades = this.hotelService.getLocalidades();
    this.tipos = this.hotelService.getTipos();
  }
}
