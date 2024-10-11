export interface Product {
    id:string,
    product_name:string,
    description:string,
    price:number,
    photo_url:string[],
    quantity:string
    productCategoryId: string;
}