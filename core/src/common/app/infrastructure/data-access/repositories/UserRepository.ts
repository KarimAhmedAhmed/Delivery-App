import { Model } from 'mongoose';
import UserModel from '../models/user.model';
class UserRepository {
    private readonly userModel = UserModel;



    async createUser(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return await newUser.save();
    }

    // async getUserById(userId: string): Promise<User> {
    //     return await this.userModel.findById(userId).exec();
    // }

 

}
export default UserRepository;



  