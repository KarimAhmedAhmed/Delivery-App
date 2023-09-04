import { UserRepository } from '../repositories/User';
import { PasswordService } from '../services/Password';
import { TokenService } from '../services/Token';

export class Auth {
  constructor(
    readonly userRepository: UserRepository,
    readonly passwordService: PasswordService,
    readonly tokenService: TokenService,
  ) {}

  async register(username: string, password: string) {
    const user = await this.userRepository.findCustomerByUsername(username,'Customer');
    if (!user) throw new Error(`User ${username} not found`);
    const validUser = await this.passwordService.comparePassword(user.password, password);
    if (!validUser) throw new Error(`invalid user`);
    const accessToken = this.tokenService.createAccessToken(username);

    return { accessToken: accessToken };
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findDriverByUsername(username,'Driver');
    if (!user) throw new Error(`User ${username} not found`);
    const validUser = await this.passwordService.comparePassword(user.password, password);
    if (!validUser) throw new Error(`invalid user`);
    const accessToken = this.tokenService.createAccessToken(username);

    return { accessToken: accessToken };
  }
}
