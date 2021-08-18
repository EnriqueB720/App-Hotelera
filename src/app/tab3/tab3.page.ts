import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseServiceService } from '../tabs/firebase-service.service';
import { User} from './user.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{
  username = " ";
  rol = " ";
  phoneNumber = "";
  img = "";
  user: User[];
  constructor(public firebaseService: FirebaseServiceService,
              private router: Router) {}

  ngOnInit() {

  }
  ionViewDidEnter(){
    if(this.username.length < 8 && this.rol === 'user'){
      document.getElementById("profile-title-user").setAttribute("style" , "font-size: 23px; ");
    }
  }
  ionViewWillEnter(){
    if(this.firebaseService.userlogued[0] !== undefined){
      this.user =  this.firebaseService.userlogued;
      this.rol = this.user[0].rol;
      this.phoneNumber = this.user[0].phoneNumber.toString().substring(0,4) + "-" + this.user[0].phoneNumber.toString().substring(4,8);
      this.username = this.user[0].fullName;
      this.img = this.user[0].img;
    }
  }
  logOut(){
    setTimeout(() =>{
      if(this.firebaseService.LogOut()){
        this.user.pop();
        this.rol = " ";
        this.username = " ";
        this.phoneNumber = " ";
        this.img = "";
        this.router.navigate(['/tabs/tab1']);
      }else{
        return;
      }
    },500);

  }
}
