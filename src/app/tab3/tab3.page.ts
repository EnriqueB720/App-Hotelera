import { Component } from '@angular/core';
import { FirebaseServiceService } from '../tabs/firebase-service.service';
import { User } from './user.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public user: User[];
  constructor(public firebaseService: FirebaseServiceService) {}

  ngOnInit() {

  }
  ionViewWillEnter(){
    this.user =  this.firebaseService.getUser();
    console.log(this.user[0].fullName);
  }
}
