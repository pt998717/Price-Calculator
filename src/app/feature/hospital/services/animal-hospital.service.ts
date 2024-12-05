import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

//data type
export interface SelectedService {
    id: number;
    componentName: string;
    data: any;
}

@Injectable({
    providedIn: 'root',
})
export class AnimalHostipal {
    productTypeChanged: EventEmitter<number> = new EventEmitter<number>();

    //Behavior Subject to listent the service changed
    private _selectedServices = new BehaviorSubject<SelectedService[]>([]);
    selectedServices$ = this._selectedServices.asObservable();
    private nextId = 1;
    selectedProductType: number = -1;
    private formState = new BehaviorSubject<any>(null);
    private formState_ServiceBundle = new BehaviorSubject<any>(null);
    private panelState = new BehaviorSubject<boolean>(false);
    private formData: { [key: string]: any } = {};
    addSelectedService(componentName: string, data: any): boolean {
        const selectedService: SelectedService = {
            id: this.nextId++,
            componentName: componentName,
            data: data,
        };

        // const sku: SelectedService = {
        //     id: selectedService.id,
        //     componentName: 'sku',
        //     data: data.SKU,
        // };

        const currentServices = this._selectedServices.value;
        const duplicateData = currentServices.find(
            (service) =>
                service.componentName === componentName && JSON.stringify(service.data) === JSON.stringify(data),
        );

        if (duplicateData) {
            this.savePanelState(false);
            return false;
        }
        this._selectedServices.next([...currentServices, selectedService]);
        this.savePanelState(true);
        return true;
    }

    //remove service
    removeSelectedService(id: number) {
        const currentServices = this._selectedServices.value;
        const updatedServices = currentServices.filter(service => service.id !== id);
        this._selectedServices.next(updatedServices);
    }

    //clear the data in service
    clearSelectedServices() {
        this._selectedServices.next([]);
    }

    //see if the data in service is empty
    isBomEmpty(): boolean {
        return this._selectedServices.value.length === 0;
    }


    saveFormData(key: string, data: any) {
        this.formData[key] = data;
    }

    getSavedFormData(key: string) {
        return this.formData[key];
    }
    clearSavedFormData() {
        this.formData = {};
    }

    getPanelState(): Observable<boolean> {
        return this.panelState.asObservable();
    }

    savePanelState(state: boolean): void {
        this.panelState.next(state);
    }

    getFormState(): Observable<any> {
        return this.formState.asObservable();
    }

    saveFormState(state: any): void {
        this.formState.next(state);
    }

    clearFormState(): void {
        this.formState.next(null);
    }

    getFormState_ServiceBundle(): Observable<any> {
        return this.formState_ServiceBundle.asObservable();
    }

    saveFormState_ServiceBundle(state: any): void {
        this.formState_ServiceBundle.next(state);
    }

    clearFormState_ServiceBundle(): void {
        this.formState_ServiceBundle.next(null);
    }


    constructor() { }
}