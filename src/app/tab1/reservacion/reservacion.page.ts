import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { reservaciones } from 'src/app/tab2/reservaciones.model';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.page.html',
  styleUrls: ['./reservacion.page.scss'],
})
export class ReservacionPage implements OnInit {

  habitacionId: string;
  form: FormGroup;
  reservaciones: reservaciones[] = [];
  constructor(private activatedRoute: ActivatedRoute,
              private hotelService: HotelService,
              private alertCtrl: AlertController) {
     this.hotelService.getReservaciones();
   }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('hash')){
          return;
        }
         this.habitacionId = paramMap.get('hash');
      }
    );

    this.form = new FormGroup({
      fechaEntrada: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      fechaSalida: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
    })
  }

  reservar(){
    const FechaEntrada = new Date(this.form.value.fechaEntrada);
    const FechaSalida = new Date(this.form.value.fechaSalida);
    let j = 0;
    for(let i = 0; i < 1; i++){
      this.hotelService.getReservaciones();
    }

    if(FechaEntrada >= FechaSalida){
      this.alertCtrl.create({
        header: 'Oops!',
        message: 'Fecha de salida mayor a fecha de entrada',
        buttons: ['Aceptar']
      }).then(
        alertElement =>{
          alertElement.present();
        }
      );
      return;
    }

  this.reservaciones =  this.hotelService.getReservacion(this.habitacionId);


  if(this.reservaciones[0] === undefined) {
    j++;
    this.hotelService.agregarReservacion(this.habitacionId, FechaEntrada ,FechaSalida);
  }

   for(let i = 0; i < this.reservaciones.length; i++){
    const fechasDeEntrada = new Date(this.reservaciones[i].fechaEntrada);
    const fechasDeSalida = new Date(this.reservaciones[i].fechaSalida);
    if((FechaEntrada >= fechasDeEntrada && FechaEntrada <= fechasDeSalida ) ||
      (FechaSalida >= fechasDeEntrada && FechaSalida <= fechasDeSalida) ||
      ( fechasDeEntrada >= FechaEntrada && fechasDeSalida <= FechaSalida ) ||
      (fechasDeEntrada >= FechaEntrada && fechasDeSalida <= FechaSalida)){
        j++;
    }
   }
   if(j === 0){
    this.hotelService.agregarReservacion(this.habitacionId,FechaEntrada ,FechaSalida);
  }else{
    console.log("nope, no puede");
  }
  }

}
