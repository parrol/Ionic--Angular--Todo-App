import { Injectable } from '@angular/core';
import { ListTodo } from '../models/list-todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  //Array of todo lists to be storaged.
  lists: ListTodo[] = [];

  constructor() {
    this.loadFromStorage();
  }

  /**
   *
   * @param title title of the list to be created.
   * @returns the id of the list created.
   */
  createList(title: string): number {
    const newList = new ListTodo(title);
    this.lists.push(newList);
    this.addToStorage();

    return newList.id;
  }

  /**
   * deletes a list and updates the localStorage.
   * @param list todo list to be deleted.
   */
  deleteList(list: ListTodo): void {
    this.lists = this.lists.filter(listData => (listData.id !== list.id));

    this.addToStorage();
  }

  /**
   *
   * @param id of the list to be retrieved. Could be number or string, but doesn't matter
   * since it's casted to number.
   * @returns todo list with the given id.
   */
  getList(id: string | number): ListTodo {
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
