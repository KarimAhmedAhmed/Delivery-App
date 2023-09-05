// controllers/orderController.ts
import { Request, Response } from 'express';
import { Auth } from '../../domain/useCases/Auth'


let auth:Auth;

export const register = async (req: Request, res: Response) => {
try {
    const { username, password } = req.body;
    const user = await auth.register(username,password)
    res.status(201).json(user);
} catch (error) {
    res.status(500).json({ error: 'Internal server error' });
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

