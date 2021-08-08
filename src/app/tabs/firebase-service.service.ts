import { Injectable } from '@angular/core';
import { User } from '../tab3/user.model';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
private user: User[] = [];
  constructor(private httpClient: HttpClient) {
    this.user = this.getUser();
   }

  getUser(){
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
                restData[key].rol
                ));
            }
          }
          this.user = user;
          console.log(this.user[0].fullName);
        }
    );
    return [...this.user]
  }

  addUser(fullName: string, phoneNumber: string, email: string, password: string){
      const newUser = new User('',fullName, phoneNumber, email, password, 'admin');
      this.httpClient.post<{name: string}>("https://hotel-be340-default-rtdb.firebaseio.com/usuario.json", {
      ...newUser
    }).subscribe(
      (restData) =>{
        newUser.id = restData.name;
      }
    );
    this.user.push(newUser);
  }

}
