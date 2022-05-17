import { Component, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { IonSlides, IonSlide } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('slidesSurvey') slides: IonSlides;

  survey: Survey = {Code: 100000, Lecturer: "", Course: "", Group: ""};

  constructor(private toastController: ToastController, public alertController: AlertController) {}
  

  async ngOnInit(){

  }
  

  slideChanged(){
    this.slides.getActiveIndex().then(async index => {
      if(index === 1 && this.survey.Code > 999999 || this.survey.Code < 100000 ){
        this.slides.slidePrev();
        await sleep(500);
        alert("Zły numer ankiety!")
      }
    });


    /*1. A. Jeżeli: 
       - index slajdu = 1
       - kod ankiety poza 100000-999999
       B. Powrót do slajdu 1 (index = 0)
       C. Alert, że zły numer
    
     2. Analogicznie dla przycisku przejścia do następnego slajdu
       */
    
    // this.slides.getActiveIndex();
    // this.slides.slideTo(1, 500);
    //this.slides.slidePrev();
    //this.slides.lockSwipeToNext();
  }

  loadSurveyData(){
    this.survey = {Code: 200000, Lecturer: "Michał Kuciapski", Course: "Ionic", Group: "s32"};
  }

  async nextSlide(){
    this.slides.slideNext();
    const toast = await this.toastController.create({
      header: 'Ankieta oceniająca zajęcia',
      icon: 'information-circle',
      message: 'Proszę sumiennie i rzetelnie ocenic zajecia, na ktorych sie obecnie Pani/Pan znajduje. Udzielone Odpowiedzi sa wazne i przyzynia sie do doskonalenia procesu dydaktycznego w UG',
      duration: 10000,
      buttons: [
         {
          text: 'OK',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Podano nieprawidłowe dane',
      message: 'Wypełnij wszystkie wymagane pola ankiety',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  validateForm() {
    const label1 = document.getElementById('label1') as HTMLInputElement | null;
    const label2 = document.getElementById('label2') as HTMLInputElement | null;
    const label3 = document.getElementById('label3') as HTMLInputElement | null;
    const label4 = document.getElementById('label4') as HTMLInputElement | null;
    const label5 = document.getElementById('label5') as HTMLInputElement | null;
    const label6 = document.getElementById('label6') as HTMLInputElement | null;
    




    const uwagi = document.getElementById('uwagi') as HTMLInputElement | null;

    if (typeof(label1.value) == "undefined" ||
    typeof(label2.value) == "undefined" ||
    typeof(label3.value) == "undefined" ||
    typeof(label4.value) == "undefined" ||
    typeof(label5.value) == "undefined" ||
    typeof(label6.value) == "undefined" ||
     uwagi.value.length > 140) {
      this.presentAlert();
    }
  }

}





interface Survey{
  Code: number,
  Lecturer: string,
  Course: string,
  Group: string,
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}