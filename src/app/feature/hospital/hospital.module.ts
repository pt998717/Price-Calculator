
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalRoutingModule } from './hospital-routing.module';
import { AnimalHostipal } from './services/animal-hospital.service';
import { AgGridModule } from 'ag-grid-angular';
import { AnimalHospitalViewContainerComponent } from './pages/animal-hospital-view-container/animal-hospital-view-container.component';
import { BomComponent } from './components/bom/bom.component';
import { FormsModule } from '@angular/forms';
import { CalComponent } from './components/catVac/catVac.component';
import { DogComponent } from './components/catWell/catWell.component';
import { ReactiveFormsModule } from '@angular/forms';
const pages = [AnimalHospitalViewContainerComponent];
const components = [
    BomComponent,
    CalComponent,
    DogComponent
];

@NgModule({
    declarations: [
        ...pages,
        ...components,
    ],
    imports: [CommonModule, HospitalRoutingModule, AgGridModule, FormsModule, ReactiveFormsModule],
    providers: [AnimalHostipal],
})
export class HospitalModule { }

