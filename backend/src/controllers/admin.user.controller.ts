import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { supabase } from '../database/connectDB.js';
// import { serialize } from 'cookie';

dotenv.config();

export const adminUserInfo = async (req: Request, res: Response) => {
  try {
    const userId = req.query.id;

    if (!userId) {
      return res.status(400).json({ error: 'Se requiere el parámetro "id"' });
    }

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('id, email, name, role, is_active, permission')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.json({
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error,
    });
  }
};
