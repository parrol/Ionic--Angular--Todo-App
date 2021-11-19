import { NgModule } from '@angular/core';
import { TypeFilterPipe } from './type-filter.pipe';
import { PasswordPipe } from './password.pipe';


@NgModule({
  declarations: [
    TypeFilterPipe,
    PasswordPipe
  ],
  exports: [
    TypeFilterPipe,
    PasswordPipe
  ]
})
export class PipesModule { }
