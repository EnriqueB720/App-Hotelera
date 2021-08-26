import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmada',
  templateUrl: './confirmada.page.html',
  styleUrls: ['./confirmada.page.scss'],
})
export class ConfirmadaPage implements OnInit {

  constructor(private Router:Router) { }

  ngOnInit() {
    setTimeout(() =>{
      this.Router.navigate(['../']);
    },1300)
  }

}
