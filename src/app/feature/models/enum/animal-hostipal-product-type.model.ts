export enum ProductType{
    Cat_Vaccine = 0,
    Cat_Wellness = 1
}

export enum ProductTypes {
    Cat_Vaccine = 'Cat Vaccine & Sterilaization',
    Cat_Wellness = 'Cat Wellness'
}

export class ProductTypeList {
    static Cat_Vaccine = 'Cat Vaccine & Sterilaization';
    static Cat_Wellness = 'Cat Wellness';
}

export var ProductTypeListArr: string[] = new Array(
    `${ProductTypeList.Cat_Vaccine}`,
    `${ProductTypeList.Cat_Wellness}`,
);

export enum ProductNavigationType {
    Animal_Calculator = 1,
    Animal_BOM = 2,
}