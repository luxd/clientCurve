import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarType } from '../carType';
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
  car: Car = new Car();

  carTypes: CarType[] = [];
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
  }

  onAddUpdate(car) {
    console.log("parent p " + car.make);
    this.carDataService
      .save(car)
      .subscribe(
        (newCar) => {
          this.cars = this.cars.concat(newCar);
        }
      );
  }

  onAddCar(car, carTypes) {
    this.open(car, carTypes, 'Insert New Car', 'Create');
  }



  private open(car: Car, carTypes: CarType[], title: string, submitButton: string) {
    const modalRef = this.modalService.open(CarDialogComponent, { backdrop: 'static' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.submitButton = submitButton;
    modalRef.componentInstance.car = car;
    modalRef.componentInstance.carTypes = carTypes;
    console.log("Dd" + car);
    console.log(carTypes);
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.createList(car);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

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
