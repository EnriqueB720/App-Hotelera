import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Habitacion, Localidad, Tipo } from './tab1.model';
import { finalize } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private habitaciones: Habitacion[] = [];
  private localidades: Localidad[] = [
    {
      nombre: 'Guanacaste',
      imagen: 'assets/images/Guanacaste.jpg'
    },
    {
      nombre: 'Puntarenas',
      imagen: 'assets/images/Puntarenas.jpg'
    },
    {
      nombre: 'Limon',
      imagen: 'assets/images/Limon.jpg'
    },
    {
      nombre: 'San Jose',
      imagen: 'assets/images/San Jose.jpg'
    },
  ];
  private tipos: Tipo[] = [
    {
      tipo: 'Suite',
      imagen: 'assets/images/Suite.jpg'
    },
    {
      tipo: 'Mediana',
      imagen: 'assets/images/Mediana.jpg'
    },
    {
      tipo: 'Pequeña',
      imagen: 'assets/images/Pequeña.jpg'
    }
  ];

  constructor(
    public storage: AngularFireStorage,
    private httpClient: HttpClient,
    private alertCtrl: AlertController
  ) {
    this.getTodos();
  }
  agregarHabitacion(id: string, ubicacion: string, numeroHabitacion: number, tipo: string, precioXNoche: number, descripcion: string,
                    estado: string, imagen: string, cantMaxPersonas: number){
    const nuevaHabitacion = new Habitacion(
      id,
      ubicacion,
      numeroHabitacion,
      tipo,
      precioXNoche,
      descripcion,
      estado,
      imagen,
      cantMaxPersonas
    );
    this.httpClient.post<{name: string}>('https://hotel-105b0-default-rtdb.firebaseio.com/habitaciones.json',
    {
      ...nuevaHabitacion,
      id: null
    }).subscribe(
      (restData) => {
        nuevaHabitacion.id = restData.name;
      }
    );
  }
  getTodos(){
    this.httpClient.get<{ [key: string]: Habitacion } >('https://hotel-105b0-default-rtdb.firebaseio.com/habitaciones.json')
    .subscribe(
      restData => {
        const habitaciones = [];
        for( const key in restData){
          if( restData.hasOwnProperty(key) ){
            habitaciones.push(new Habitacion(
              key,
              restData[key].ubicacion,
              restData[key].numeroHabitacion,
              restData[key].tipo,
              restData[key].precioXNoche,
              restData[key].descripcion,
              restData[key].estado,
              restData[key].imagen,
              restData[key].cantMaxPersonas
            ));
          }
        }
        this.habitaciones = habitaciones;
      }
    );
    return [...this.habitaciones];
  }
  getLocalidades(){
    return [...this.localidades];
  }
  getTipos(){
    return [...this.tipos];
  }
  getHabitacion(habitacionId: string){
    return {...this.habitaciones.find(
      habitacion => habitacionId === habitacion.id
    )};
  }
  getHabitacionesFiltradas(filtro){
    this.habitaciones = this.getTodos();
    return [...this.habitaciones.filter(
      (habitaciones)=>habitaciones.ubicacion === filtro || habitaciones.tipo === filtro)];
  }
  editarHabitacion(id: string, ubicacion: string, numeroHabitacion: number, tipo: string, precioXNoche: number, descripcion: string,
    estado: string, imagen: string, cantMaxPersonas: number) {
    const nuevaHabitacion = new Habitacion(
      id,
      ubicacion,
      numeroHabitacion,
      tipo,
      precioXNoche,
      descripcion,
      estado,
      imagen,
      cantMaxPersonas
    );
    this.httpClient.put<{name: string}>(`https://hotel-105b0-default-rtdb.firebaseio.com/habitaciones/${id}.json`, {
      ...nuevaHabitacion,
      id: null
    }).subscribe();
  }
  cargarNuevaImagen(file: any, path: string, nombre: string): Promise<string>{
    return new Promise( resolve => {
      const filePath = path + '/' + nombre;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe( res => {
            const downloadURL = res;
            resolve(downloadURL);
            return;
          });
        })
     )
    .subscribe();
    });
  }
  alertaInvalido(){
    this.alertCtrl.create({
      header: 'Error',
      message: 'Todos los campos del fomulario deben ser validos',
      buttons: ['Aceptar']
    }).then(
      alertElement =>{
        alertElement.present();
      }
    );
  }
  alertaExistente(){
    this.alertCtrl.create({
      header: 'Error',
      message: 'Habitacion ya existe',
      buttons: ['Aceptar']
    }).then(
      alertElement =>{
        alertElement.present();
      }
    );
  }
  validarExistencia(numeroHabitacion: number, ubicacion: string){
    for(let i =0; i < 50; i++){
      this.getTodos();
    }
    if(this.habitaciones === undefined){
      return true;
    }
    const DB = this.habitaciones.find(
      x => numeroHabitacion === x.numeroHabitacion && ubicacion === x.ubicacion
    );
    if(DB !== undefined){
      return false;
    }else{
      return true;
    }
  }
}
