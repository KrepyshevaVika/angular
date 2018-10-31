import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TreeComponent } from './tree/tree.component';
import { TableComponent } from './table/table.component';
import { MyTableComponent } from './my-table/my-table.component';
import { DataService } from './data.service';
import { ListComponent } from './list/list.component';
import { FormWithFieldsComponent } from './form-with-fields/form-with-fields.component';
import { MasonryComponent } from './masonry/masonry.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    TableComponent,
    MyTableComponent,
    ListComponent,
    FormWithFieldsComponent,
    MasonryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
