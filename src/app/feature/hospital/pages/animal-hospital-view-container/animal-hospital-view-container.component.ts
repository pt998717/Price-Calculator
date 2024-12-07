import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CategoryModel } from '../../models/enum';
import { ProductType, ProductNavigationType, ProductTypeList, ProductTypeListArr } from '../../models/enum';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-animal-hospital-view-container',
    templateUrl: './animal-hospital-view-container.component.html',
    styleUrls: ['./animal-hospital-view-container.component.css']
})
export class AnimalHospitalViewContainerComponent implements OnInit {

    public formGroup!: FormGroup;
    public ProductTypeArr: Array<string> = [];
    public CategoryArr: CategoryModel[] = [];
    public TYPE: typeof ProductType = ProductType;
    public CurrentProductType: number = -1;
    public ProductList = ProductTypeList;
    // To do, get pannel state from service control the visible
    public isVisible = false;
    private readonly subscriptions = new Subscription();
    selectedAnimal: string = '';
    isComponentVisible = false;

    constructor(
        private formBuilder: FormBuilder
    ) { }

    // selectAnimal(animal: string) {
    //     this.selectedAnimal = animal;
    // }
    // showBom() {
    //     this.isComponentVisible = true;
    // }

    // onFormChanged() {
    //     this.isComponentVisible = false; // Hide the component when the form changes
    // }

    ngOnInit(): void {
        this.initListener();
        this.initFormGroup();
        this.ProductTypeArr = ProductTypeListArr;
        this.CategoryArr = this.ProductTypeArr.map((item, index) => {
            return {
                id: index,
                category: item,
                order: 1,
            }
        })
    }


    initListener(): void {
        // To Do, initial listener here, call service and listen the panel state
    }

    initFormGroup(): void {
        this.formGroup = this.formBuilder.group({
            ProductType: -1,
        })
    }

    OnSelectionChanged($event: any, id: number): void {
        this.formGroup.get('ProductType')?.setValue(id);
        this.CurrentProductType = parseInt(
            this.formGroup.get('ProductType')?.value,
        )
    }

}
