import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { ListTodo } from 'src/app/models/list-todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { PassService } from 'src/app/services/pass.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @ViewChild(IonList) list: IonList;
  @Input() listType: string;
  listDone: boolean;
  //lists currently shown on this component.
  lists: any;

  constructor(
    private todoService: TodoService,
    private passService: PassService,
    private router: Router,
    public alertController: AlertController) {
  }

  //initializes the type of list to be shown on the component.
  ngOnInit() {
    if (this.listType === 'done') {
      this.listDone = true;
      this.lists = this.todoService.lists;
    } else if (this.listType === 'pending') {
      this.listDone = false;
      this.lists = this.todoService.lists;
    } else if (this.listType === 'pass') {
      this.lists = this.passService.lists;
      this.listDone = true;
    }
  }

  /**
   * navigates to the adequate page depending on the type of list
   * and id of that list.
   * @param list a todo or pass list.
   */
  goToList(list: any) {
    if (this.listType === 'done') {
      this.router.navigate(['/tabs', 'tab2', 'add', 'todo', list.id]);
    } else if (this.listType === 'pending') {
      this.router.navigate(['/tabs', 'tab1', 'add', 'todo', list.id]);
    } else {
      this.router.navigate(['/tabs', 'tab3', 'add', 'pass', list.id]);
    }
  }

  /**
   * deletes a given list.
   * @param list a todo or pass list.
   */
  deleteList(list: any) {
    if (this.listType === 'pass') {
      this.passService.deleteList(list);
      this.lists = this.passService.lists;
    } else {
      this.todoService.deleteList(list);
      this.lists = this.todoService.lists;
    }
  }

  /**
   * creates an alert that gives the opcion to edit the title of the selected list.
   * @param list todo list.
   */
  async updateListTitle(list: ListTodo) {

    const alert = await this.alertController.create({
      header: 'Editar titulo',
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
          text: 'Editar',
          handler: (data) => {
            if (data.title.length === 0) {
              return;

            } else {
              list.title = data.title;
              if (this.listType === 'pass') {
                this.passService.addToStorage();

              } else {
                this.todoService.addToStorage();

              }
              this.list.closeSlidingItems();
            }
          }
        }],
    });

    alert.present();
    const { role } = await alert.onDidDismiss();

  }

}
