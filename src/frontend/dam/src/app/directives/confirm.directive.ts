import { Directive, Input, HostListener } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Directive({
  selector: '[appConfirmAction]'
})
export class ConfirmActionDirective {
  @Input('appConfirmAction') confirmMessage: string = 'Are you sure you want to proceed?';

  constructor(private alertController: AlertController) { }

  @HostListener('click', ['$event'])
  async confirmAction(event: MouseEvent) {
    event.preventDefault();
    const alert = await this.alertController.create({
      header: 'Confirm Action',
      message: this.confirmMessage,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => {
            console.log('Confirmed action');
          }
        }
      ]
    });

    await alert.present();
  }
}
