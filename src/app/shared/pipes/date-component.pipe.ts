import { Pipe, PipeTransform } from '@angular/core';
// <p>Formatted Date: {{ someDate | appDate:'fullDate' }}</p>

@Pipe({
  name: 'appDate',
  standalone: true,
})
export class DateComponentPipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {
    if (!value) return '';

    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
}
