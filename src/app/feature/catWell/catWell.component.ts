import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DogService } from '../catWell.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'catWellness',
  templateUrl: './catWell.component.html',
  styleUrls: ['./catWell.component.css']
})
export class DogComponent implements OnInit {
  wpriceForm: FormGroup;
  wbasePrice: number =0;
  wtotalPrice: number = this.wbasePrice;
  private unsubscribe$ = new Subject<void>(); // For cleanup
  constructor(private fb: FormBuilder, private DogService: DogService) { 
  this.wpriceForm = this.fb.group({
    wash: [false],
    hair: [false],
    deworming: [false],
    membership: [false]
  });
  this.DogService.wformData
      .pipe(takeUntil(this.unsubscribe$)) // Automatically unsubscribe when the component is destroyed
      .subscribe((savedData) => {
        if (savedData) {
          this.wpriceForm.setValue(savedData);
          this.calculateTotalPrice(savedData);
        }
      });
    }
  ngOnInit(): void {
    this.DogService.wformData
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((savedData) => {
      if (savedData && JSON.stringify(savedData) !== JSON.stringify(this.wpriceForm.value)) {
        this.wpriceForm.setValue(savedData, { emitEvent: false }); // Avoid triggering valueChanges
      }
    });
    this.wpriceForm.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((formData) => {
        if (JSON.stringify(formData) !== JSON.stringify(this.DogService.getFormData())) {
          this.DogService.setFormData(formData); // Update only if different
        }
        this.calculateTotalPrice(formData);
        
      });
      
  }

  calculateTotalPrice(formData: any) {
    this.wtotalPrice = this.wbasePrice;
    if (this.wpriceForm.get('wash')?.value) {
      this.wtotalPrice += 79.99; 
    }
    if (this.wpriceForm.get('hair')?.value) {
      this.wtotalPrice += 59.99; 
    }
    if (this.wpriceForm.get('deworming')?.value) {
      this.wtotalPrice += 109.99; 
    }
    // if (this.wpriceForm.get('membership')?.value === 'yes') {
    //   this.wtotalPrice = this.wtotalPrice * 0.9; 
    // }
    
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(); // Signal all subscriptions to complete
    this.unsubscribe$.complete(); // Clean up the Subject
  }

}