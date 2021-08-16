import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HotelService } from '../../hotel.service';
import { Habitacion } from '../../tab1.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  habitacion: Habitacion;
  constructor(
    private activatedRoute: ActivatedRoute,
    private hotelService: HotelService,
    private router: Router,
    private alertCtrl: AlertController
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
  }
  ionViewWillEnter(){
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('hash')){
          return;
        }
        const habitacionId = paramMap.get('hash');
        this.habitacion = this.hotelService.getHabitacion(habitacionId);
      }
    );
  }

}
