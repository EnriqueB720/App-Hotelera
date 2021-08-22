import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/tab3/user.model';
import { FirebaseServiceService } from 'src/app/tabs/firebase-service.service';
import { HotelService } from '../../hotel.service';
import { Habitacion } from '../../tab1.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  habitacion: Habitacion;
  rol = '';
  usuario: Usuario[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private hotelService: HotelService,
    public firebaseService: FirebaseServiceService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('hash')){
          return;
        }
        const habitacionId = paramMap.get('hash');
        this.habitacion = this.hotelService.getHabitacion(habitacionId);
      }
    );
    this.rol = '';
    if(this.firebaseService.userlogued[0] !== undefined){
      this.usuario =  this.firebaseService.userlogued;
      this.rol = this.usuario[0].rol;
    }
  }

}
