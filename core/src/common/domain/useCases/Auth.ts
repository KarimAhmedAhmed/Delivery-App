import UserRepository from '../../app/infrastructure/data-access/repositories/UserRepository';
import { User } from '../entities/User';
import { PasswordService } from '../services/Password';
import { TokenService } from '../services/Token';

export class Auth {
  constructor(
    readonly userRepository: UserRepository,
    // readonly passwordService: PasswordService,
    // readonly tokenService: TokenService,
  ) {}

  async register(username: string, password: string, role: string) {
    console.log("Auth---register")
    const user = new User(username,password,'Customer');
    console.log(user)
    const userCreated = await this.userRepository.createUser(user);
    console.log(userCreated)

    if (!userCreated) throw new Error(`User ${username} not found`);
    // const accessToken = this.tokenService.createAccessToken(username);

    return { userCreated: userCreated};
  }

  async login(username: string, password: string) {
    const user = new User(username,password,'Customer');

    const userCreated = await this.userRepository.createUser(user);
    if (!userCreated) throw new Error(`User ${username} not found`);
    // const validUser = await this.passwordService.comparePassword(user.password, password);
    // if (!validUser) throw new Error(`invalid user`);
    // const accessToken = this.tokenService.createAccessToken(username);

    // return { accessToken: accessToken };
  }
}
