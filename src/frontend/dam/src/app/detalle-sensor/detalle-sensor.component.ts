import { Component, Input, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import { ApiService } from '../servicios/api.service';
HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle-sensor',
  templateUrl: './detalle-sensor.component.html',
  styleUrls: ['./detalle-sensor.component.scss']
})
export class DetalleSensorComponent implements OnInit, OnDestroy {
  @Input() deviceName: string = '';
  @Input() deviceId!: number;
  @Input() electrovalveId!: number;
  private myChart!: Highcharts.Chart;
  measurements: any[] = [];
  riegos: any[] = [];
  showTable: boolean = true;
  electrovalveOpen: boolean = false;
  private measurementSubscription!: Subscription;
  private lastMeasurementSubscription!: Subscription;
  private insertLogRiegoSubscrption!: Subscription;
  private logRiegosSubscription!: Subscription;
  private insertMeasurementSubscription!: Subscription;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.generarChart();
    this.updateDeviceId(this.deviceId);
    this.verUltimaMedicion(this.deviceId);
    
  }

  ngOnDestroy(): void { 
    if (this.measurementSubscription) {
      this.measurementSubscription.unsubscribe();
    }
    if (this.lastMeasurementSubscription) {
      this.lastMeasurementSubscription.unsubscribe();
    }
    if (this.logRiegosSubscription) {
      this.logRiegosSubscription.unsubscribe();
    }
    if (this.insertLogRiegoSubscrption) {
      this.insertLogRiegoSubscrption.unsubscribe();
    }
    if (this.insertMeasurementSubscription) {
      this.insertMeasurementSubscription.unsubscribe();
    }
    console.log('onDestroy has been called')
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called')
    if (changes['deviceName'] && !changes['deviceName'].firstChange) {
      this.updateChartTitle();
      console.log('ngOnChanges device id', this.deviceId)
    }
    if (changes['deviceId'] && !changes['deviceId'].firstChange) {
      console.log('please update', this.deviceId)
      this.updateDeviceId(this.deviceId);
      this.verUltimaMedicion(this.deviceId);
    }
  }

  generarChart() {
    this.myChart = Highcharts.chart('gauge-chart-container', {
      chart: {
        type: 'gauge'
      },
      title: {
        text: this.deviceName
        
      },
      

      series: [{
        type: 'gauge',
        name: 'kPA',
        data: [80]
      }]
    });
  }
  updateChartTitle() {
    if (this.myChart && this.myChart.options && this.myChart.options.title) {
      this.myChart.setTitle({ text: this.deviceName });
      console.log('Updating chart title with device name:', this.deviceName);
    }
  }

  verTodasLasMediciones(deviceId: number) {
    console.log('verTodasLasMediciones function called');
    console.log('device id', deviceId)
    if (this.deviceId) {
      this.measurementSubscription = this.apiService.getAllMeasurements(deviceId).subscribe(
        (data: any[]) => {
          this.measurements = data;
          console.log('Measurements:', this.measurements);
        },
        (error) => {
          console.error('Error fetching measurements', error);
        }
      );
    }
  }

  verUltimaMedicion(deviceId: number) {
    console.log('verUltimaMedicion function called');
    console.log('device id pleaseeeeeeeee', deviceId);
    this.deviceId = deviceId
    this.lastMeasurementSubscription = this.apiService.getLastMeasurement(deviceId).subscribe(
      (lastMeasurement: any) => {
        console.log('Last Measurement:', lastMeasurement);
        if (lastMeasurement && lastMeasurement.valor) {
          const lastValue = parseFloat(lastMeasurement.valor);

          if (this.myChart && this.myChart.series && this.myChart.series[0]) {
            this.myChart.series[0].setData([lastValue]);
            console.log('Updated chart data with last measurement:', lastValue);
          }
        } else {
          console.error('Invalid or missing last measurement value.');
        }
      },
      (error) => {
        console.error('Error fetching last measurement', error);
      }
    );
  }

  updateDeviceId(deviceId: number) {
    console.log('Updating deviceId:', deviceId);
    this.deviceId = deviceId;
  }

  openElectrovalve() {
    const currentDate = new Date()
    const formattedDate = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)} ${('0' + currentDate.getHours()).slice(-2)}:${('0' + currentDate.getMinutes()).slice(-2)}:${('0' + currentDate.getSeconds()).slice(-2)}`;
    const open = true;
  
    const data = {
      electrovalveId: this.electrovalveId,
      fecha: formattedDate,
      apertura: open
    };

    console.log(formattedDate)

    this.insertLogRiegoSubscrption=this.apiService.insertLogRiego(this.electrovalveId, data).subscribe(
      (response: any) => {
        console.log('Log riego inserted successfully', response);
      },
      (error) => {
        console.error('Error inserting log riego', error);
      }
    );
    console.log("ELECTROVALVULA ABIERTA")
  }

  verLogRiegosElectrovalvula(electrovalveId: number) {
    if (this.electrovalveId) {
      this.logRiegosSubscription = this.apiService.getLogRiegos(electrovalveId).subscribe(
        (data: any[]) => {
          this.riegos = data;
          console.log('Log Riegos', this.riegos);
        },
        (error) => {
          console.error('Error fetching measurements', error);
        }
      );
    }
  }

  toggleElectrovalve() {
    this.electrovalveOpen = !this.electrovalveOpen;
    if (this.electrovalveOpen) {
      this.openElectrovalve();
    } else {
      this.closeElectrovalve(this.deviceId);
    }
  }

  closeElectrovalve(deviceId: number) {
    const currentDate = new Date()
    const formattedDate = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)} ${('0' + currentDate.getHours()).slice(-2)}:${('0' + currentDate.getMinutes()).slice(-2)}:${('0' + currentDate.getSeconds()).slice(-2)}`;
    const open = false;
    const measure_num = Math.floor(Math.random() * (90 - 10 + 1)) + 10;
    const measure = measure_num.toString()
    console.log('Esta es la medicion', measure)
  
    const data = {
      electrovalveId: this.electrovalveId,
      fecha: formattedDate,
      apertura: open
    };

    const measureData = {
      //deviceId : this.deviceId, 
      fecha: formattedDate,
      value: measure

    }

    console.log(formattedDate)

    this.insertLogRiegoSubscrption=this.apiService.insertLogRiego(this.electrovalveId, data).subscribe(
      (response: any) => {
        console.log('Log riego inserted successfully', response);
      },
      (error) => {
        console.error('Error inserting log riego', error);
      }
    );

    this.insertMeasurementSubscription=this.apiService.insertMeasurement(this.deviceId, measureData).subscribe(
      (response: any) => {
        console.log('Measurement inserted successfully', response);
      },
      (error) => {
        console.error('Error inserting measurement', error);
      }
    );
    console.log("ELECTROVALVULA CERRADA")
  }
  
  
}