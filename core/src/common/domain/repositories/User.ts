
import { User } from '../entities/User';
import { Model } from 'mongoose';

export class UserRepository {
    constructor(private readonly userModel: Model<User> ) {}



    async createUser(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return await newUser.save();
    }

    async getUserById(userId: string): Promise<User | null> {
        return await this.userModel.findById(userId).exec();
    }

 

}


// export abstract class UserRepository {
//   abstract createUser(username: string, password: string, role: string): Promise<User | null>;
//   abstract findCustomerByUsername(username: string, role: 'Customer'): Promise<User | null>;
//   abstract findDriverByUsername(username: string, role: 'Driver'): Promise<User | null>
//   abstract findDriversByLocation(location: string, role: 'Driver'): Promise<User[] | null>

// }