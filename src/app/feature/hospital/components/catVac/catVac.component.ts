import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validator, Validators } from '@angular/forms';
import { PriceService } from '../../services/catVac.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, } from 'rxjs/operators';
import { ProductType, ProductTypes, ProductTypeListArr } from '../../models/enum';
import { AnimalHostipal } from '../../services/animal-hospital.service';
@Component({
    selector: 'catVac',
    templateUrl: './catVac.component.html',
    styleUrls: ['./catVac.component.css']
})
export class CalComponent implements OnInit, OnDestroy {
    @Output() formChanged = new EventEmitter<void>(); // Event to notify parent
    public priceForm!: FormGroup;
    public basePrice: number = 0; // base price for the product
    public totalPrice: number = this.basePrice;
    private subscribe = new Subscription();
    constructor(private fb: FormBuilder, private animalHospital: AnimalHostipal) { }

    ngOnInit(): void {
        this.initialFormGroup();
        this.initialListener();
        this.restoreData();
        this.calculateTotalPrice();
    };

    initialFormGroup() {
        this.priceForm = this.fb.group({
            textInput: ["", Validators.required],
            Exam: [false],
            FelineP: [false],
            FHV1: [false],
            FelineC: [false],
            select: ['']
        });
    }


    initialListener() {
        this.subscribe.add(
            this.priceForm.valueChanges.subscribe((next) => {
                this.totalPrice = 0;
                this.calculateTotalPrice();
            })
        )
        this.subscribe.add(
            this.priceForm.valueChanges.pipe(debounceTime(300)).subscribe((newFormData) => {
                this.animalHospital.saveFormData(ProductTypes.Cat_Vaccine, newFormData)
            })
        )
    }

    restoreData() {
        var data = this.animalHospital.getSavedFormData(ProductTypes.Cat_Vaccine);
        console.log(data)
        this.priceForm.patchValue(data, { emitEvent: false })
    }

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

    calculateTotalPrice() {
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
        this.subscribe.unsubscribe();
    }
}