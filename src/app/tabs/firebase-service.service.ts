import { Injectable } from '@angular/core';
import { Usuario } from '../tab3/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
public userlogued: Usuario[] = [];
private usuarios: Usuario[] = [];
  constructor(private httpClient: HttpClient) {
    this.usuarios = this.getUsuarios();
   }

//Tomar todos los usuarios
  getUsuarios(){
    this.httpClient.get<{ [key: string]: Usuario }>('https://hotel-105b0-default-rtdb.firebaseio.com/usuario.json')
    .subscribe(
        restData => {
          const usuario = [];
          for (const key in restData){
            if(restData.hasOwnProperty(key)){
              usuario.push(new Usuario(
                key,
                restData[key].nombreCompleto,
                restData[key].numeroTel,
                restData[key].email,
                restData[key].contrasena,
                restData[key].rol,
                restData[key].img,
                ));
            }
          }
          this.usuarios = usuario;
        }
    );
    return [...this.usuarios];
  }

//Buscar usuario logueado
logIn(email: string, password: string){
  for(let i = 0; i <= 1; i++){
    this.getUsuarios();// Esto es para buscar los datos de firebase hasta el mas reciente
  }
  this.userlogued.pop();
  this.userlogued.push(this.usuarios.find(
    (usuario)=>
    {
       return usuario.email === email && usuario.contrasena === password;
    }
  ));
  return [...this.userlogued];
}

logOut(){
  this.userlogued.pop();
  return true;
}
//Registrar nuevo usuario
  agregarUsuario(nombreCompleto: string, numeroTel: string, email: string, contrsena: string){
     const imgID = Math.floor(Math.random() * 5) + 1;
      const nuevoUsuario = new Usuario('',nombreCompleto, numeroTel, email, contrsena, 'user',imgID.toString());

      if(this.usuarios.find(
        usuarios =>usuarios.email === email
      ) === undefined){
      this.httpClient.post<{name: string}>('https://hotel-105b0-default-rtdb.firebaseio.com/usuario.json', {
       ...nuevoUsuario
       }).subscribe(
       (restData) =>{
         nuevoUsuario.id = restData.name;
       }
        );
        this.usuarios.push(nuevoUsuario);
        return true;
      }else{
        return false;
      }
  }

}
