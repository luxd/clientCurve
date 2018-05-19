import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelConfirmDialogComponent } from './del-confirm-dialog.component';

describe('DelConfirmDialogComponent', () => {
  let component: DelConfirmDialogComponent;
  let fixture: ComponentFixture<DelConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
