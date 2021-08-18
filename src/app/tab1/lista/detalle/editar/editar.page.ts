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
  imagen = 'assets/images/Pequeña.jpg';
  nuevaImagen = '';
  nuevoArchivo = '';
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
      }),
      cantMaxPersonas: new FormControl(this.habitacion.cantMaxPersonas, {
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
      }),
      cantMaxPersonas: new FormControl(this.habitacion.cantMaxPersonas, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }
  async funcionEditar(){
    if(!this.form.valid){
      return;
    }
    if(this.habitacion.numeroHabitacion !== this.form.value.numeroHabitacion || this.habitacion.ubicacion !== this.form.value.ubicacion){
      if(!this.hotelService.validarExistencia(this.form.value.numeroHabitacion, this.form.value.ubicacion)){
        this.hotelService.alertaExistente();
        return;
      }
    }
    this.imagen = this.habitacion.imagen;
    if(this.nuevaImagen !== ''){
      const path = 'Imagenes';
      const nombre = this.form.value.numeroHabitacion + this.form.value.ubicacion;
      const res = await this.hotelService.cargarNuevaImagen(this.nuevoArchivo, path, nombre);
      this.imagen = res;
    }
    this.hotelService.editarHabitacion(
      this.habitacion.id,
      this.form.value.ubicacion,
      this.form.value.numeroHabitacion,
      this.form.value.tipo,
      this.form.value.precioXNoche,
      this.form.value.descripcion,
      this.form.value.estado,
      this.imagen,
      this.form.value.cantMaxPersonas
    );
    this.router.navigate(['tabs/tab1/']);
  }
  cargarImagen(event: any){
    if (event.target.files && event.target.files[0]){
      this.nuevoArchivo = event.target.files[0];
      const lector = new FileReader();
      lector.onload = ((imagen) => {
        this.nuevaImagen = imagen.target.result as string;
      });
      lector.readAsDataURL(event.target.files[0]);
    }
  }
}
