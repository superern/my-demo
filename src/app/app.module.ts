import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from "@angular/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AgGridModule} from "ag-grid-angular";

import {ToastrModule} from "ngx-toastr";
import {ModalModule} from "ngx-bootstrap";
import {FormsModule} from "@angular/forms";

import {UserService} from "./_service/user.service";
import { AppComponent } from './app.component';
import {AgGridComponent} from './ag-grid/ag-grid.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';


@NgModule({
  declarations: [
      AppComponent,
      AgGridComponent,
      CreateUserComponent,
      EditUserComponent
  ],
  imports: [
      HttpModule,
      BrowserModule,
      AgGridModule.withComponents([]),
      BrowserAnimationsModule, // required animations module
      ToastrModule.forRoot(), // ToastrModule added
      ModalModule.forRoot(), // Modals,
      FormsModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
