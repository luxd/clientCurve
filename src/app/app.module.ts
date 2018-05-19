import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { CarListComponent } from './car-list/car-list.component';
import { CarlistPanelComponent } from './carlist-panel/carlist-panel.component';
import { ServicelistTableComponent } from './servicelist-table/servicelist-table.component';
import { CarApiService } from './car-api.service';
import { CarDataService } from './car-data.service';
import { HttpModule } from '@angular/http';
import { CarDialogComponent } from './car-dialog/car-dialog.component';
import { DelConfirmDialogComponent } from './del-confirm-dialog/del-confirm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    CarlistPanelComponent,
    ServicelistTableComponent,
    CarDialogComponent,
    DelConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    NgbModule,
  ],
  providers: [CarApiService, CarDataService],
  bootstrap: [AppComponent],
  entryComponents: [DelConfirmDialogComponent, CarDialogComponent]
})
export class AppModule { }
