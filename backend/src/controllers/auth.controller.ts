import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { supabase } from '../database/connectDB.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import { serialize } from 'cookie';

dotenv.config();

export const loginController = async (req: Request, res: Response) => {
  const data = req.body;
  const email = data.email;
  const password = data.password;

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .limit(1);

    console.log(`Data received for login: ${JSON.stringify(user?.[0])}`);

    if (error || !user[0] || user.length === 0) {
      return res
        .status(401)
        .json({ message: 'Login failed: Invalid credentials' });
    }

    if (!validatePassword(password, user[0].password_hash)) {
      return res
        .status(401)
        .json({ message: 'Login failed: Invalid credentials' });
    }

    const token = jwt.sign(
      { _id: user[0].id, role: user[0].role },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      role: user[0].role,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error', 
      error: error 
    });
  }
};

const validatePassword = (
  inputPassword: string,
  storedHash: string
): boolean => {
  return bcrypt.compareSync(
    inputPassword,
    storedHash
    
  );
};
