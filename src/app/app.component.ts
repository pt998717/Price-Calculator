import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedAnimal: string = '';
  isComponentVisible = false;
  selectAnimal(animal: string) {
    this.
    selectedAnimal = animal;
  }
  showBom() {
    this.isComponentVisible = true;
  }

}
