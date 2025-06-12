import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCurrencyFormat]',
})
export class CurrencyFormatDirective {
  private previousValue: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value.replace(/\D/g, ''); // chỉ giữ số

    if (rawValue === this.previousValue) return;

    this.previousValue = rawValue;

    // format lại số tiền: 100000 -> 100.000
    const formatted = this.formatCurrency(rawValue);
    input.value = formatted;
  }

  formatCurrency(value: string): string {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}
