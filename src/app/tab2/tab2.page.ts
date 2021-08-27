import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor() {}

  colorRandom(){
    const numero = Math.floor(Math.random() * 4) + 1;
    if(numero === 1){
      return 'azul';
    }else if (numero === 2){
      return 'verde';
    }else if(numero === 3){
      return 'amarillo';
    }else{
      return 'rojo';
    }
  }
}
