import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validator, Validators } from '@angular/forms';
import { PriceService } from '../../services/catVac.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductType, ProductNavigationType, ProductTypeList, ProductTypeListArr } from '../../models/enum';
import { AnimalHostipal } from '../../services/animal-hospital.service';
@Component({
    selector: 'catVac',
    templateUrl: './catVac.component.html',
    styleUrls: ['./catVac.component.css']
})
export class CalComponent implements OnInit {
    @Output() formChanged = new EventEmitter<void>(); // Event to notify parent
    public priceForm: FormGroup;
    basePrice: number = 0; // base price for the product
    totalPrice: number = this.basePrice;
    textInput: string = '';
    private unsubscribe$ = new Subject<void>(); // For cleanup
    constructor(private fb: FormBuilder, private priceService: PriceService, private animalHospital: AnimalHostipal) {
        this.priceForm = this.fb.group({
            textInput: ["", Validators.required],
            Exam: [false],
            FelineP: [false],
            FHV1: [false],
            FelineC: [false],
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
                this.formChanged.emit(); // Emit event when form changes
                this.calculateTotalPrice(formData);

            });
        this.priceService.currentText
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((text) => {
                this.textInput = text;
            });
    };

    addToBom(): void {
        if (this.priceForm.invalid) {
            this.priceForm.markAllAsTouched(); // Highlight all invalid fields
            return;
        }
        const formData = this.priceForm.value;
        //save data in service
        const success = this.animalHospital.addSelectedService('Catvaccine', formData);
        const emptyInput = this.animalHospital.isBomEmpty;
        if (success) {
            this.animalHospital.switchProductType(ProductType.BOM);
        } else {
            alert('Duplicate data detected!');
        }
      }

    updateText() {
        this.priceService.updateText(this.textInput);
    }

    calculateTotalPrice(formData: any) {
        this.totalPrice = this.basePrice;
        if (this.priceForm.get('Exam')?.value) {
            this.totalPrice += 49.99;
        }
        if (this.priceForm.get('FelineP')?.value) {
            this.totalPrice += 39.99;
        }
        if (this.priceForm.get('FHV1')?.value) {
            this.totalPrice += 58.99;
        }
        if (this.priceForm.get('FelineC')?.value) {
            this.totalPrice += 48.99;
        }
        switch (this.priceForm.get('select')?.value) {
            case 'NeuterM':
                this.totalPrice += 249.99;
                break;
            case 'NeuterF':
                this.totalPrice += 329.99;
                break;
        }

    }
    ngOnDestroy(): void {
        this.unsubscribe$.next(); // Signal all subscriptions to complete
        this.unsubscribe$.complete(); // Clean up the Subject
    }
}