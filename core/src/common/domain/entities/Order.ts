import { User } from "./User";

export class Order {
 constructor(
    readonly customer: User,
    readonly items: string[],
    readonly price: BigInteger,
    readonly pickUpPoint: string,
    readonly dropDownPoint: string,
    readonly status: 'Pending' | 'Delivered' | 'Cancelled' | 'On-The-Way'
 ){}
}