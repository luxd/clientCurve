import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-del-confirm-dialog',
  templateUrl: './del-confirm-dialog.component.html',
  styleUrls: ['./del-confirm-dialog.component.css']
})
export class DelConfirmDialogComponent implements OnInit {

  @Input()
  textConfirmation: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
