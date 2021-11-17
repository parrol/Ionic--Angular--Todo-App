import { NgModule } from '@angular/core';
import { DoneFilterPipe } from './done-filter.pipe';


@NgModule({
  declarations: [
    DoneFilterPipe
  ],
  exports: [
    DoneFilterPipe
  ]
})
export class PipesModule { }
