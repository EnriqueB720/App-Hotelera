import { Component, OnInit, ɵLifecycleHooksFeature } from '@angular/core';
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
  nuevaImagen = '';
  nuevoArchivo = '';
  validez = '';
  imagen = 'assets/images/Mediana.jpg';
  constructor(
    private hotelService: HotelService,
    private router: Router,
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
      }),
      cantMaxPersonas: new FormControl({
        updateOn: 'blur',
        validators: [Validators.required]
      }),
    });
  }
  //Agregar una nueva habitacion
  async funcionAgregar(){
    this.hotelService.getTodos();
    //Verificar si el formulario es valido
    if(!this.form.valid){
      this.hotelService.alertaInvalido();
      return;
    }
    //Verificar si la habitacion ya existe en la base de datos
    if(!this.hotelService.validarExistencia(this.form.value.numeroHabitacion, this.form.value.ubicacion)){
      this.hotelService.alertaExistente();
      return;
    }
    //Agregar Imagen
    if(this.nuevaImagen !== ''){
      const path = 'Imagenes';
      const nombre = this.form.value.numeroHabitacion + this.form.value.ubicacion;
      const res = await this.hotelService.cargarNuevaImagen(this.nuevoArchivo, path, nombre);
      this.imagen = res;
    }
    this.hotelService.agregarHabitacion(
      '0',
      this.form.value.ubicacion,
      this.form.value.numeroHabitacion,
      this.form.value.tipo,
      this.form.value.precioXNoche,
      this.form.value.descripcion,
      'Activo',
      this.imagen,
      this.form.value.cantMaxPersonas
    );
    this.router.navigate(['tabs/tab1']);
  }
  //Cargar imagen en el formulario
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

