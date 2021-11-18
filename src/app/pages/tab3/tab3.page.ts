import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PassService } from 'src/app/services/pass.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private alertController: AlertController, private router: Router, private pass: PassService) { }

  async addPassList() {
    const alert = await this.alertController.create({
      header: 'Sitio web o aplicación',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: ''
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data) => {
            console.log(data);
            if (data.title.length === 0) {
              return;
            }

            const listId = this.pass.createList(data.title);
            this.router.navigateByUrl(`tabs/tab3/add/pass/${listId}`);
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }



}
