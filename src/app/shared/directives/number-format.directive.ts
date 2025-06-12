import { Directive, ElementRef, HostListener, Input, OnInit, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumberFormat]',
  standalone: true,
})
export class NumberFormatDirective implements OnInit {
  @Input() decimals: number = 2;
  @Input() allowDecimal: boolean = true;
  @Input() locale: string = 'en-US';
  @Input() keepOriginalValueOnInvalid: boolean = false;

  private originalValue: string | null = null;

  constructor(private el: ElementRef, @Optional() private control: NgControl) {}

  ngOnInit(): void {
    this.formatInitialValue();
  }

  private formatInitialValue(): void {
    const value = this.control?.control?.value;
    if (value !== null && value !== undefined) {
      const formattedValue = this.formatValue(value);
      this.originalValue = value;
      this.control?.control?.setValue(formattedValue, { emitEvent: false });
      this.el.nativeElement.value = formattedValue;
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const originalValue = input.value;

    // Remove all non-numeric characters except the first negative sign
    const sanitizedValue = originalValue
      .replace(/[^0-9.-]/g, '') // Allow digits, one minus sign, and a decimal point
      .replace(/(?!^)-/g, '') // Remove all minus signs except the first
      .replace(/(\..*?)\./g, '$1'); // Prevent multiple decimal points

    // Ensure the negative sign stays at the start, if present
    const finalValue =
      sanitizedValue.startsWith('-') || this.allowDecimal
        ? sanitizedValue
        : sanitizedValue.replace(/^-/g, ''); // Remove negative sign if not allowed or misplaced

    // Update the form control value without emitting events
    this.control?.control?.setValue(finalValue, { emitEvent: false });

    this.control?.control?.setValue(finalValue, { emitEvent: false });
  }

  @HostListener('blur')
  onBlur(): void {
    const value = this.control?.control?.value;
    if (value !== null && value !== undefined) {
      const formattedValue = this.formatValue(value);

      // If formatting results in an empty string and keepOriginalValueOnInvalid is true,
      // restore the original value
      if (formattedValue === '' && this.keepOriginalValueOnInvalid && this.originalValue) {
        this.control?.control?.setValue(this.originalValue, { emitEvent: false });
        this.el.nativeElement.value = this.originalValue;
      } else {
        this.control?.control?.setValue(formattedValue, { emitEvent: false });
        this.el.nativeElement.value = formattedValue;
      }
    }
  }

  private formatValue(value: string | number): string {
    // Ensure value is a string
    const stringValue = String(value);

    // Remove existing commas and parse
    const cleanedValue = stringValue.replace(/,/g, '');
    const numValue = parseFloat(cleanedValue);

    if (isNaN(numValue)) {
      return this.keepOriginalValueOnInvalid ? stringValue : '';
    }

    return new Intl.NumberFormat(this.locale, {
      minimumFractionDigits: this.allowDecimal ? this.decimals : 0,
      maximumFractionDigits: this.allowDecimal ? this.decimals : 0,
      useGrouping: true,
    }).format(numValue);
  }
}
