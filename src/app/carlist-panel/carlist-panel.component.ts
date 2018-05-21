import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Car } from '../car';
import { CarType } from '../carType';
import { CarDialogComponent } from "../car-dialog/car-dialog.component";
import { DelConfirmDialogComponent } from "../del-confirm-dialog/del-confirm-dialog.component";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-carlist-panel',
  templateUrl: './carlist-panel.component.html',
  styleUrls: ['./carlist-panel.component.css']
})
export class CarlistPanelComponent implements OnInit {
  closeResult: string;
  newCar: Car = new Car();

  constructor(private modalService: NgbModal) { }

  @Input()
  cars: Car[];

  @Input()
  carTypes: CarType[];

  @Input()
  selectedCarId: number;

  @Output()
  addUpdate: EventEmitter<Car> = new EventEmitter();

  @Output()
  delete: EventEmitter<Car> = new EventEmitter();

  @Output()
  getServiceList: EventEmitter<Car> = new EventEmitter();

  ngOnInit() {
  }

  //addCar(car: Car, carTypes: CarType[]) {
  //  this.add.emit({ car, carTypes });
  //  this.newCar = new Car();
  //}


  addCar(carTypes) {
    let aCar = new Car();
    this.open(aCar, aCar, carTypes, 'Insert New Car', 'Create');
  }
  openEdit(car, carTypes) {
    let newCar = Object.assign({}, car);
    let oldCar = Object.assign({}, car);
    this.open(newCar, oldCar, carTypes, 'Edit Car', 'Update');
  }

  deleteCar(car: Car) {
    const modalRef = this.modalService.open(DelConfirmDialogComponent);
    modalRef.componentInstance.textConfirmation = 'Do you want to delete this car from list?';
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.deleteList(car);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private open(car: Car, oldCar: Car, carTypes: CarType[], title: string, submitButton: string) {
    const modalRef = this.modalService.open(CarDialogComponent, { backdrop: 'static' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.submitButton = submitButton;
    modalRef.componentInstance.car = car;
    modalRef.componentInstance.carTypes = carTypes;
    //console.log("Car6 " + car);
    //console.log(carTypes);
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.createList(car);
    }, (reason) => {
      car = Object.assign({}, oldCar);
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  private createList(car: Car) {
    this.addUpdate.emit(car);
  }

  private deleteList(car: Car) {
    this.delete.emit(car);
  }
  private gotoServiceList(car: Car) {
    this.getServiceList.emit(car);
    //this.selectedCarId = car.carId;
    //console.log(this.selectedCarId);
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
