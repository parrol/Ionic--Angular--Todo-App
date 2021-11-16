import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListItem } from 'src/app/models/list-item.model';
import { List } from 'src/app/models/list.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage {

  list: List;
  inputItemName = '';

  constructor(private todoService: TodoService, private route: ActivatedRoute) {
    const listId = this.route.snapshot.paramMap.get('listId');
    this.list = todoService.getList(listId);
  }

  addItem() {

    if (this.inputItemName.length === 0) {
      return;
    }
    this.list.items.push(new ListItem(this.inputItemName));
    this.inputItemName = '';
    // after modifying the list it needs to be saved in localStorage
    // this.list receives its data as a reference, so even though we're creating a new variable it modifies
    // the list receieved.
    this.todoService.addToStorage();
  }

  checkboxChanged(item: ListItem) {

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
}
