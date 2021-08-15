import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseServiceService } from '../../tabs/firebase-service.service';
import { AlertController} from '@ionic/angular';



@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
})
export class RegisterPagePage implements OnInit {
  signUpForm: FormGroup;
  errorControl: Number= 0;
  constructor(private router: Router,
              private firebase: FirebaseServiceService,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      fullName: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      phoneNumber: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required,Validators.maxLength(8)]
      }),
      email: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(8)]
      }),
      confirmedPassword: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  newUser(){
    if(!this.signUpForm.valid) return;
    if(this.signUpForm.value.confirmedPassword !== this.signUpForm.value.password){
        this.alertCtrl.create({
           header: 'Alerta',
           message: 'Confirme su contraseña correctamente',
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
       if(this.firebase.addUser(
          this.signUpForm.value.fullName,
          this.signUpForm.value.phoneNumber,
          this.signUpForm.value.email,
          this.signUpForm.value.password
        ) === false){
          this.errorControl = 1;
        }else{
          this.router.navigate(['/tabs/tab3/login-page']);
        }
     }
  }
  //Funcion para regresar al tab principal
  regresar(){
    this.router.navigate(['/tabs/tab3']);
  }
}
