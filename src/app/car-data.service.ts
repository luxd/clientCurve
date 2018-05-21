import { Injectable } from '@angular/core';
import { CarApiService } from './car-api.service';
import { Car } from './car';
import { CarType } from './carType';
import { ServiceType } from './serviceType';
import { Observable } from 'rxjs/Observable';
import { ServiceRecord } from './serviceRecord';
@Injectable()
export class CarDataService {

  constructor(private api: CarApiService) { }
  getAllCars(): Observable<Car[]> {
    return this.api.getAllCars();
  }


  save(car: Car): Observable<Car> {
    return this.api.saveCar(car);
  }

  delete(car: Car): Observable<Car> {
    return this.api.deleteCar(car);
  }

  getAllCarTypes(): Observable<CarType[]> {
    return this.api.getAllCarTypes();
  }

  getAllServiceTypes(): Observable<ServiceType[]> {
    return this.api.getAllServiceTypes();
  }

  getServiceRecords(car: Car): Observable<ServiceRecord[]> {
    return this.api.getServiceRecords(car);
  }

  getCarTypeAvailServices(car: Car): Observable<number[]> {
    return this.api.getCarTypeAvailServices(car);
  }
}
