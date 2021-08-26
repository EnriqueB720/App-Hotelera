import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private activatedRoute: ActivatedRoute,private hotelService: HotelService) {
    this.reservaciones = this.hotelService.getReservaciones(this.habitacionId);
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
    this.reservaciones = this.hotelService.getReservaciones(this.habitacionId);
    let j = 0;
    // FechaEntrada.setHours(0);
    // FechaSalida.setHours(0);
    // FechaSalida.setDate(FechaSalida.getDate() + 1);
    // FechaEntrada.setDate(FechaEntrada.getDate() + 1);

    this.reservaciones =  this.hotelService.getReservaciones(this.habitacionId);

  console.log(this.reservaciones);
  if(this.reservaciones[0] === undefined) {
    j++;
    this.hotelService.agregarReservacion(this.habitacionId, FechaEntrada ,FechaSalida);
  }

   for(let i = 0; i < this.reservaciones.length; i++){
    const fechasDeEntrada = new Date(this.reservaciones[i].fechaEntrada);
    const fechasDeSalida = new Date(this.reservaciones[i].fechaSalida);
    // fechasDeEntrada.setDate(fechasDeEntrada.getDate()+1);
    // fechasDeSalida.setDate(fechasDeSalida.getDate()+1);

    if((FechaEntrada >= fechasDeEntrada && FechaEntrada <= fechasDeSalida ) ||
      (FechaSalida >= fechasDeEntrada && FechaSalida <= fechasDeSalida) ||
      ( fechasDeEntrada >= FechaEntrada && fechasDeSalida <= FechaSalida ) ||
      (fechasDeEntrada >= FechaEntrada && fechasDeSalida <= FechaSalida)){
      console.log("no puede");
      j++;
    }else{
      console.log('si puede');
    }
   }

   if(j === 0){
     console.log("entro");
    this.hotelService.agregarReservacion(this.habitacionId,FechaEntrada ,FechaSalida);
  }else{
    console.log("nope, no puede");
  }
  }

}
