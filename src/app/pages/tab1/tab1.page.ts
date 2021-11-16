import { Component } from '@angular/core';
import { List } from 'src/app/models/list.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  lists: List[];

  constructor(public todo: TodoService) {
    this.lists = this.todo.lists;
  }

}
