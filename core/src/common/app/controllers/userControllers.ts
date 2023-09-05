// controllers/orderController.ts
import { Request, Response } from 'express';
import { Auth } from '../../domain/useCases/Auth'
import UserModel from '../infrastructure/data-access/models/user.model';
import { PasswordService } from '../../domain/services/Password';
import { TokenService } from '../../domain/services/Token';
import UserRepository from '../infrastructure/data-access/repositories/UserRepository';


let userRepository = new UserRepository()
let auth = new Auth(userRepository);
export const register = async (req: Request, res: Response) => {
try {
    console.log("register-usercontroller");

    const {role} = req.params; 
    console.log(role);

    const { username, password } = req.body;
    console.log(username, password);


    const user = await auth.register(username, password, role);
    console.log(user)
    res.status(201).json(user);
} catch (error) {
    console.log(error)
}
}

export const login = async (req: Request, res: Response) => {
try {
    const { username, password } = req.body;
    const user = await auth.login(username,password)
    res.status(201).json(user);
} catch (error) {
    res.status(500).json({ error: 'Internal server error' });
}
}

