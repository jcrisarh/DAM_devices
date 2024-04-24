import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
//import * as Highcharts from 'highcharts';
import { ApiService } from '../servicios/api.service';
import { Device } from '../models/device';

@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.page.html',
  styleUrls: ['./dispositivos.page.scss'],
})
export class DispositivosPage implements OnInit {
  searchText: string = '';
  devices: Device[] = [];
  selectedDeviceName: string = '';
  showDetalleSensor: boolean = false;
  selectedDeviceId: number = 0;
  selectedElectrovalveId: number = 0;
  
  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchDevices();
  }

  navigatetoEdit() {
    this.router.navigate(["../dispositivos", { relativeTo: this.route }])
  }


  fetchDevices(): void {
    this.apiService.getDevices().subscribe(
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
    this.apiService.getDeviceDetails(deviceId).subscribe(
      (deviceDetails: any) => {
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

  

}
