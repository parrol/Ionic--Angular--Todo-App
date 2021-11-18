import { NgModule } from '@angular/core';
import { TypeFilterPipe } from './type-filter.pipe';


@NgModule({
  declarations: [
    TypeFilterPipe
  ],
  exports: [
    TypeFilterPipe
  ]
})
export class PipesModule { }
