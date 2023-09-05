// controllers/orderController.ts
import { Request, Response } from 'express';
import {UserRepository} from '../../domain/repositories/User';
import { Auth } from '../../domain/useCases/Auth'
class UserController {

constructor(
    readonly auth: Auth
){}
    
     async register(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const user = await this.auth.register(username,password)
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    
    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const user = await this.auth.login(username,password)
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }}

export default UserController;
