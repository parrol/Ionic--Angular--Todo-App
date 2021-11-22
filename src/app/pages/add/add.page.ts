import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListPassItem } from 'src/app/models/list-pass-item';
import { ListTodoItem } from 'src/app/models/list-todo-item.model';
import { PassService } from 'src/app/services/pass.service';
import { TodoService } from 'src/app/services/todo.service';
import { AlertController, IonItemSliding, IonList, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  @ViewChild(IonList) listSliding: IonList;
  @ViewChild(IonItemSliding) itemSliding: IonItemSliding;
  type: string;
  list: any;
  inputItemName = '';
  inputItemUser = '';
  inputItemPass = '';
  showPasswordIcon = 'eye-off-outline';

  constructor(
    private todoService: TodoService,
    private passService: PassService,
    private route: ActivatedRoute,
    private clipboard: Clipboard,
    private toastController: ToastController,
    private alertController: AlertController) {
    const toasty = this.toastController.create();
    const listId = this.route.snapshot.paramMap.get('listId');
    this.type = this.route.snapshot.paramMap.get('type');

    if (this.type === 'todo') {
      this.list = todoService.getList(listId);
    } else {
      this.list = passService.getList(listId);
    }

  }

  ngOnInit() {
    this.list.items.forEach(item => {
      item.showPassword = false;
      item.showPasswordIcon = 'eye-off-outline';
    });
  }

  addItem() {

    if (this.type === 'pass') {
      console.log(this.inputItemUser);
      console.log(this.inputItemPass);
      this.list.items.push(new ListPassItem(this.inputItemUser, this.inputItemPass));
      this.passService.addToStorage();
      this.inputItemUser = '';
      this.inputItemPass = '';
    } else {
      if (this.inputItemName.length === 0) {
        return;
      }
      // after modifying the list it needs to be saved in localStorage
      // this.list receives its data as a reference, so even though we're creating a new variable it modifies
      // the list receieved.
      this.list.items.push(new ListTodoItem(this.inputItemName));
      this.todoService.addToStorage();
      this.inputItemName = '';
    }
  }

  checkboxChanged(item: ListTodoItem) {

    const pending = this.list.items.filter(itemData => itemData.done === false).length;
    console.log({ pending });

    if (pending === 0) {
      this.list.doneAt = new Date();
      this.list.done = true;
    } else {
      this.list.doneAt = null;
      this.list.done = false;
    }
    this.todoService.addToStorage();
  }

  async modifyItem(item: any) {
    if (this.type === 'pass') {
      this.modifyItemPass(item);
    } else {
      this.modifyItemTodo(item);
    }
  }

  async modifyItemPass(item: ListPassItem) {

    const alert = await this.alertController.create({
      header: 'Editar usuario o contraseña',
      inputs: [
        {
          name: 'user',
          type: 'text',
          value: item.user
        },
        {
          name: 'pass',
          type: 'text',
          value: item.pass
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => this.listSliding.closeSlidingItems()
        },
        {
          text: 'Editar',
          handler: (data) => {
            if ((data.user.length === 0) || (data.pass.length === 0)) {
              return;

            } else {
              item.user = data.user;
              item.pass = data.pass;
              this.passService.addToStorage();
              this.itemSliding.closeOpened();
            }
          }
        }],
    });

    alert.present();
    const { role } = await alert.onDidDismiss();

  }

  async modifyItemTodo(item: ListTodoItem) {

    const alert = await this.alertController.create({
      header: 'Editar ítem',
      inputs: [
        {
          name: 'desc',
          type: 'text',
          value: item.desc
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => this.listSliding.closeSlidingItems()
        },
        {
          text: 'Editar',
          handler: (data) => {
            if (data.desc.length === 0) {
              return;

            } else {
              item.desc = data.desc;
              this.todoService.addToStorage();
              this.itemSliding.closeOpened();
            }
          }
        }],
    });

    alert.present();
    const { role } = await alert.onDidDismiss();

  }

  deleteItem(i: number) {
    this.list.items.splice(i, 1);
    console.log(`item #${i} deleted`);
    if (this.type === 'pass') {
      this.passService.addToStorage();

    } else {
      this.todoService.addToStorage();
    }
  }

  async presentToast() {
    //dismisses the first toat created in the constructor
    this.toastController.dismiss();
    const toast = await this.toastController.create({
      cssClass: 'toast',
      message: '¡Copiado en el portapapeles!',
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

  copyToClipboard(copy: string) {
    this.presentToast();
    return this.clipboard.copy(copy);
  }

  toglePassword(item: ListPassItem) {
    item.showPassword = !item.showPassword;
    if (item.showPassword) {
      item.showPasswordIcon = 'eye-outline';
    } else {
      item.showPasswordIcon = 'eye-off-outline';
    }
  }

}
