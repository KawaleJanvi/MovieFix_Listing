import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'desc',
  standalone: true
})
export class OrderByPipe implements PipeTransform {
  // To select top 20 movies in the list according to popularity
  transform(value: any): any[] {
    return value.sort((a: any, b: any) => b.popularity - a.popularity).slice(0, 20);
  }

}
