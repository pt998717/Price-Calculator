import { Component, OnInit, Input } from '@angular/core';
import { PriceService } from '../catVac.service';
import { DogService } from '../catWell.service';
import { RowStyle } from 'ag-grid-community';
@Component({
  selector: 'app-bom',
  templateUrl: './bom.component.html',
  styleUrls: ['./bom.component.css']
})
export class BomComponent implements OnInit {
  wformData: any;
  formData: any;
  totalPrice: number=0;
  hst:number = 0;
  finalPrice: number =0;
  discount: number = 0;
  final: number = 0;
  rate : number = 0;
  inputText: string = '';
  rowData: any[] = [];

  columnDefs =[
        { field: 'option', headerName: 'Option', width: 700},
        { field: 'price',headerName: 'Price($)', width: 150}
    ]
  

  
  constructor(
    private priceService: PriceService,
    private dogService: DogService) { 
    
  }

  ngOnInit(): void {
    
    this.dogService.wformData.subscribe((data) => {
      this.wformData = { ...data };
      this.updateRowData(); // Update combined row data
      this.totalPrice = this.calculateTotalAmount();
    });

    this.priceService.formData.subscribe((data) => {
      this.formData = { ...data };
      this.updateRowData(); // Update combined row data
      this.totalPrice = this.calculateTotalAmount();
    });

    this.priceService.currentText.subscribe((text) => {
      this.inputText = text;
    });

    
  }
 
  
  generateRowData(data: any): any[] {
    const rows = [];

    if (data.exam) rows.push({ option: 'Exam', price: 49.99 });
    if (data.core1) rows.push({ option: 'Feline panleukopenia virus', price: 39.99 });
    if (data.core2) rows.push({ option: 'Feline viral rhinotracheitis, also known as herpes virus type 1 (FHV-1)', price: 58.99 });
    if (data.core3) rows.push({ option: 'Feline caliciviruses', price: 48.99 });
    if (data.core4) rows.push({ option: 'Rabies virus', price: 48.99 });
    if (data.core5) rows.push({ option: 'Feline leukemia virus (FeLV)', price: 118.99 });
    if (data.noncore1) rows.push({ option: 'Chlamydophila felis (causes feline chlamydiosis)', price: 109.99 });
    if (data.noncore2) rows.push({ option: 'Bordetella bronchiseptica (causes feline bordetellosis)', price: 109.99 });
    if (data.noncore3) rows.push({ option: 'Feline leukemia virus (FeLV) in adult cats', price: 109.99 });
    if (data.wash) rows.push({ option: 'Washing', price: 79.99 });
    if (data.hair) rows.push({ option: 'Hair Care', price: 59.99 });
    if (data.deworming) rows.push({ option: 'Deworming', price: 109.99 });
    switch (data.select) {
      case 'Male':
        rows.push({ option: 'Neutering', price: 249.99 });
        break;
      case 'Female':
        rows.push({ option: 'Neutering', price: 329.99 });
        break;
    }
    return rows;
  }

  updateRowData(): void {
    const formDataRows = this.generateRowData(this.formData);
    const wformDataRows = this.generateRowData(this.wformData);
  
    // Calculate the total price
    this.totalPrice = parseFloat(this.calculateTotalAmount().toFixed(2));
    this.hst = parseFloat((this.totalPrice * 0.15).toFixed(2));
    this.finalPrice = this.totalPrice + this.hst;
    this.discount = parseFloat((this.finalPrice * this.rate).toFixed(2));
    this.final = parseFloat((this.finalPrice - this.discount).toFixed(2));
  
    // Define placeholder rows
    const placeholderRowA = { option: 'Cat Vaccine & Sterilization', price: null, isPlaceholder: true };
    const placeholderRowB = { option: 'Cat Wellness', price: null, isPlaceholder: true };
    const placeholderRowC = { option: 'SUBTOTAL', price: this.totalPrice, isPlaceholder: false };
    const placeholderRowD = { option: 'HST', price: this.hst, isPlaceholder: false };
    const placeholderRowE = { option: 'DISCOUNT', price: null, isPlaceholder: true };
    const placeholderRowF = { option: 'TOTAL', price: this.final, isPlaceholder: true };
  
    // Combine rows
    this.rowData = [
      placeholderRowA,
      ...formDataRows,
      placeholderRowB,
      ...wformDataRows,
      placeholderRowC,
      placeholderRowD,
      placeholderRowE,
      this.getMembershipRow(),
      placeholderRowF
    ];
  
    console.log('Updated Total Price:', this.totalPrice);
  }

  //Discount row separated from wformdata
  getMembershipRow(): any | null {
    if (this.wformData?.membership === 'yes') {
        return { option: 'Membership Discount', price: -this.discount.toFixed(2) };
    }
    return null; // No membership row if no discount applies
  }
  //Default line style
  getRowStyle(params: any): RowStyle | undefined {
    if (params.data) {
        if (params.data.isPlaceholder) {
            return {
                background: '#f4f4f4',
                'font-weight': 'bold',
                'text-align': 'left',
            };
        }
        if (params.data.option === 'SUBTOTAL' || params.data.option === 'HST') {
          return {
              background: '#f4f4f4',
              'font-weight': 'bold',
          };
        }

        if (params.data.option === 'Membership Discount') {
            return {
                color: 'red', // Set font color to red
                'font-weight': 'bold', // Optional: Bold font
            };
        }
    }

    return undefined; // Use default styles
}

 

  calculateTotalAmount(): number { 
    this.totalPrice=0;
    this.rate = 0;
    const allData = { ...this.formData, ...this.wformData };
    if (allData.exam) {this.totalPrice += 49.99; }
    if (allData.core1) {this.totalPrice += 39.99; }
    if (allData.core2) {this.totalPrice += 58.99;}
    if (allData.core3) {this.totalPrice += 48.99; }
    if (allData.core4) {this.totalPrice += 48.99;}
    if (allData.core5) {this.totalPrice += 118.99; }
    if (allData.noncore1) {this.totalPrice += 109.99; }
    if (allData.noncore2) {this.totalPrice += 109.99;}
    if (allData.noncore3) {this.totalPrice += 109.99; }
    if (allData.wash) {this.totalPrice += 79.99; }
    if (allData.hair) {this.totalPrice += 59.99;}
    if (allData.deworming) {this.totalPrice += 109.99; }
    if (allData.membership === 'yes') {this.rate = 0.1;}
    switch (allData.select){
      case 'Male':
        this.totalPrice += 249.99;
        break;
      case 'Female':
        this.totalPrice += 329.99;
        break;
    }
    return this.totalPrice;
  }

}
