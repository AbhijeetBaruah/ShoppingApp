import { ShoppingCartItem } from "./shopping-cart-item";

export interface Consumer{
    items?:ShoppingCartItem[];
    Name:string;
    Address:string[];
    City:string;
    OrderTime?:number;
    TotalPrice:number;
    user:string;
    OrderCompleted:boolean;
}