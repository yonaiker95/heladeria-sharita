import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { supabase } from '../database/connectDB.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

dotenv.config();

export const loginController = async (req: Request, res: Response) => {
  const data = req.body;
  const email = data.email;
  const password = data.password;

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('email, password_hash, role')
      .eq('email', email);
    console.log(data);
    if (error || !user || user.length === 0 || user[0].email !== email) {
      return res
        .status(401)
        .json({ message: 'Login failed: Invalid credentials' });
    }

    if (!validatePassword(password)) {
      return res
        .status(401)
        .json({ message: 'Login failed: Invalid credentials' });
    }

    const token = jwt.sign(
      { email: user[0].email, role: user[0].role },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1h' }
    );

    const serializedCookie = serialize('myapp_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60,
      path: '/',
    });

    res.setHeader('Set-Cookie', serializedCookie);
    return res.status(200).json({ message: 'Login successful', role: user[0].role, token: serializedCookie, });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

const validatePassword = (
  inputPassword: string
  //   storedHash: string
): boolean => {
  return bcrypt.compareSync(
    inputPassword,
    '$2b$10$KxqMDUHKD/zRJuGzCUZ6du3OrUYTlZGQa.OGpDsy2X3W/Rldt9uaG'
  );
};
