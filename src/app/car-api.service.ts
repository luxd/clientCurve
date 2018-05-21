import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../environments/environment.prod';
import { Car } from './car';
import { CarType } from './carType';
import { ServiceType } from './serviceType';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ServiceRecord } from './serviceRecord';

const API_URL = environment.apiUrl;
@Injectable()
export class CarApiService {

  constructor(private http: Http) { }

  //Use API to get all cars
  public getAllCars(): Observable<Car[]> {
    return this.http
      .get(API_URL + '/cars')
      .map(response => {
        const cars = response.json();
        return cars.map((car) => new Car(car));
      })
      .catch(this.handleError);
  }

  public saveCar(car: Car): Observable<Car> {

    return this.http
      .post(API_URL + '/car', car)
      .map(response => {
        return new Car(response.json());
      })
      .catch(this.handleError);
  }

  public deleteCar(car: Car): Observable<any> {

    return this.http
      .delete(API_URL + '/car/' + car.carId)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  public getAllCarTypes(): Observable<CarType[]> {
    return this.http
      .get(API_URL + '/car_types')
      .map(response => {
        const carTypes = response.json();
        return carTypes.map((carType) => new CarType(carType));
      })
      .catch(this.handleError);
  }

  //getAllServiceTypes
  public getAllServiceTypes(): Observable<ServiceType[]> {
    return this.http
      .get(API_URL + '/service_types')
      .map(response => {
        const serviceTypes = response.json();
        return serviceTypes.map((serviceType) => new ServiceType(serviceType));
      })
      .catch(this.handleError);
  }

  //get service records of a car
  public getServiceRecords(car: Car): Observable<ServiceRecord[]> {
    return this.http
      .get(API_URL + '/car/' + car.carId + "/services")
      .map(response => {
        const serviceRecords = response.json();
        return serviceRecords.map((serviceRecord) => new ServiceRecord(serviceRecord));
      })
      .catch(this.handleError);
  }
  //car_type/1/service_types
  public getCarTypeAvailServices(car: Car): Observable<number[]> {
    return this.http
      .get(API_URL + '/car_type/' + car.carTypeId + "/service_types")
      .map(response => {
        const records = response.json();
        return records;
      })
      .catch(this.handleError);

  }
  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
