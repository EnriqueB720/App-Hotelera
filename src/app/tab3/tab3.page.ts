import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from '../tabs/firebase-service.service';
import { User} from './user.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  username: string = "";
  rol: string = " ";
  user: User[];
  constructor(public firebaseService: FirebaseServiceService) {}

  ngOnInit() {
    setTimeout(()=>{
     // this.username =  this.user[0].fullName;
    },2000);
  }
  ionViewWillEnter(){
    if(this.firebaseService.userlogued[0] !== undefined){
      this.user =  this.firebaseService.userlogued;
      this.rol = this.user[0].rol;
      this.username = this.user[0].fullName;
    }
  }
}
