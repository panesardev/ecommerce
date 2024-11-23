import { Directive, ElementRef, HostListener, inject, input } from "@angular/core";

@Directive({
  selector: 'img[error]',
  standalone: true,
})
export class ImageErrorDirective {
  private hostRef = inject(ElementRef);

  error = input.required<string>();

  @HostListener('error')
  errored() {
    this.hostRef.nativeElement.src = this.error();
  }
}
