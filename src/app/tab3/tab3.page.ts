import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseServiceService } from '../tabs/firebase-service.service';
import { Usuario} from './user.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{
  nombreUsuario = ' ';
  rol = ' ';
  numeroTel = '';
  img = '';
  usuario: Usuario[];
  constructor(public firebaseService: FirebaseServiceService,
              private router: Router) {}

  ionViewDidEnter(){
    if(this.nombreUsuario.length < 8 && this.rol === 'user'){
      document.getElementById('profile-title-user').setAttribute('style' , 'font-size: 23px; ');
    }
  }
  ionViewWillEnter(){
    if(this.firebaseService.userlogued[0] !== undefined){
      this.usuario =  this.firebaseService.userlogued;
      this.rol = this.usuario[0].rol;
      this.numeroTel = this.usuario[0].numeroTel.toString().substring(0,4) + '-' + this.usuario[0].numeroTel.toString().substring(4,8);
      this.nombreUsuario = this.usuario[0].nombreCompleto;
      this.img = this.usuario[0].img;
    }
  }
  logOut(){
    setTimeout(() =>{
      if(this.firebaseService.logOut()){
        this.usuario.pop();
        this.rol = ' ';
        this.nombreUsuario = ' ';
        this.numeroTel = ' ';
        this.img = '';
        this.router.navigate(['/tabs/tab1']);
      }else{
        return;
      }
    },500);

  }
}
