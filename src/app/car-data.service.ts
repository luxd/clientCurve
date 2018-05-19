import { Injectable } from '@angular/core';
import { CarApiService } from './car-api.service';
import { Car } from './car';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class CarDataService {

  constructor(private api: CarApiService) { }
  getAllCars(): Observable<Car[]> {
    return this.api.getAllCars();
  }

}
