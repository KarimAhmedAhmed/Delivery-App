import { CustomerRepository } from '../repositories/Customer';
import { DriverRepository } from '../repositories/Driver';
import { PasswordService } from '../services/Password';
import { TokenService } from '../services/Token';

export class Auth {
  constructor(
    readonly customerRepository: CustomerRepository,
    readonly driverRepository: DriverRepository,
    readonly passwordService: PasswordService,
    readonly tokenService: TokenService,
  ) {}

  async customerLogin(username: string, password: string) {
    const user = await this.customerRepository.findCustomerByUsername(username);
    if (!user) throw new Error(`User ${username} not found`);
    const validUser = await this.passwordService.comparePassword(user.password, password);
    if (!validUser) throw new Error(`invalid user`);
    const accessToken = this.tokenService.createAccessToken(username);

    return { accessToken: accessToken };
  }

  async driverLogin(username: string, password: string) {
    const user = await this.driverRepository.findDriverByUsername(username);
    if (!user) throw new Error(`User ${username} not found`);
    const validUser = await this.passwordService.comparePassword(user.password, password);
    if (!validUser) throw new Error(`invalid user`);
    const accessToken = this.tokenService.createAccessToken(username);

    return { accessToken: accessToken };
  }
}
