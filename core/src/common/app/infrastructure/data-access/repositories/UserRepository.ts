import UserModel from '../models/user.model';
import { UserRepository } from '../../../../domain/repositories/User';
import { User } from '../../../../domain/entities/User';
import { userRole } from '../dtos/UserDTO';

export class UserRepositoryMongo extends UserRepository{
    private readonly userModel = UserModel;



    async createUser(username: string, password: string, role: userRole){
        const user = new User(username,password,role)
        const newUser = new this.userModel(user);
        await newUser.save()
    }

    // async getUserById(userId: string): Promise<User> {
    //     return await this.userModel.findById(userId).exec();
    // }

 

}
export default UserRepository;



  