import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heroStatus'
})
export class HeroStatusPipe implements PipeTransform {

  transform(value: boolean): string {
    if(!value) {
    	return 'Deceased'
    }

    return 'Alive';
  }

}
