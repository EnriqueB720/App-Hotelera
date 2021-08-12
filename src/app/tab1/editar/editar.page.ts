import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  form: FormGroup;
  constructor() { }

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

}
