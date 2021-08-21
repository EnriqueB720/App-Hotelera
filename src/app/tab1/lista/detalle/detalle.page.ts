import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/tab3/user.model';
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
  user: User[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private hotelService: HotelService,
    private router: Router,
    private alertCtrl: AlertController,
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
      this.user =  this.firebaseService.userlogued;
      this.rol = this.user[0].rol;
    }
  }

}
