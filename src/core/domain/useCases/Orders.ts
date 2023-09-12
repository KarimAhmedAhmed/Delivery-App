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
    const drivers = await this.sendOrderToDrivers(orderCreated);

    return drivers;
  }
  async updateOrder(orderId: string, obj: object) {
    const updateOrder = await this.orderRepository.updateOrder(orderId, obj);
    return updateOrder;
  }

  async sendOrderToDrivers(order: Order) {
    // const drivers = await this.userRepository.findDriversByLocation(
    //   order.pickUpPoint
    // );
    const drivers = await this.userRepository.getUsersByRole("Driver");

    drivers.forEach((driver) => {
      this.offerRepository.createOffer(order, driver, 0, "Pending");
    });

    return drivers;
  }

  async getOrderById(orderId: string) {
    const order = await this.orderRepository.getOrderById(orderId);
    return order;
  }

  async orderAccepted(offer: Offer | null) {
    //the customer accepted the driver
    const driverAcceptedByCustomer =
      await this.orderRepository.customerAcceptedDriver(offer);

    //TODO

    return driverAcceptedByCustomer;
  }
}
