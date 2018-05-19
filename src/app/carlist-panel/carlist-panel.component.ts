import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Car } from '../car';

@Component({
  selector: 'app-carlist-panel',
  templateUrl: './carlist-panel.component.html',
  styleUrls: ['./carlist-panel.component.css']
})
export class CarlistPanelComponent implements OnInit {

  newCar: Car = new Car();
  constructor() { }

  @Input()
  cars: Car[];

  @Output()
  add: EventEmitter<Car> = new EventEmitter();

  ngOnInit() {
  }

  addCar() {
    this.add.emit(this.newCar);
    this.newCar = new Car();
  }
}
