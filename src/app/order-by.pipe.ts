import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'desc',
  standalone: true
})
export class OrderByPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any[] {
    return value.sort((a, b) => {
        return b.popularity - a.popularity;
    }).slice(0,20);
  }

}
