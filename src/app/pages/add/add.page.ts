import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListPassItem } from 'src/app/models/list-pass-item';
import { ListTodoItem } from 'src/app/models/list-todo-item.model';
import { PassService } from 'src/app/services/pass.service';
import { TodoService } from 'src/app/services/todo.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage {

  type: string;
  list: any;
  inputItemName = '';

  constructor(private todoService: TodoService, private passService: PassService, private route: ActivatedRoute) {
    const listId = this.route.snapshot.paramMap.get('listId');
    this.type = this.route.snapshot.paramMap.get('type');

    if (this.type === 'todo') {
      this.list = todoService.getList(listId);
    } else {
      this.list = passService.getList(listId);
    }
  }

  addItem() {

    if (this.inputItemName.length === 0) {
      return;
    }

    if (this.type === 'todo') {
      this.list.items.push(new ListTodoItem(this.inputItemName));
      this.todoService.addToStorage();
    } else {
      this.list.items.push(new ListPassItem(this.inputItemName));
      this.passService.addToStorage();
    }
    this.inputItemName = '';
    // after modifying the list it needs to be saved in localStorage
    // this.list receives its data as a reference, so even though we're creating a new variable it modifies
    // the list receieved.
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

  deleteItem(i: number) {
    this.list.items.splice(i, 1);
    console.log(`item #${i} deleted`);
    if (this.type === 'pass') {
      this.passService.addToStorage();

    } else {
      this.todoService.addToStorage();
    }

  }
}
