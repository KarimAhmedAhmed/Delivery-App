import { Model } from 'mongoose';

class UserRepository {
    constructor(private readonly userModel: Model<User> ) {}

    async createOrder(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return await newUser.save();
    }

    async getOrderById(userId: string): Promise<User | null> {
        return await this.userModel.findById(userId).exec();
    }

 

}
export default UserRepository;
