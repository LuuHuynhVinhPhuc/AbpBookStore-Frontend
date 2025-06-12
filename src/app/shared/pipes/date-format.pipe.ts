import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | Date, format: string = 'dd/MM/yyyy'): string | null {
    if (!value) return null;
    const datePipe = new DatePipe('en-US'); // You might want to get locale dynamically
    return datePipe.transform(value, format);
  }
}
