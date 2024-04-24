import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  private showTooltip() {
    const tooltip = this.renderer.createElement('div');
    const text = this.renderer.createText(this.tooltipText);
    this.renderer.appendChild(tooltip, text);
    this.renderer.setStyle(tooltip, 'position', 'absolute');
    this.renderer.setStyle(tooltip, 'background', 'rgba(0, 0, 0, 0.8)');
    this.renderer.setStyle(tooltip, 'color', '#fff');
    this.renderer.setStyle(tooltip, 'padding', '5px');
    this.renderer.setStyle(tooltip, 'border-radius', '4px');
    this.renderer.setStyle(tooltip, 'z-index', '9999');
    this.renderer.appendChild(this.el.nativeElement, tooltip);
  }

  private hideTooltip() {
    const tooltip = this.el.nativeElement.querySelector(':scope > div');
    if (tooltip) {
      this.renderer.removeChild(this.el.nativeElement, tooltip);
    }
  }
}

