// filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(devices: any[], searchText: string): any[] {
        if (!devices || !searchText) {
            return devices;
        }

        searchText = searchText.toLowerCase();

        return devices.filter(device => {
            return (
                device.nombre.toLowerCase().includes(searchText) ||
                device.ubicacion.toLowerCase().includes(searchText)
            );
        });
    }
}
