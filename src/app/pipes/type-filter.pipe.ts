import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeFilter',
  pure: false
})
/**
 * used as a filter to show only the wanted lists.
 */
export class TypeFilterPipe implements PipeTransform {

  /**
   *
   * @param lists an array of lists.
   * @param type type can be 'done', 'pending' o 'pass'.
   * @returns an array of listst with the wanted type.
   */
  transform(lists: any[], type: string): any[] {
    if (type === 'done') {
      return lists.filter(list => list.done === true);

    } else if (type === 'pending') {
      return lists.filter(list => list.done === false);

    } else if (type === 'pass') {
      return lists.filter(list => list.type === 'pass');
    }
  }

}
