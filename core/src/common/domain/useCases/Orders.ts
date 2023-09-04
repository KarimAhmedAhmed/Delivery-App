import { Driver } from "../entities/Driver";
import { Order } from "../entities/Order";
import { CustomerRepository } from "../repositories/Customer";
import { DriverRepository } from "../repositories/Driver";
import { OrderRepository } from "../repositories/Order";

export class Orders{

    constructor(
        readonly customerRepository: CustomerRepository,
        readonly driverRepository: DriverRepository,
        readonly orderRepository: OrderRepository
      ) {}

    async makeAnOrder(username: string, items: string[], price:BigInteger, pickUpPoint: string, dropDownPoint: string){
        // Get the owner of the order by username
        const user = await this.customerRepository.findCustomerByUsername(username);
        if (!user) throw new Error(`User ${username} not found`);
        const order = await this.orderRepository.createOrder(items, price, pickUpPoint, dropDownPoint, user);
        if(!order) throw new Error(`order has not saved`);

        return order;
    }

    async sendOrderToDrivers(order: Order){

        const drivers = await this.driverRepository.findDriversByLocation(order.pickUpPoint);
        if(!drivers) throw new Error();
        const setDrivers = await this.orderRepository.setDriver(drivers,order);
        if(!setDrivers) throw new Error();
        
        
    }
    async orderPending(order: Order, driver: Driver, price: BigInteger){
        //the driver raised the order price
        const raisePriceByDriver = await this.orderRepository.raisePriceByDriver(driver,order,price);
        if(!raisePriceByDriver) throw new Error();
        const updateOrder = await this.orderRepository.updateOrder(order,raisePriceByDriver);
        if(!updateOrder) throw new Error();
        const notifyTheCustomer = await this.orderRepository.notifyTheCustomer(order,driver);
        if(!notifyTheCustomer) throw new Error();

        return notifyTheCustomer;

    }
    async orderAccepted(order: Order, driver: Driver){
        //the customer accepted the driver
        const driverAcceptedByCustomer =  await this.orderRepository.customerAccepted(driver,order);
        if(!driverAcceptedByCustomer) throw new Error(); 
        //the driver accepted the order
       const orderAcceptedByDriver =  await this.orderRepository.driverAccepted(driver,order);
       if(!orderAcceptedByDriver) throw new Error(); 
       //start the trip
       const startTrip =  await this.orderRepository.startTrip(driver, order);
    
       return startTrip; 

    }
}