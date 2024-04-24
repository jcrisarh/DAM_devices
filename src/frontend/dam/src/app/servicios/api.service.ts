import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrL = 'http://localhost:8000/api';
  constructor(private http: HttpClient) { }

  getDevices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrL}/devices`)
  }

  getDeviceDetails(deviceId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrL}/devices/${deviceId}`);
  }

  getLastMeasurement(deviceId: number): Observable<any> {
    console.log('getLastMeasurement function triggered')
    return this.http.get<any>(`${this.apiUrL}/measurements/${deviceId}/last_measurement`);
    
  }

  getAllMeasurements(deviceId: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrL}/measurements/${deviceId}`);
  }

  insertLogRiego(electrovalveId: number, data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrL}/irrigation_logs/${electrovalveId}/new_log`, data);
  }

  getLogRiegos(electrovalveId: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrL}/irrigation_logs/${electrovalveId}`);
  }

  insertMeasurement(deviceId: number, data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrL}/measurements/${deviceId}/new_measurement`, data);
  }
}
