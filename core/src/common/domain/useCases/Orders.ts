import { Order } from "../entities/Order";
import { UserRepository } from "../repositories/User";
import { OrderRepository } from "../repositories/Order";
import { User } from "../entities/User";
import { location } from "../../app/utils/Middlewares";

export class Orders {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly orderRepository: OrderRepository
  ) {}

  async createOrder(
    customer: string,
    items: string[],
    price: number,
    pickUpPoint: location,
    dropDownPoint: location
  ) {
    const newOrder = new Order(
      customer,
      items,
      price,
      pickUpPoint,
      dropDownPoint,
      "Pending"
    );
    const orderCreated = await this.orderRepository.createOrder(
      customer,
      items,
      price,
      pickUpPoint,
      dropDownPoint
    );
    console.log(newOrder.pickUpPoint.coordinates.coordinates);
    const drivers = await this.sendOrderToDrivers(newOrder);

    return drivers;
  }

  async sendOrderToDrivers(order: Order) {
    const drivers = await this.userRepository.findDriversByLocation(
      order.pickUpPoint
    );
    console.log(drivers);
    const setDrivers = await this.orderRepository.setDriver(drivers, order);

    return drivers;
  }

  //   async orderPending(order: Order, driver: User, price: BigInteger) {
  //     //the driver raised the order price
  //     const raisePriceByDriver = await this.orderRepository.raisePriceByDriver(
  //       driver,
  //       order,
  //       price
  //     );
  //     if (!raisePriceByDriver) throw new Error();
  //     const updateOrder = await this.orderRepository.updateOrder(
  //       order,
  //       raisePriceByDriver
  //     );
  //     if (!updateOrder) throw new Error();
  //     const notifyTheCustomer = await this.orderRepository.notifyTheCustomer(
  //       driver,
  //       order
  //     );
  //     if (!notifyTheCustomer) throw new Error();

  //     return notifyTheCustomer;
  //   }
  //   async orderAccepted(order: Order, driver: User) {
  //     //the customer accepted the driver
  //     const driverAcceptedByCustomer =
  //       await this.orderRepository.customerAccepted(driver, order);
  //     if (!driverAcceptedByCustomer) throw new Error();
  //     //the driver accepted the order
  //     const orderAcceptedByDriver = await this.orderRepository.driverAccepted(
  //       driver,
  //       order
  //     );
  //     if (!orderAcceptedByDriver) throw new Error();

  //     let newOrder = new Order(
  //       order.customer,
  //       order.items,
  //       order.price,
  //       order.pickUpPoint,
  //       order.dropDownPoint,
  //       "On-The-Way"
  //     );
  //     const updateOrder = await this.orderRepository.updateOrder(order, newOrder);

  //     if (!updateOrder) throw new Error();
  //     //start the trip
  //     const startTrip = await this.orderRepository.startTrip(driver, order);

  //     //TODO

  //     return startTrip;
  //   }
}
