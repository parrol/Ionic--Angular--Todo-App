import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'password',
  pure: false
})
export class PasswordPipe implements PipeTransform {

  /**
   *
   * @param value the password to be hidden.
   * @param showPassword defaults to false so the password can be shown.
   * @returns return the given the password if showPassword = true otherwise replaces each letter
   * of the given password with asterisks.
   */
  transform(value: string, showPassword: boolean = false): string {

    return (showPassword) ? value : '*'.repeat(value.length);

  }

}
