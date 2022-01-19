import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  randomNum = 0;
  score = 0;
  spins = 3;
  sliderValue = 50;

  constructor(public toastController: ToastController) {
    this.generateNum()
  }

  async success() {
    const toast = await this.toastController.create({
      message: '¡Has acertado en la diana!, has conseguido 20 puntos',
      duration: 1500,
      color: "success"
    });
    toast.present();
  }

  async fail() {
    const toast = await this.toastController.create({
      message: 'Te has quedado sin intentos, inténtelo de nuevo',
      duration: 2000,
      color: "danger"
    });
    toast.present();
  }

  generateNum(){
    this.randomNum = Math.floor(Math.random()* 100)+1;
  }

  reset(){
    this.score = 0;
    this.sliderValue = 50;
    this.spins = 3;
    this.generateNum()
  }
  start(){
    if(this.spins > 0){
      console.log(this.sliderValue)
      if(this.sliderValue == this.randomNum){
        this.score += 20;
        this.success()
      }
      else if(this.sliderValue >= this.randomNum-10 && this.sliderValue <= this.randomNum+10){
        if(this.sliderValue > this.randomNum){
          this.score += 10-(this.sliderValue-this.randomNum)
        }
        else{
          this.score += 10-(this.randomNum-this.sliderValue)
        }
      }
      this.spins -= 1
      this.generateNum()
    }
    else{
      this.fail()
    }
  }

}
