import { Component, OnInit, Input } from '@angular/core';
import { PriceService } from '../catVac.service';
import { AutoWidthCalculator } from 'ag-grid-community';
@Component({
  selector: 'app-bom',
  templateUrl: './bom.component.html',
  styleUrls: ['./bom.component.css']
})
export class BomComponent implements OnInit {
  formData: any;
  basePrice: number = 0;
  totalPrice: number = this.basePrice;
  finalPrice: number = 0;
  inputText: string = '';


  columnDefs =[
        { field: 'option', headerName: 'Option', width: 700},
        { field: 'price',headerName: 'Price($)', width: 150}
    ]
  
  rowData: any[] = [];
  
  constructor(private priceService: PriceService) { 
    
  }

  ngOnInit(): void {
    
    this.formData = this.priceService.getFormData();

    console.log(this.formData);
    if(this.formData){
      this.rowData = this.generateRowData(this.formData);
      this.calculateTotalAmount(this.formData);
    }

    this.priceService.currentText.subscribe((text) => {
      this.inputText = text;
    });
    
  }
 
  
  generateRowData(data: any): any[] {
    const rows = [];

    if (data.exam) rows.push({ option: 'Exam', price: 50 });
    if (data.core1) rows.push({ option: 'Feline panleukopenia virus', price: 50 });
    if (data.core2) rows.push({ option: 'Feline viral rhinotracheitis, also known as herpes virus type 1 (FHV-1)', price: 50 });
    if (data.core3) rows.push({ option: 'Feline caliciviruses', price: 50 });
    if (data.core4) rows.push({ option: 'Rabies virus', price: 50 });
    if (data.core5) rows.push({ option: 'Feline leukemia virus (FeLV)', price: 50 });
    if (data.noncore1) rows.push({ option: 'Chlamydophila felis (causes feline chlamydiosis)', price: 100 });
    if (data.noncore2) rows.push({ option: 'Bordetella bronchiseptica (causes feline bordetellosis)', price: 100 });
    if (data.noncore3) rows.push({ option: 'Feline leukemia virus (FeLV) in adult cats', price: 100 });

    switch (data.select) {
      case 'Male':
        rows.push({ option: 'Neutering', price: 250 });
        break;
      case 'Female':
        rows.push({ option: 'Neutering', price: 320 });
        break;
    }
    console.log(rows);
    return rows;
  }



  calculateTotalAmount(data: any): number { 
    this.totalPrice = this.basePrice;
    if (this.formData.exam) {this.totalPrice += 50; }
    if (this.formData.core1) {this.totalPrice += 50; }
    if (this.formData.core2) {this.totalPrice += 50;}
    if (this.formData.core3) {this.totalPrice += 50; }
    if (this.formData.core4) {this.totalPrice += 50;}
    if (this.formData.core5) {this.totalPrice += 50; }
    if (this.formData.noncore1) {this.totalPrice += 100; }
    if (this.formData.noncore2) {this.totalPrice += 100;}
    if (this.formData.noncore3) {this.totalPrice += 100; }
    switch (this.formData.select){
      case 'Male':
        this.totalPrice += 250;
        break;
      case 'Female':
        this.totalPrice += 320;
        break;
    }
    return this.totalPrice;
  }

}
