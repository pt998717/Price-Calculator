import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { CalComponent } from './feature/catVac/catVac.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import { BomComponent } from './feature/bom/bom.component';
import { AgGridModule } from 'ag-grid-angular';
import { DogComponent } from './feature/catWell/catWell.component';
import { AnimalHospitalViewContainerComponent } from './pages/animal-hospital-view-container/animal-hospital-view-container.component';
@NgModule({
  declarations: [
    AppComponent,
    CalComponent,
    BomComponent,
    DogComponent,
    AnimalHospitalViewContainerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

