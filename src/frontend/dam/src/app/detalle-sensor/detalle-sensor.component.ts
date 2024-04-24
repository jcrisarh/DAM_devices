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
  showTable: boolean = false;
  showTableRiegos: boolean = false;
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
        type: 'gauge',
        backgroundColor: '#F0E5E5',
        borderRadius: 10,
        shadow: {
          color: 'rgba(0,0,0,0.2)',
          offsetX: 2,
          offsetY: 2,
          opacity: 0.5,
          width: 5
      }
    },
      title: {
        text: this.deviceName
        
      },

      yAxis: {
        min: 0,
        max: 100, 
        title: {
          text: 'Valor'
        }
      },
      

      series: [{
        type: 'gauge',
        name: 'Valor',
        data: [80],
        dataLabels: {
          enabled: true,
          format: '{y}',
          y: 20 
        }
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
    this.deviceId = deviceId
    this.lastMeasurementSubscription = this.apiService.getLastMeasurement(deviceId).subscribe(
      (lastMeasurement: any) => {
        console.log('Last Measurement:', lastMeasurement);
        if (lastMeasurement && lastMeasurement.valor) {
          const lastValue = parseFloat(lastMeasurement.valor);

          this.updateChartValue(lastValue);

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
        this.verLogRiegosElectrovalvula(this.electrovalveId);
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
    const measure_num = Math.floor(Math.random() * 61);
    const measure = measure_num.toString()
    console.log('Esta es la medicion', measure)
  
    const data = {
      electrovalveId: this.electrovalveId,
      fecha: formattedDate,
      apertura: open
    };

    const measureData = {
      fecha: formattedDate,
      value: measure

    }

    console.log(formattedDate)

    this.insertLogRiegoSubscrption=this.apiService.insertLogRiego(this.electrovalveId, data).subscribe(
      (response: any) => {
        console.log('Log riego inserted successfully', response);
        this.verLogRiegosElectrovalvula(this.electrovalveId);
      },
      (error) => {
        console.error('Error inserting log riego', error);
      }
    );

    this.insertMeasurementSubscription=this.apiService.insertMeasurement(this.deviceId, measureData).subscribe(
      (response: any) => {
        console.log('Measurement inserted successfully', response);
        this.verTodasLasMediciones(this.deviceId);
        this.verUltimaMedicion(this.deviceId)
      },
      (error) => {
        console.error('Error inserting measurement', error);
      }
    );
    console.log("ELECTROVALVULA CERRADA")
  }

  updateChartValue(newValue: number) {
    if (this.myChart && this.myChart.series && this.myChart.series[0]) {
      this.myChart.series[0].setData([newValue], true, false, false);
      console.log('Updated chart data with new value:', newValue);
    }
  }

  toggleMedicionesTabla() {
    this.showTable = !this.showTable;
    if (this.showTable) {
      this.verTodasLasMediciones(this.deviceId);
    } else {
      console.log("closed")
    }
  }

  toggleLogsTabla() {
    this.showTableRiegos = !this.showTableRiegos;
    if (this.showTableRiegos) {
      this.verLogRiegosElectrovalvula(this.electrovalveId);
    } else {
      console.log("closed")
    }
  }
  
  
}