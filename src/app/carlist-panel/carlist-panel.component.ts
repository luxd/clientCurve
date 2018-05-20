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
  car: Car;

  @Input()
  carTypes: CarType[];

  @Output()
  addUpdate: EventEmitter<Car> = new EventEmitter();

  ngOnInit() {
  }

  //addCar(car: Car, carTypes: CarType[]) {
  //  this.add.emit({ car, carTypes });
  //  this.newCar = new Car();
  //}


  addCar(carTypes) {
    let aCar = new Car();
    this.open(aCar, carTypes, 'Insert New Car', 'Create');
  }
  openEdit(car, carTypes) {
    this.open(car, carTypes, 'Edit Car', 'Update');
  }


  private open(car: Car, carTypes: CarType[], title: string, submitButton: string) {
    const modalRef = this.modalService.open(CarDialogComponent, { backdrop: 'static' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.submitButton = submitButton;
    modalRef.componentInstance.car = car;
    modalRef.componentInstance.carTypes = carTypes;
    console.log("Car6 " + car);
    console.log(carTypes);
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.createList(car);
      console.log("after " + car.make);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  private createList(car: Car) {
    console.log("add 5 " + car)
    this.addUpdate.emit(car);
    //this.carDataService.save(car);
  }
  private gotoList(car: Car) {
    console.log(car);
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
