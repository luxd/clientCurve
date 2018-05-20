import { Injectable } from '@angular/core';
import { CarApiService } from './car-api.service';
import { Car } from './car';
import { CarType } from './carType';
import { Observable } from 'rxjs/Observable';
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

}
