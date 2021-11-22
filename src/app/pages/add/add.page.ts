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

  //targets the IonList component so the native functions can be used.
  @ViewChild(IonList) listSliding: IonList;
  @ViewChild(IonItemSliding) itemSliding: IonItemSliding;
  //list type to be shown.
  type: string;
  //list to be shown.
  list: any;
  //inputs to ge values of items to be added or modified.
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
    /**
     * temporary empty alert created to be dismissed later when other
     * alerts are created.
     */
    const toasty = this.toastController.create();
    // gets the list type from url.
    const listId = this.route.snapshot.paramMap.get('listId');
    this.type = this.route.snapshot.paramMap.get('type');

    //initializes the list to be shown depeding on its type.
    if (this.type === 'todo') {
      this.list = todoService.getList(listId);
    } else {
      this.list = passService.getList(listId);
    }

  }

  /**
   * initializes the items so that the password is always hidden
   * when the page is visited no matter what the user had set previously.
   */
  ngOnInit() {
    this.list.items.forEach(item => {
      item.showPassword = false;
      item.showPasswordIcon = 'eye-off-outline';
    });
  }

  /**
   *
   * @returns creates a new password item and adds it to the current password list.
   */
  addItem(): void {

    if (this.type === 'pass') {
      console.log(this.inputItemUser);
      console.log(this.inputItemPass);
      this.list.items.push(new ListPassItem(this.inputItemUser, this.inputItemPass));
      this.passService.addToStorage();
      //clears the input as it is an NgModel.
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
      //clears the input as it is an NgModel.
      this.inputItemName = '';
    }
  }

  checkboxChanged(item: ListTodoItem): void {

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

  /**
   * modifies the item of a list depending on thhe list type.
   * @param item a list todo item or a list pass item.
   */
  async modifyItem(item: any) {
    if (this.type === 'pass') {
      this.modifyItemPass(item);
    } else {
      this.modifyItemTodo(item);
    }
  }

  //@todo unify both functions in one.
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

  /**
   * deletes the item in the given position.
   * @param i position of the item to be deleted.
   */
  deleteItem(i: number) {
    this.list.items.splice(i, 1);
    console.log(`item #${i} deleted`);
    if (this.type === 'pass') {
      this.passService.addToStorage();

    } else {
      this.todoService.addToStorage();
    }
  }

  /**
   * shows a toast when the user copies an user or password.
   */
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

  /**
   *
   * @param copy string to be copied.
   * @returns copies the string touch/click to the device's clipboard.
   */
  copyToClipboard(copy: string) {
    this.presentToast();
    return this.clipboard.copy(copy);
  }

  /**
   * changes the icon shown when password is visible or hidden.
   * @param item password list item.
   */
  toglePassword(item: ListPassItem) {
    item.showPassword = !item.showPassword;
    if (item.showPassword) {
      item.showPasswordIcon = 'eye-outline';
    } else {
      item.showPasswordIcon = 'eye-off-outline';
    }
  }

}
