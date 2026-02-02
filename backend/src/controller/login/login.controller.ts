import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

export const loginController = (req: Request, res: Response) => {
    console.log('Login attempt received');
    res.status(401).json({ message: 'Login failed: Invalid credentials' });
//   const USERNAME: string = process.env.USERNAME || 'admin';
//   const PASSWORD: string = process.env.PASSWORD || 'password';
//   const { username, password } = req.body;
//   if (username === USERNAME && password === PASSWORD) {
//     res.status(200).json({ message: 'Login successful' });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
};
