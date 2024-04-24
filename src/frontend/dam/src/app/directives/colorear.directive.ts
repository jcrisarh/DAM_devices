import { Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appColorear]'
})
export class ColorearDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') mouseEnter() {
    this.colorear('CadetBlue')
  }

  @HostListener('mouseleave') mouseLeave() {
    this.colorear('')
  }

  colorear(color: string) {
    this.el.nativeElement.style.backgroundColor = color
  }

}