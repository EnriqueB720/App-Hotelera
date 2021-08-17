import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HotelService } from 'src/app/tab1/hotel.service';
import { Habitacion } from 'src/app/tab1/tab1.model';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  habitacion: Habitacion;
  form: FormGroup;
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
    this.form = new FormGroup({
      numeroHabitacion: new FormControl(this.habitacion.numeroHabitacion, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      ubicacion: new FormControl(this.habitacion.ubicacion, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      tipo: new FormControl(this.habitacion.tipo, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      precioXNoche: new FormControl(this.habitacion.precioXNoche, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      descripcion: new FormControl(this.habitacion.descripcion, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      estado: new FormControl(this.habitacion.estado, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  ionViewWillEnter() {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('hash')){
          return;
        }
        const habitacionId = paramMap.get('hash');
        this.habitacion = this.hotelService.getHabitacion(habitacionId);
      }
    );
    this.form = new FormGroup({
      numeroHabitacion: new FormControl(this.habitacion.numeroHabitacion, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      ubicacion: new FormControl(this.habitacion.ubicacion, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      tipo: new FormControl(this.habitacion.tipo, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      precioXNoche: new FormControl(this.habitacion.precioXNoche, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      descripcion: new FormControl(this.habitacion.descripcion, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      estado: new FormControl(this.habitacion.estado, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }
  funcionEditar(){
    console.log(this.form);
    if(!this.form.valid){
      return;
    }
    console.log(this.habitacion.id);
    this.hotelService.editarHabitacion(
      this.habitacion.id,
      this.form.value.ubicacion,
      this.form.value.numeroHabitacion,
      this.form.value.tipo,
      this.form.value.precioXNoche,
      this.form.value.descripcion,
      this.form.value.estado,
      ''
    );
    this.router.navigate(['tabs/tab1/lista']);
  }
}
