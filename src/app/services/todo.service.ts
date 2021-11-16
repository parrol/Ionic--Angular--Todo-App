import { Injectable } from '@angular/core';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  lists: List[] = [];

  constructor() {
    this.loadFromStorage();

  }

  createList(title: string) {
    const newList = new List(title);
    this.lists.push(newList);
    this.addToStorage();

    return newList.id;
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
