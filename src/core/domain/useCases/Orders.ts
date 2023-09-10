import { Order } from "../entities/Order";
import { UserRepository } from "../repositories/User";
import { OrderRepository } from "../repositories/Order";
import { OfferRepository } from "../repositories/Offer";
import { Offer } from "../entities/Offer";
import { location } from "../types/location";

export class Orders {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly orderRepository: OrderRepository,
    private readonly offerRepository: OfferRepository
  ) {}

  async createOrder(
    customer: string,
    items: string[],
    price: number,
    pickUpPoint: location,
    dropDownPoint: location,
    token: string
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
      dropDownPoint,
      token
    );
    console.log(newOrder.pickUpPoint.coordinates.coordinates);
    const drivers = await this.sendOrderToDrivers(newOrder);

    return drivers;
  }
  async updateOrder(orderId: string, obj: object) {
    const updateOrder = await this.orderRepository.updateOrder(orderId, obj);
    return updateOrder;
  }

  async sendOrderToDrivers(order: Order) {
    const drivers = await this.userRepository.findDriversByLocation(
      order.pickUpPoint
    );
    console.log(drivers);

    drivers.forEach((driver) => {
      this.offerRepository.createOffer(order, driver, 0, "Pending");
    });

    return drivers;
  }

  async getOrderById(orderId: string) {
    const order = await this.orderRepository.getOrderById(orderId);
    return order;
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
  async orderAccepted(offer: Offer, token: string) {
    //the customer accepted the driver
    const driverAcceptedByCustomer =
      await this.orderRepository.customerAcceptedDriver(offer);

    //   //start the trip
    // const startTrip = await this.orderRepository.startTrip(driver, order);

    //TODO

    return driverAcceptedByCustomer;
  }
}
