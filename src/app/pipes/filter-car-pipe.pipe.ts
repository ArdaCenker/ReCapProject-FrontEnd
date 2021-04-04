import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';
import { CarDto } from '../models/carDto';

@Pipe({
  name: 'filterCarPipe'
})
export class FilterCarPipePipe implements PipeTransform {

  transform(value: Car[], filterText: string): Car[] {
    filterText = filterText?filterText.toLocaleLowerCase():"";
    return filterText ? value.filter((c:Car)=> c.description.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
