import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PriceService } from '../catVac.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'catVac',
  templateUrl: './catVac.component.html',
  styleUrls: ['./catVac.component.css']
})
export class CalComponent implements OnInit {
  priceForm: FormGroup;
  basePrice: number = 0; // base price for the product
  totalPrice: number = this.basePrice;
  textInput: string = '';
  private unsubscribe$ = new Subject<void>(); // For cleanup
  constructor(private fb: FormBuilder, private priceService: PriceService) { 
    this.priceForm = this.fb.group({
      textInput:"",
      exam: [false],
      core1: [false],
      core2: [false],
      core3: [false],
      core4: [false],
      core5: [false],
      noncore1: [false],
      noncore2: [false],
      noncore3: [false],
      select: ['']
    });
    this.priceService.formData
      .pipe(takeUntil(this.unsubscribe$)) // Automatically unsubscribe when the component is destroyed
      .subscribe((savedData) => {
        if (savedData) {
          this.priceForm.setValue(savedData);
          this.calculateTotalPrice(savedData);
        }
      });
  
    // Subscribe to text changes from the service
    this.priceService.currentText
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((text) => {
        this.textInput = text;
      });
  }

  
  ngOnInit(): void {
    this.priceService.formData
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((savedData) => {
      if (savedData && JSON.stringify(savedData) !== JSON.stringify(this.priceForm.value)) {
        this.priceForm.setValue(savedData, { emitEvent: false }); // Avoid triggering valueChanges
      }
    });
    this.priceForm.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((formData) => {
        if (JSON.stringify(formData) !== JSON.stringify(this.priceService.getFormData())) {
          this.priceService.setFormData(formData); // Update only if different
        }
        this.calculateTotalPrice(formData);
        
      });
      this.priceService.currentText
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((text) => {
        this.textInput = text;
      });
    };
    
  

  updateText() {
    this.priceService.updateText(this.textInput);
  }
  
  calculateTotalPrice(formData: any) {
    this.totalPrice = this.basePrice;
    if (this.priceForm.get('exam')?.value) {
      this.totalPrice += 49.99; 
    }
    if (this.priceForm.get('core1')?.value) {
      this.totalPrice += 39.99; 
    }
    if (this.priceForm.get('core2')?.value) {
      this.totalPrice += 58.99; 
    }
    if (this.priceForm.get('core3')?.value) {
      this.totalPrice += 48.99; 
    }
    if (this.priceForm.get('core4')?.value) {
      this.totalPrice += 58.99; 
    }
    if (this.priceForm.get('core5')?.value) {
      this.totalPrice += 118.99; 
    }
    if (this.priceForm.get('noncore1')?.value) {
      this.totalPrice += 109.99; 
    }
    if (this.priceForm.get('noncore2')?.value) {
      this.totalPrice += 109.99; 
    }
    if (this.priceForm.get('noncore3')?.value) {
      this.totalPrice += 109.99; 
    }
    switch (this.priceForm.get('select')?.value){
      case 'Male':
        this.totalPrice += 249.99;
        break;
      case 'Female':
        this.totalPrice += 329.99;
        break;
    }
    
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(); // Signal all subscriptions to complete
    this.unsubscribe$.complete(); // Clean up the Subject
  }
}