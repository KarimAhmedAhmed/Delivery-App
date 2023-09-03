import { Customer } from "./Customer";

export class Order {
 constructor(
    readonly customer: Customer,
    readonly items: string[],
    readonly price: BigInteger,
    readonly pickUpPoint: string,
    readonly dropDownPoint: string

 ){}
}