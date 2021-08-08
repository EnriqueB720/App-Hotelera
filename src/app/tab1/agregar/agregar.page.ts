import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  form: FormGroup;
  constructor(
    private hotelService: HotelService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      numeroHabitacion: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      ubicacion: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      cantidadPersonas: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      cantidadCuartos: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      tipo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      precioXNoche: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }
  funcionAgregar(){
    console.log('que pedo');
  }
}
