import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnimalHospitalViewContainerComponent } from "./pages/animal-hospital-view-container/animal-hospital-view-container.component";

const routes: Routes = [
    {
        path: '',
        component: AnimalHospitalViewContainerComponent,
    }
]

@NgModule()