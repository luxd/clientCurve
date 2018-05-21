import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarType } from '../carType';
import { ServiceType } from '../serviceType';
import { ServiceRecord } from '../serviceRecord';
import { CarDataService } from '../car-data.service';
import { CarDialogComponent } from "../car-dialog/car-dialog.component";
import { DelConfirmDialogComponent } from "../del-confirm-dialog/del-confirm-dialog.component";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  closeResult: string;
  cars: Car[] = [];
  selectedCarId: number = 0;
  selectedCarTypeId: number = 0;
  carTypes: CarType[] = [];
  serviceTypes: ServiceType[] = [];
  serviceRecords: ServiceRecord[] = [];
  mapCarTypeServiceType: Map<number, number[]> = new Map<number, number[]>(); //carTypeId:serviceTypeId[]
  instruction: String;
  constructor(private carDataService: CarDataService, private modalService: NgbModal) { }

  ngOnInit() {
    this.carDataService
      .getAllCars()
      .subscribe(
        (cars) => {
          this.cars = cars;
        }
      );

    this.carDataService
      .getAllCarTypes()
      .subscribe(
        (carTypes) => {
          this.carTypes = carTypes;
        }
      );


    this.carDataService
      .getAllServiceTypes()
      .subscribe(
        (serviceTypes) => {
          this.serviceTypes = serviceTypes;
        }
      );
  }


  onAddUpdate(car) {
    let isAdd = false;
    if (car.carId == 0) {
      isAdd = true;
    }
    this.carDataService
      .save(car)
      .subscribe(
        (newCar) => {
          if (isAdd)
            this.cars = this.cars.concat(newCar);
          else
            this.cars.map((car, i) => {
              if (car.carId == newCar.carId) {
                this.cars[i] = newCar;
              }
            });
        }
      );
  }

  onAddUpdateService(serviceRecord) {
    console.log("onAddUpdateService")
  }
  onDelete(car) {
    console.log("del")
    this.carDataService
      .delete(car)
      .subscribe(
        () => {
          this.cars = this.cars.filter(item => item.carId !== car.carId);
        }
      );
  }

  onDeleteService(serviceRecord) {
    console.log("onDeleteService")
  }

  onGetServiceList(car) {
    this.selectedCarId = car.carId;
    this.selectedCarTypeId = car.carTypeId;
    console.log("no is " + this.selectedCarId);
    this.carDataService
      .getServiceRecords(car)
      .subscribe(
        (serviceRecords) => {
          this.serviceRecords = serviceRecords;
        }
      );
    //this.selectedCar = Object.assign({}, car);
    if (this.mapCarTypeServiceType.get(car.carTypeId) == null) {
      this.carDataService
        .getCarTypeAvailServices(car)
        .subscribe(
          (serviceRecords) => {
            this.mapCarTypeServiceType.set(car.carTypeId, serviceRecords);
          }
        );
    }
  }



  private createList(car: Car) {
    console.log(car)
    this.carDataService
      .save(car)
      .subscribe(
        (newCar) => {
          this.cars = this.cars.concat(newCar);
        }
      );
    //this.carDataService.save(car);
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
