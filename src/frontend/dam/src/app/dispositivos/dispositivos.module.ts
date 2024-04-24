import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DispositivosPageRoutingModule } from './dispositivos-routing.module';

import { DispositivosPage } from './dispositivos.page';

import { DetalleSensorComponent } from '../detalle-sensor/detalle-sensor.component';
import { ColorearDirective } from '../directives/colorear.directive';
import { FilterPipe } from '../pipes/filter.pipe';

import { TooltipDirective } from '../directives/tooltip.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispositivosPageRoutingModule
  ],
  declarations: [
    DispositivosPage, 
    DetalleSensorComponent, 
    ColorearDirective,
    FilterPipe,
    TooltipDirective
  ]
})
export class DispositivosPageModule {}
