import { Order } from "../entities/Order";
import { CustomerRepository } from "../repositories/Customer";
import { DriverRepository } from "../repositories/Driver";
import { OrderRepository } from "../repositories/Order";
import { TokenService } from "../services/Token";

export class Orders{

    constructor(
        readonly customerRepository: CustomerRepository,
        readonly driverRepository: DriverRepository,
        readonly orderRepository: OrderRepository,
        readonly tokenService: TokenService,
      ) {}

    async makeAnOrder(username: string, items: string[], price:BigInteger, pickUpPoint: string, dropDownPoint: string){
        // Get the owner of the order by username
        const user = await this.customerRepository.findCustomerByUsername(username);
        if (!user) throw new Error(`User ${username} not found`);
        const order = await this.orderRepository.createOrder(items, price, pickUpPoint, dropDownPoint, user);
        if(!order) throw new Error(`order has not saved`);

        return order;
    }

    async assignToDriver(order: Order){

        const drivers = await this.driverRepository.findDriversByLocation(order.pickUpPoint);
        if(!drivers) throw new Error();
        const setDriver = await this.orderRepository.setDriver(drivers,order);
        if(!setDriver) throw new Error();
        
        
    }

    async orderJourney(order: Order, ){

    }
}