import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DogService {
  private formSource$ = new BehaviorSubject<any>(null);
  wformData = this.formSource$.asObservable();

  private textSource$ = new BehaviorSubject<string>(''); // Default value
  currentText = this.textSource$.asObservable(); // Observable for subscribers

  constructor() { }

  setFormData(data: any) {
    this.formSource$.next(data);
  }

  getFormData(): any {
    return this.formSource$.value;
   
  }
}
