import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeFilter',
  pure: false
})
export class TypeFilterPipe implements PipeTransform {

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
