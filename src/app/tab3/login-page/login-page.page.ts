import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { FirebaseServiceService } from 'src/app/tabs/firebase-service.service';
import { User } from '../user.model';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  signInForm: FormGroup;
  user: User[];
  constructor(private router: Router,
    private firebase: FirebaseServiceService,
    private alertCtrl: AlertController,
    private navCRTL: NavController) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      email: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  logueIn(){
    if(!this.signInForm.valid) return;
    this.user = this.firebase.logIn(this.signInForm.value.email,this.signInForm.value.password);
    if(this.user[0].email !== this.signInForm.value.email ||
      this.user[0].password !== this.signInForm.value.password ){
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
