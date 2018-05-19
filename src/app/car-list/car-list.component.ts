import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
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
  constructor(private carDataService: CarDataService, private modalService: NgbModal) { }

  ngOnInit() {
    this.carDataService
      .getAllCars()
      .subscribe(
        (cars) => {
          this.cars = cars;
        }
      );
  }

  onAddCar(car) {

    console.log(car);
    this.open(car, 'Insert New Car', 'Create');
  }

  private addNewCar() {
    let car = new Car();
    this.open(car, 'Insert New Car', 'Create');
  }

  private open(car: Car, title: string, submitButton: string) {
    const modalRef = this.modalService.open(CarDialogComponent, { backdrop: 'static' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.submitButton = submitButton;
    modalRef.componentInstance.car = car;
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.createList(car);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }


  private createList(car: Car) {
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
