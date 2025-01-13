import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Validator, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AnimalHostipal } from '../../services/animal-hospital.service';
import { Subject, Subscription } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';
import { ProductTypes, ProductNavigationType, ProductType, ProductTypeList, ProductTypeListArr } from '../../models/enum';
@Component({
    selector: 'catWellness',
    templateUrl: './catWell.component.html',
    styleUrls: ['./catWell.component.css']
})
export class DogComponent implements OnInit, OnDestroy {
    @Output() formChanged = new EventEmitter<void>(); // Event to notify parent
    public wpriceForm!: FormGroup;
    public wbasePrice: number = 0;
    public wtotalPrice: number = this.wbasePrice;
    private subscribe = new Subscription();
    constructor(private fb: FormBuilder, private animalHospital: AnimalHostipal) {

    }
    ngOnInit(): void {
        this.initialFormGroup();
        this.initialListener();
        this.restoreData();
        this.calculateTotalPrice();
    }

    initialFormGroup() {
        this.wpriceForm = this.fb.group({
            textinput: ["", Validators.required],
            Washing: (false),
            HairCare: [false],
            Deworming: [false],
            select: "None",
            membership: [false, Validators.required],
        });
    }

    initialListener() {
        this.subscribe.add(
            this.wpriceForm.valueChanges.subscribe((next) => {
                this.wtotalPrice = 0;
                this.calculateTotalPrice();
            })
        )
        this.subscribe.add(
            this.wpriceForm.valueChanges.pipe(
                debounceTime(300)
            ).subscribe((data) => {
                this.animalHospital.saveFormData(ProductTypes.Cat_Wellness, data)})
        )
    }

    restoreData() {
        var data = this.animalHospital.getSavedFormData(ProductTypes.Cat_Wellness);
        this.wpriceForm.patchValue(data, { emitEvent: false })
    }

    addToBom(): void {
        if (this.wpriceForm.invalid) {
            this.wpriceForm.markAllAsTouched(); // Highlight all invalid fields
            return;
        }
        const formData = this.wpriceForm.value;
        //save data in service
        const success = this.animalHospital.addSelectedService('CatWellne', formData);
        const emptyInput = this.animalHospital.isBomEmpty;
        if (success) {
            this.animalHospital.switchProductType(ProductType.BOM);
        } else {
            alert('Duplicate data detected!');
        }
    }
    calculateTotalPrice() {
        this.wtotalPrice = this.wbasePrice;
        if (this.wpriceForm.get('Washing')?.value) {
            this.wtotalPrice += 79.99;
        }
        if (this.wpriceForm.get('HairCare')?.value) {
            this.wtotalPrice += 59.99;
        }
        if (this.wpriceForm.get('Deworming')?.value) {
            this.wtotalPrice += 109.99;
        }
        // if (this.wpriceForm.get('membership')?.value === 'yes') {
        //   this.wtotalPrice = this.wtotalPrice * 0.9;
        // }

    }
    ngOnDestroy(): void {
        this.subscribe.unsubscribe();
    }
}