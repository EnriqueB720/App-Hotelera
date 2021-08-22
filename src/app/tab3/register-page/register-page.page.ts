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
  form: FormGroup;
  errorControl= 0;
  constructor(private router: Router,
              private firebase: FirebaseServiceService,
              private alertCtrl: AlertController) {}

  ngOnInit() {
    this.form = new FormGroup({
      nombreCompleto: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      numeroTel: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required,Validators.maxLength(8)]
      }),
      email: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      contrasena: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(8)]
      }),
      contrasenaConfirmada: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
    this.firebase.getUsuarios();
  }
ionViewWillEnter(){
  setTimeout(()=>{
    this.firebase.getUsuarios();
  },100);
}
  nuevoUsuario(){
    if(!this.form.valid) {return;}
    if(this.form.value.contrasenaConfirmada !== this.form.value.password){
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
       if(this.firebase.agregarUsuario(
          this.form.value.nombreCompleto,
          this.form.value.numeroTel,
          this.form.value.email,
          this.form.value.contrasena
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
