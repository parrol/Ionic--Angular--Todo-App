import { Injectable } from '@angular/core';
import { ListPass } from '../models/list-pass.model';

@Injectable({
  providedIn: 'root'
})
export class PassService {

  //Array of password lists to be storaged.
  lists: ListPass[] = [];

  constructor() {
    this.loadFromStorage();
  }

  /**
   *
   * @param title title of the list to be created.
   * @returns the id of the list created.
   */
  createList(title: string): number {
    const newList = new ListPass(title);
    this.lists.push(newList);
    this.addToStorage();

    return newList.id;
  }

  /**
   * deletes a list and updates the localStorage.
   * @param list password list to be deleted.
   */
  deleteList(list: ListPass): void {
    this.lists = this.lists.filter(listData => (listData.id !== list.id));
    this.addToStorage();
  }

  /**
   *
   * @param id of the list to be retrieved. Could be number or string, but doesn't matter
   * since it's casted to number.
   * @returns password list with the given id.
   */
  getList(id: string | number): ListPass {
    id = Number(id);

    return this.lists.find(dataList => dataList.id === id);
  }

  /**
   * saves list to LocalStorage.
   */
  addToStorage(): void {
    localStorage.setItem('data', JSON.stringify(this.lists));
  }

  /**
   * retrieves the lists in localStorage.
   */
  loadFromStorage(): void {
    if (localStorage.getItem('data')) {
      this.lists = JSON.parse(localStorage.getItem('data'));
    } else {
      this.lists = [];
    }
  }

}
