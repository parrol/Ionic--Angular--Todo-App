import { Pipe, PipeTransform } from '@angular/core';
import { List } from '../models/list.model';

@Pipe({
  name: 'doneFilter',
  pure: false
})
export class DoneFilterPipe implements PipeTransform {

  transform(lists: List[], done: boolean): List[] {
    return lists.filter (list => list.done === done);
  }

}
