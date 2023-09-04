import { Order } from "../entities/Order";
import { UserRepository } from "../repositories/User";
import { OrderRepository } from "../repositories/Order";
import { User } from "../entities/User";

  class Orders{

    constructor(
        readonly userRepository: UserRepository,
        readonly orderRepository: OrderRepository
      ) {}

    async makeAnOrder(username: string, items: string[], price:BigInteger, pickUpPoint: string, dropDownPoint: string){
        // Get the owner of the order by username
        const user = await this.userRepository.findCustomerByUsername(username,'Customer');
        if (!user) throw new Error(`User ${username} not found`);
        const order = await this.orderRepository.createOrder(items, price, pickUpPoint, dropDownPoint, user);
        if(!order) throw new Error(`order has not saved`);

        return order;
    }

    async sendOrderToDrivers(order: Order){

        const drivers = await this.userRepository.findDriversByLocation(order.pickUpPoint,'Driver');
        if(!drivers) throw new Error();
        const setDrivers = await this.orderRepository.setDriver(drivers,order);
        if(!setDrivers) throw new Error();
        
        return setDrivers;
    }
    async orderPending(order: Order, driver: User, price: BigInteger){
        //the driver raised the order price
        const raisePriceByDriver = await this.orderRepository.raisePriceByDriver(driver,order,price);
        if(!raisePriceByDriver) throw new Error();
        const updateOrder = await this.orderRepository.updateOrder(order,raisePriceByDriver);
        if(!updateOrder) throw new Error();
        const notifyTheCustomer = await this.orderRepository.notifyTheCustomer(driver, order);
        if(!notifyTheCustomer) throw new Error();

        return notifyTheCustomer;

    }
    async orderAccepted(order: Order, driver: User){
        //the customer accepted the driver
        const driverAcceptedByCustomer =  await this.orderRepository.customerAccepted(driver,order);
        if(!driverAcceptedByCustomer) throw new Error(); 
            //the driver accepted the order
        const orderAcceptedByDriver =  await this.orderRepository.driverAccepted(driver,order);
        if(!orderAcceptedByDriver) throw new Error();
        
        let newOrder = new Order(order.customer, order.items, order.price, order.pickUpPoint, order.dropDownPoint, 'On-The-Way');
        const updateOrder = await this.orderRepository.updateOrder(order, newOrder);
        
        if(!updateOrder) throw new Error();
        //start the trip
        const startTrip =  await this.orderRepository.startTrip(driver, order);
        
        //TODO


       return startTrip; 

    }
}

export default Orders;