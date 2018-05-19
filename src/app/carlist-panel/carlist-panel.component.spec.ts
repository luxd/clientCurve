import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarlistPanelComponent } from './carlist-panel.component';

describe('CarlistPanelComponent', () => {
  let component: CarlistPanelComponent;
  let fixture: ComponentFixture<CarlistPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarlistPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarlistPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
