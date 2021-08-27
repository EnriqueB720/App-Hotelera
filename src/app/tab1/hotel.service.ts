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
  //Crear localidades disponibles
  private localidades: Localidad[] = [
    {
      nombre: 'Guanacaste',
      imagen: 'assets/images/Guanacaste.jpg',
      descripcion: 'Guanacaste tiene infinitas playas, con aguas tranquilas y muchas otras para practicar deportes acuaticos.'
    },
    {
      nombre: 'Puntarenas',
      imagen: 'assets/images/Puntarenas.jpg',
      descripcion: 'Puntareas, aquí puedes encontrar Paseo de los Turistas, el Parque Marino del Pacífico. '
                    +'Además puedes encontrar hermosas playas en toda la provincia.'
    },
    {
      nombre: 'Limon',
      imagen: 'assets/images/Limon.jpg',
      descripcion: 'Limón posee el más alto porcentaje de tierras protegidas en Costa Rica, y posee una extensa variedad de flora y '
                    +'fauna. Sin mencionar las hermosas playas del caribe.'
    },
    {
      nombre: 'San Jose',
      imagen: 'assets/images/San Jose.jpg',
      descripcion: 'San José, capital de Costa Rica, se ubica en la región del Valle Central. La ciudad se distingue por sus '
                    +'edificios coloniales españoles, como el decorado Teatro Nacional de Costa Rica.'
    },
  ];
  //Crear tipos de habitacion disponible
  private tipos: Tipo[] = [
    {
      tipo: 'Suite',
      imagen: 'assets/images/Suite.jpg',
      descripcion: 'Habitación grande con todos los lujos que te puedes imaginar.'
    },
    {
      tipo: 'Mediana',
      imagen: 'assets/images/Mediana.jpg',
      descripcion: 'Habitación mediana con todo lo necesario para una familia que desea discfrutar un gran rato.'
    },
    {
      tipo: 'Pequeña',
      imagen: 'assets/images/Pequeña.jpg',
      descripcion: 'Habitación perfecta para una pareja que desea disfrutar una buenas vacaciones.'
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
    //Se guarda la habitacion en firebase por metodo post
    this.httpClient.post<{name: string}>('https://hotel-105b0-default-rtdb.firebaseio.com/habitaciones.json',
    {
      ...nuevaHabitacion,
      id: null
    }).subscribe(
      (restData) => {
        //Se guarda el hash de firebase en el espacio id del objeto
        nuevaHabitacion.id = restData.name;
      }
    );
  }
  getTodos(){
    //Se llaman a todas las habitaciones por metodo get
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
        //Se guardan las habitaciones de firebase en un arreglo de habitaciones
        this.habitaciones = habitaciones;
      }
    );
    return [...this.habitaciones];
  }
  //Llamar localidades disponibles
  getLocalidades(){
    return [...this.localidades];
  }
  //Llamar tipos disponibles
  getTipos(){
    return [...this.tipos];
  }
  //Llamar una habitacion especifica
  getHabitacion(habitacionId: string){
    return {...this.habitaciones.find(
      habitacion => habitacionId === habitacion.id
    )};
  }
  //filtro de habitaciones por tipo o bien por ubicacion
  getHabitacionesFiltradas(filtro){
    this.habitaciones = this.getTodos();
    return [...this.habitaciones.filter(
      (habitaciones)=>habitaciones.ubicacion === filtro || habitaciones.tipo === filtro)];
  }
  //Editar habitacion especifica
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
  //Cargar una imagen en el form
  cargarNuevaImagen(file: any, path: string, nombre: string): Promise<string>{
    //Promesa para que cargue la imagen
    return new Promise( resolve => {
      //Se guarda el path del archivo
      const filePath = path + '/' + nombre;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe( res => {
            //Se almacena la url de la imagen en firebase
            const downloadURL = res;
            resolve(downloadURL);
            return;
          });
        })
     )
    .subscribe();
    });
  }
  //Alerta si los espacios del formulario no son validos
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
  //Alerta si la habitacion existe
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
  //Validar si una habitacion ya existe
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
