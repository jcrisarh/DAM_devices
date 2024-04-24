import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ApiService } from '../servicios/api.service';
import { Device } from '../models/device';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.page.html',
  styleUrls: ['./dispositivos.page.scss'],
})
export class DispositivosPage implements OnInit, OnDestroy {
  searchText: string = '';
  devices: Device[] = [];
  selectedDeviceName: string = '';
  showDetalleSensor: boolean = false;
  selectedDeviceId: number = 0;
  selectedElectrovalveId: number = 0;
  deviceSubscription!: Subscription;
  deviceListSubscription!: Subscription;
  
  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchDevices();
  }

  ngOnDestroy(): void {
    if (this.deviceSubscription) {
      this.deviceSubscription.unsubscribe();
    }
    if (this.deviceListSubscription) {
      this.deviceListSubscription.unsubscribe();
    }
  }

  navigatetoEdit() {
    this.router.navigate(["../dispositivos", { relativeTo: this.route }])
  }


  fetchDevices(): void {
    this.deviceListSubscription = this.apiService.getDevices().subscribe(
      (devices: Device[]) => {
        this.devices = devices;
        console.log(devices)
      },
      (error) => {
        console.error('Error fetching devices', error);
      }
    );

  }

  showSensorDetails(deviceId: number, deviceName: string, electrovalveId: number) {
    this.deviceSubscription = this.apiService.getDeviceDetails(deviceId).subscribe(
      (deviceDetails: Device) => {
        console.log('Device details:', deviceDetails);
        this.selectedDeviceName = deviceName;
        this.selectedDeviceId = deviceId;
        this.selectedElectrovalveId = electrovalveId
        this.showDetalleSensorComponent();
      },
      (error) => {
        console.error('Error fetching device details', error);
      }
    );
  }

  showDetalleSensorComponent() {
    this.showDetalleSensor = true;
  }

  hideDetalleSensor() {
    this.showDetalleSensor = false;
  }

  

}
