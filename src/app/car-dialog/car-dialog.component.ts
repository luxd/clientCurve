import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Car } from '../car';
import { CarType } from '../carType';

@Component({
  selector: 'app-car-dialog',
  templateUrl: './car-dialog.component.html',
  styleUrls: ['./car-dialog.component.css']
})
export class CarDialogComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  submitButton: string;
  @Input()
  car: Car;
  @Input()
  carTypes: CarType[];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
