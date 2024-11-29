import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DogService {
  private formSource$ = new BehaviorSubject<any>(null);
  formData = this.formSource$.asObservable();

  private textSource$ = new BehaviorSubject<string>(''); // Default value
  currentText = this.textSource$.asObservable(); // Observable for subscribers

  constructor() { }
  updateText(text: string) {
    this.textSource$.next(text); // Update the text
  }
  setFormData(data: any) {
    this.formSource$.next(data);
  }

  getFormData(): any {
    return this.formSource$.value;
   
  }
}
