import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-animal-hospital-view-container',
    templateUrl: './animal-hospital-view-container.component.html',
    styleUrls: ['./animal-hospital-view-container.component.css']
})
export class AnimalHospitalViewContainerComponent implements OnInit {

    selectedAnimal: string = '';
    isComponentVisible = false;
    selectAnimal(animal: string) {
        this.
            selectedAnimal = animal;
    }
    showBom() {
        this.isComponentVisible = true;
    }

    onFormChanged() {
        this.isComponentVisible = false; // Hide the component when the form changes
    }

    ngOnInit(): void {
    }

}
