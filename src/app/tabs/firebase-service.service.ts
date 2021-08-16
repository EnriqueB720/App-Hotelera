import { Injectable } from '@angular/core';
import { User } from '../tab3/user.model';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
private users: User[] = [];
public userlogued: User[] = [];
  constructor(private httpClient: HttpClient) {
    this.users = this.getUsers();
   }

//Tomar todos los usuarios
  getUsers(){
    this.httpClient.get<{ [key: string]: User }>("https://hotel-be340-default-rtdb.firebaseio.com/usuario.json")
    .subscribe(
        restData => {
          const user = [];
          for (const key in restData){
            if(restData.hasOwnProperty(key)){
              user.push(new User(
                key,
                restData[key].fullName,
                restData[key].phoneNumber,
                restData[key].email,
                restData[key].password,
                restData[key].rol,
                restData[key].img
                ));
            }
          }
          this.users = user;
        }
    );
    return [...this.users];
  }

//Buscar usuario logueado
logIn(email: string, password: string){
  for(let i = 0; i <= 1; i++){
    this.getUsers();// Esto es para buscar los datos de firebase hasta el mas reciente
  }
  this.userlogued.pop();
  this.userlogued.push(this.users.find(
    (usuario)=>{
   return usuario.email === email && usuario.password === password;
  }
  ));
  return [...this.userlogued];

}
LogOut(){
  this.userlogued.pop();
  return true;
}
//Registrar nuevo usuario
  addUser(fullName: string, phoneNumber: string, email: string, password: string){
      const newUser = new User('',fullName, phoneNumber, email, password, 'user','0');

      if(this.users.find(
        usuarios =>{
          return usuarios.email === email;
        }
      ) === undefined){
      this.httpClient.post<{name: string}>("https://hotel-be340-default-rtdb.firebaseio.com/usuario.json", {
       ...newUser
       }).subscribe(
       (restData) =>{
         newUser.id = restData.name;
       }
        );
        this.users.push(newUser);
        return true;
      }else{
        return false;
      }
  }

}
