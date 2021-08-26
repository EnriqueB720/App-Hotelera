import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { reservaciones } from 'src/app/tab2/reservaciones.model';
import { Usuario } from 'src/app/tab3/user.model';
import { FirebaseServiceService } from 'src/app/tabs/firebase-service.service';
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
  usuario: Usuario[];
  constructor(private activatedRoute: ActivatedRoute,
              private hotelService: HotelService,
              private alertCtrl: AlertController,
              private Router: Router,
              public firebaseService: FirebaseServiceService) {
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
    )
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
    //Valida si el uusario esta logueado para hacer la reservacion
    if(this.firebaseService.userlogued[0] !== undefined){
      this.usuario =  this.firebaseService.userlogued;
    }else{
      this.Router.navigate(['tabs/tab3/login-page']);
      return;
    }

    //Valida el formulario
    if(!this.form.valid){
      this.alertCtrl.create({
        header: 'Sin fechas!',
        message: 'Por favor, rellene el formulario',
        buttons: ['Aceptar']
      }).then(
        alertElement =>{
          alertElement.present();
        }
      );
      return;
    }

    const FechaEntrada = new Date(this.form.value.fechaEntrada);
    const FechaSalida = new Date(this.form.value.fechaSalida);
    let j = 0;
    for(let i = 0; i < 1; i++){
      this.hotelService.getReservaciones();
    }
    //Valida que la fecha de entrada sea menor que la de salida
    if(FechaEntrada >= FechaSalida){
      this.alertCtrl.create({
        header: 'Oops!',
        message: 'Fecha de salida mayor a fecha de entrada.',
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
    this.hotelService.agregarReservacion(this.habitacionId, FechaEntrada ,FechaSalida,this.usuario[0].id);
    this.Router.navigate([`tabs/tab1/lista/${this.habitacionId}/reservacion/confirmacion`]);
    return;
  }else{
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
  }
   if(j === 0){
    this.hotelService.agregarReservacion(this.habitacionId,FechaEntrada ,FechaSalida, this.usuario[0].id);
    this.Router.navigate([`tabs/tab1/lista/${this.habitacionId}/reservacion/confirmacion`]);
  }else{
    this.alertCtrl.create({
      header: 'Oops!',
      message: 'Fecha reservada actualmente.',
      buttons: ['Aceptar']
    }).then(
      alertElement =>{
        alertElement.present();
      }
    );
  }
  }

}
