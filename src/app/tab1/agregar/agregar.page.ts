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
      id: new FormControl({
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      numeroHabitacion: new FormControl({
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      ubicacion: new FormControl({
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      tipo: new FormControl({
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      precioXNoche: new FormControl({
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      estado: new FormControl({
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      ocupacion: new FormControl({
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }
  funcionAgregar(){
    console.log(this.form);
    if(!this.form.valid){
      console.log('Nope');
      return;
    }
    this.hotelService.agregarHabitacion(
      this.form.value.id,
      this.form.value.ubicacion,
      this.form.value.numeroHabitacion,
      this.form.value.tipo,
      this.form.value.precioXNoche,
      this.form.value.estado,
      this.form.value.ocupacion
    );
    this.router.navigate(['tabs/tab1']);
  }
}
