import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
  export class DeviceSelectionService {
    private selectedDeviceId: number | null = null;
  
    constructor() {}
  
    setSelectedDeviceId(deviceId: number) {
      this.selectedDeviceId = deviceId;
    }
  
    getSelectedDeviceId(): number | null {
      return this.selectedDeviceId;
    }
  }