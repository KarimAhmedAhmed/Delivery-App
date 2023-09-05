// controllers/orderController.ts
import { Request, Response } from 'express';
import { Auth } from '../../domain/useCases/Auth'
import UserModel from '../infrastructure/data-access/models/user.model';
import UserRepository, { UserRepositoryMongo } from '../infrastructure/data-access/repositories/UserRepository';
import { userRole } from '../infrastructure/data-access/dtos/UserDTO';
import { wrapper } from '../utils/Wrapper';


let userRepository = new UserRepositoryMongo();
let auth = new Auth(userRepository);

export const register = wrapper( async (req: Request, res: Response) => {
    const {role} = req.params; 
    const { username, password } = req.body;
    const user = await auth.register(username, password, role as userRole);
    res.status(201).json(user);
})


export const login = async (req: Request, res: Response) => {
try {
    const { username, password } = req.body;
    const user = await auth.login(username,password)
    res.status(201).json(user);
} catch (error) {
    res.status(500).json({ error: 'Internal server error' });
}
}

