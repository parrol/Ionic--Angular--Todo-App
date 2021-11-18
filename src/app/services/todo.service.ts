import { Injectable } from '@angular/core';
import { ListTodo } from '../models/list-todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  lists: ListTodo[] = [];

  constructor() {
    this.loadFromStorage();
  }

  createList(title: string) {
    const newList = new ListTodo(title);
    this.lists.push(newList);
    this.addToStorage();

    return newList.id;
  }

  deleteList(list: ListTodo) {
    this.lists = this.lists.filter(listData => (listData.id !== list.id));

    this.addToStorage();
  }

  getList(id: string | number) {
    id = Number(id);

    return this.lists.find(dataList => dataList.id === id);
  }

  addToStorage() {
    localStorage.setItem('data', JSON.stringify(this.lists));
  }

  loadFromStorage() {
    if (localStorage.getItem('data')) {
      this.lists = JSON.parse(localStorage.getItem('data'));
    } else {
      this.lists = [];
    }
  }

}
