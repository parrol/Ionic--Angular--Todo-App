import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { List } from 'src/app/models/list.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent {

  @ViewChild(IonList) list: IonList;
  @Input() listDone = true;

  constructor(public todoService: TodoService, private router: Router, public alertController: AlertController) { }

  goToList(list: List) {
    if (this.listDone) {
      this.router.navigate(['/tabs', 'tab2', 'add', list.id]);
    } else {
      this.router.navigate(['/tabs', 'tab1', 'add', list.id]);
    }
  }

  deleteList(list: List) {
    this.todoService.deleteList(list);
  }

  async updateListTitle(list: List) {

    const alert = await this.alertController.create({
      header: 'Modificar titulo',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: list.title
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => this.list.closeSlidingItems()
        },
        {
          text: 'Modificar',
          handler: (data) => {
            if (data.title.length === 0) {
              return;

            } else {
              list.title = data.title;
              this.todoService.addToStorage();
              this.list.closeSlidingItems();
            }
          }
        }],
    });

    alert.present();
    const { role } = await alert.onDidDismiss();

  }

}
