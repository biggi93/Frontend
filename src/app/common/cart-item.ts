import { Product } from "./product";

export class CartItem {
    id: string;
    name: string;
    imageUrl: string;
    unitPrice: number;

    quantity: number;

    constructor(product?: Product) {
        if(product) {
            this.id = product.id.toString();
            this.name = product.name;
            this.imageUrl = product.imageUrl;
            this.unitPrice = product.unitPrice;
    
            this.quantity = 1;
        } else {
            this.id = "";
            this.name = "";
            this.imageUrl = "";
            this.unitPrice = 0;
    
            this.quantity = 0;
        }
        
    }
}
