import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'password',
  pure: false
})
export class PasswordPipe implements PipeTransform {

  transform(value: string, showPassword: boolean = false): string {

    return (showPassword) ? value : '*'.repeat(value.length);

  }

}
