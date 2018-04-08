import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addYearToAge'
})
export class AddYearToAgePipe implements PipeTransform {

  transform(value: any, args?: any): string {
    return value + ' years';
  }

}
