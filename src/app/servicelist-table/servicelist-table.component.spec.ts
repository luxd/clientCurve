import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicelistTableComponent } from './servicelist-table.component';

describe('ServicelistTableComponent', () => {
  let component: ServicelistTableComponent;
  let fixture: ComponentFixture<ServicelistTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicelistTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicelistTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
