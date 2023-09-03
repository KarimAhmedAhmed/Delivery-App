import { Customer } from '../entities/Customer';

export abstract class CustomerRepository {
  abstract findCustomerByUsername(username: string): Promise<Customer | null>;
}
