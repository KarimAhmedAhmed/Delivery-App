
import { User } from '../entities/User';

export abstract class UserRepository {
  abstract findCustomerByUsername(username: string, role: 'Customer'): Promise<User | null>;
  abstract findDriverByUsername(username: string, role: 'Driver'): Promise<User | null>
  abstract findDriversByLocation(location: string, role: 'Driver'): Promise<User[] | null>

}
