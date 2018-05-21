import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ServiceRecord } from '../serviceRecord';
import { ServiceType } from '../serviceType';
@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.css']
})
export class ServiceDialogComponent implements OnInit {

  serviceTypesChecked: number[];
  canSubmit: boolean = false;
  @Input()
  service: ServiceRecord;

  @Input()
  serviceTypes: ServiceType[];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.serviceTypesChecked = new Array();
    for (let serviceType of this.serviceTypes) {
      if (this.service.serviceId == 0) {
        this.serviceTypesChecked.push(0);
        this.service.serviceDate = new Date();
      } else {
        if (this.service.serviceTypes.find(x => x.serviceTypeId == serviceType.serviceTypeId))
          this.serviceTypesChecked.push(1);
        else
          this.serviceTypesChecked.push(0);
      }
      if (this.serviceTypesChecked.reduce((a, b) => a + b, 0) > 0)
        this.canSubmit = true;
    }
  }

  onSelectionChange(i: number, v: number, serviceType: ServiceType) {
    this.serviceTypesChecked[i] = v;
    if (this.serviceTypesChecked.reduce((a, b) => a + b, 0) > 0)
      this.canSubmit = true;
    else
      this.canSubmit = false;

    if (v == 1) {
      let item = { "serviceTypeId": serviceType.serviceTypeId, "serviceTypeName": serviceType.serviceTypeName };
      this.service.serviceTypes.splice(i, 0, item);

    } else {
      let index = this.service.serviceTypes.findIndex(i => i.serviceTypeId === serviceType.serviceTypeId);
      this.service.serviceTypes.splice(index, 1);
    }
    //console.log(this.service);

  }

  dateChange($event) {
    this.service.serviceDate = new Date($event.target.value);
  }

}
