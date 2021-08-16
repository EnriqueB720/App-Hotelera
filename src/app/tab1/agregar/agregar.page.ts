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
      ubicacion: new FormControl({
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      tipo: new FormControl({
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      precioXNoche: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      descripcion: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }
  funcionAgregar(){
    console.log(this.form);
    if(!this.form.valid){
      return;
    }
    this.hotelService.agregarHabitacion(
      '0',
      this.form.value.ubicacion,
      this.form.value.numeroHabitacion,
      this.form.value.tipo,
      this.form.value.precioXNoche,
      this.form.value.descripcion,
      'Activo'
    );
    this.hotelService.getTodos();
    this.router.navigate(['tabs/tab1']);
  }
}
