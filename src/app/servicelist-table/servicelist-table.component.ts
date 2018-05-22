import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServiceType } from '../serviceType';
import { ServiceRecord } from '../serviceRecord';
import { ServiceDialogComponent } from "../service-dialog/service-dialog.component";
import { DelConfirmDialogComponent } from "../del-confirm-dialog/del-confirm-dialog.component";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Car } from '../car';

@Component({
  selector: 'app-servicelist-table',
  templateUrl: './servicelist-table.component.html',
  styleUrls: ['./servicelist-table.component.css']
})
export class ServicelistTableComponent implements OnInit {
  closeResult: string;
  instruction: string;
  constructor(private modalService: NgbModal) { }

  @Input()
  isLoading: boolean;

  @Input()
  cars: Car[];

  @Input()
  selectedCarId: number;

  @Input()
  serviceTypes: ServiceType[];

  @Input()
  serviceRecords: ServiceRecord[];

  @Input()
  mapCarTypeServiceType: Map<number, number[]>;

  @Input()
  selectedCarTypeId: number;

  @Output()
  addUpdateService: EventEmitter<ServiceRecord> = new EventEmitter();

  @Output()
  deleteService: EventEmitter<ServiceRecord> = new EventEmitter();

  ngOnInit() {

  }
  addService() {
    let aService = new ServiceRecord();
    aService.serviceTypes = new Array<ServiceType>();
    this.open(aService, aService, 'Insert New Maintenance Record', 'Create');
  }
  openEdit(service) {
    let newService = Object.assign({}, service);
    newService.serviceTypes = Object.assign([], service.serviceTypes);
    let oldService = Object.assign({}, service);
    oldService.serviceTypes = Object.assign([], service.serviceTypes);
    this.open(newService, oldService, 'Edit Maintenance Record', 'Update');
  }

  deleteServiceRecord(service: ServiceRecord) {
    const modalRef = this.modalService.open(DelConfirmDialogComponent);
    modalRef.componentInstance.textConfirmation = 'Do you want to delete this maintenance record from list?';
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.deleteList(service);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private open(service: ServiceRecord, oldService: ServiceRecord, title: string, submitButton: string) {
    const modalRef = this.modalService.open(ServiceDialogComponent, { backdrop: 'static' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.submitButton = submitButton;
    modalRef.componentInstance.service = service;
    modalRef.componentInstance.serviceTypes = this.serviceTypes;
    modalRef.componentInstance.serviceTypesAvail = this.mapCarTypeServiceType.get(this.selectedCarTypeId);
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.createList(service);
    }, (reason) => {
      service = oldService;
      service.serviceTypes = Object.assign([], oldService.serviceTypes);
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  private createList(service: ServiceRecord) {
    this.addUpdateService.emit(service);
  }

  private deleteList(service: ServiceRecord) {
    this.deleteService.emit(service);
  }

  checkAllowed(carTypeId: number, serviceTypeId: number): boolean {
    let arr: number[] = this.mapCarTypeServiceType.get(this.selectedCarTypeId);
    if (arr == null)
      return false;
    if (this.mapCarTypeServiceType.get(this.selectedCarTypeId).find(x => x == serviceTypeId) == null)
      return false;
    else
      return true;
  }

  checkServiceDone(serviceList: ServiceType[], serviceTypeId: number): boolean {
    if (serviceList == null || serviceList.length == 0)
      return false;
    if (serviceList.find(x => x.serviceTypeId == serviceTypeId) == null)
      return false;
    else
      return true;

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


  getRightPanelMsg() {
    this.instruction = "";
    if (this.cars.length == 0)
      this.instruction = "Your car list is empty, please add a car into the list on the left panel!";
    else {
      if (this.selectedCarId == 0)
        this.instruction = "Looks like you haven't selected a car from the list on the left panel yet!";
      else {
        //to complete
      }

    }
    return this.instruction;
  }
}
