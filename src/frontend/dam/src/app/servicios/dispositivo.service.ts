import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  obtenerLecturasDeHumedad(dispositivoId: string): Promise<number[]> {
    return new Promise((resolve, reject) => {
      const lecturas = Array.from({length: 10}, () => Math.random() * 100);
      resolve (lecturas);
    });
  }

  obtenerDispositivos(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const dispositivos = ['Dispositivo 1', 'Dispositivo 2', 'Dispositivo 3'];
      resolve(dispositivos);
    });
  }
}
