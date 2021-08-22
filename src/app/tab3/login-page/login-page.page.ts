import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseServiceService } from '../../tabs/firebase-service.service';
import { Usuario } from '../user.model';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  form: FormGroup;
  usuario: Usuario[] = [];
  constructor(private router: Router,
    private firebase: FirebaseServiceService,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      contrasena: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  logueIn(){
    if(!this.form.valid) {return;}
    this.usuario[0] = this.firebase.logIn(this.form.value.email,this.form.value.contrasena)[0];
    if(this.usuario[0] === undefined ){
        this.alertCtrl.create({
          header: 'Alerta',
          message: 'Correo electronico o Contraseña incorrectos',
          buttons:[{
             text: 'Aceptar',
            role: 'cancel'
         }]
        }).then(
          alertElement => {
            alertElement.present();
          }
        );
      }else{
        this.router.navigate(['/tabs/tab3']);
      }

  }
  //Funcion para regresar al tab principal
  regresar(){
    this.router.navigate(['/tabs/tab3']);
  }
}
