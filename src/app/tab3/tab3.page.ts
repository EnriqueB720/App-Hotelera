import { Component } from '@angular/core';
import { FirebaseServiceService } from '../tabs/firebase-service.service';
import { User} from './user.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{
  username: string = " ";
  rol: string = " ";
  phoneNumber: string = "";
  user: User[];
  constructor(public firebaseService: FirebaseServiceService) {}

  ngOnInit() {
    if(this.username.length < 8 && this.rol !== ' '){
      document.getElementById("profile-title-user").setAttribute("style" , "font-size: 50px;");
      console.log("entro");
    }
  }
  ionViewWillEnter(){
    if(this.firebaseService.userlogued[0] !== undefined){
      this.user =  this.firebaseService.userlogued;
      this.rol = this.user[0].rol;
      this.phoneNumber = this.user[0].phoneNumber.toString().substring(0,4) + "-" + this.user[0].phoneNumber.toString().substring(4,8);
      this.username = this.user[0].fullName;
    }
  }
  logOut(){

  }
}
