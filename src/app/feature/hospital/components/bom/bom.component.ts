import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AnimalHostipal, SelectedService  } from '../../services/animal-hospital.service';
type ServicePrices = {
    Exam: number;
    FelineP: number;
    FHV1: number;
    FelineC: number;
    NeuterM: number;
    NeuterF: number;
    wash: number;
    hair: number;
    deworming: number;
  };
@Component({
    selector: 'app-bom',
    templateUrl: './bom.component.html',
    styleUrls: ['./bom.component.css']
})
export class BomComponent implements OnInit {

    rowData: any[] = [];
    savedServices: SelectedService[] = [];

    columnDefs = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Pet Name'},
        { field: 'componentName', headerName: 'Service', rowGroup: true },
        { field: 'package', headerName: 'Package'},
        { field: 'price', headerName: 'Price'},
         // Ensure grouping is enabled
      ];
      defaultColDef = {
        flex: 1,
        sortable: true,
        resizable: true,
      };


    // Price mapping for each option
    private servicePrices = {
        Exam: 49.99,
        FelineP: 39.99,
        FHV1: 58.99,
        FelineC: 48.99,
        NeuterM: 249.99,
        NeuterF: 329.99,
        wash: 79.99,
        hair: 59.99,
        deworming: 109.99,
    };


    constructor(
        private animalHospital: AnimalHostipal) {


    }

    ngOnInit(): void {

        this.animalHospital.selectedServices$.subscribe(services => {
            this.rowData = services.map(service => {
              // Determine the correct name based on the situation
              const name = this.getServiceName(service);

              return {
                id: service.id,
                name: name, // Use the determined name
                componentName: service.componentName,
                package: this.getPackageField(service.data),
                price: this.calculatePrice(service.data).toFixed(2) // Use the calculated price
              };
            });
          });

    }

    getServiceName(service: any): string {
        if (service.data.textinput) {
          // Use the special name for the first situation
          return service.data.textinput || '';
        } else {
          // Use the standard name for the second situation
          return service.data.textInput || '';
        }
      }

    getPackageField(data: any): string {
        const fields = ['Exam', 'FelineP', 'FHV1', 'FelineC','wash','hair','deworming']; // Specify the fields to include
        const activeFields = fields.filter(field => data[field]); // Check which fields are true
        // Add the select field if a value is chosen
        if (data.select && data.select!='1' && data.select!='2' && data.select!='None') {
            activeFields.push(data.select);
        }
        return activeFields.join(' + '); // Join them with a '+' separator
      }

      calculatePrice(data: any): number {
        const fields: (keyof ServicePrices)[] = ['Exam', 'FelineP', 'FHV1', 'FelineC','wash','hair','deworming'];
        let totalPrice = 0;

        // Sum prices for selected options
        fields.forEach(field => {
          if (data[field]) {
            totalPrice += this.servicePrices[field];
          }
        });

        // Add price for the 'select' field if it matches a valid option
        if (data.select && this.servicePrices[data.select as keyof ServicePrices]) {
          totalPrice += this.servicePrices[data.select as keyof ServicePrices];
        }

        return totalPrice;
      }
    onGridReady(params: any) {
        params.api.sizeColumnsToFit();
      }

}
