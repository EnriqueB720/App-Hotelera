import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.page.html',
  styleUrls: ['./reservacion.page.scss'],
})
export class ReservacionPage implements OnInit {
  form: FormGroup;
  noches: number;
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      fechaEntrada: new FormControl(null, {
        validators: [Validators.required]
      }),
      fechaSalida: new FormControl(null, {
        validators: [Validators.required]
      }),
    });
  }

  deterNoche(){
    this.noches = 0;
    if(this.form.invalid) {return;}
    const ingreso = new Date(this.form.value.fechaEntrada);
    const salida = new Date(this.form.value.fechaSalida);
    if(ingreso <= salida){
    const diff = Math.abs(salida.getTime() - ingreso.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24)) - 1;
    this.noches = diffDays;
    console.log(diffDays);
    }else{
      this.noches = 0;
    }
  }
}
