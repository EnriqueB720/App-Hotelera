import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../tab3/user.model';
import { FirebaseServiceService } from '../tabs/firebase-service.service';
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
  public user: Usuario[];
  rol = '';
  constructor(private hotelService: HotelService,
              public firebaseService: FirebaseServiceService) {}
  ngOnInit(){
    this.localidades = this.hotelService.getLocalidades();
    this.tipos = this.hotelService.getTipos();
  }
  ionViewWillEnter(){
    this.rol = '';
    //Verificar si el usuario se encuentra logueado
    if(this.firebaseService.userlogued[0] !== undefined){
      this.user =  this.firebaseService.userlogued;
      this.rol = this.user[0].rol;
    }
  }
}
