import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject(0);
  totalQuantity: Subject<number> = new BehaviorSubject(0);

  // storage: Storage = sessionStorage;
  storage: Storage = localStorage;

  constructor() {

    let data = JSON.parse(this.storage.getItem("cartItems")!);

    if (data) {
      this.cartItems = data;
      
      this.computeCartTotals(); 
    }
  }

  addToCart(cardItem: CartItem) {
    let alreadyExistingInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(
        (tempCartItem) => tempCartItem.id === cardItem.id
      );

      alreadyExistingInCart = existingCartItem?.id != undefined;
    }

    if (alreadyExistingInCart) {
      existingCartItem!.quantity++;
    } else {
      this.cartItems.push(cardItem);
    }

    this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    this.cartItems.forEach((currentCartItem) => {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    });

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);

    this.persistCartItem();
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    if (cartItem.quantity === 0) {
      this.remove(cartItem);
    } else {
      this.computeCartTotals();
    }
  }
  remove(cartItem: CartItem) {
    const index = this.cartItems.findIndex((ci) => ci.id === cartItem.id);

    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.computeCartTotals();
    }
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    this.cartItems.forEach((temp) => {
      console.log(
        `name: ${temp.name}, quantity=${temp.quantity}, unitPrice=${
          temp.unitPrice
        }, subTotalPrice=${temp.quantity * temp.unitPrice}`
      );
    });
    console.log(
      `totalPrice: ${totalPriceValue.toFixed(
        2
      )}, totalQuantity: ${totalQuantityValue}`
    );
    console.log('------');
  }

  persistCartItem() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
