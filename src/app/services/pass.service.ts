import { Injectable } from '@angular/core';
import { ListPass } from '../models/list-pass.model';

@Injectable({
  providedIn: 'root'
})
export class PassService {

  lists: ListPass[] = [];

  constructor() {
    this.loadFromStorage();

  }

  createList(title: string) {
    const newList = new ListPass(title);
    this.lists.push(newList);
    this.addToStorage();

    return newList.id;
  }

  deleteList(list: ListPass) {
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
