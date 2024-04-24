import { Directive, ElementRef, HostListener, Renderer2, Input} from '@angular/core';
import { DeviceSelectionService } from '../servicios/device-selection.service';

@Directive({
  selector: '[appFocusOnSelect]'
})
export class FocusOnSelectDirective {
  @Input() deviceId!: number;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private deviceSelectionService: DeviceSelectionService
  ) {}

  @HostListener('click') onClick() {
    // Get the ID of the selected device
    const selectedDeviceId = this.deviceSelectionService.getSelectedDeviceId();

    // Remove the selection class from the previously selected device
    const prevSelectedDevice = document.querySelector('.selected-device');
    if (prevSelectedDevice) {
      this.renderer.removeClass(prevSelectedDevice, 'selected-device');
    }

    // Apply the selection class to the clicked device
    this.renderer.addClass(this.el.nativeElement, 'selected-device');

    // Set the ID of the selected device in the service
    this.deviceSelectionService.setSelectedDeviceId(this.deviceId);
  }
}