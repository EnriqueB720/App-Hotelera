import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
})
export class RegisterPagePage implements OnInit {
  signUpForm: FormGroup;
  constructor(private router: Router) { }

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
        validators: [Validators.required]
      }),
      password: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      confirmedPassword: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  //Funcion para regresar al tab principal
  regresar(){
    this.router.navigate(['/tabs/tab3']);
  }
}
