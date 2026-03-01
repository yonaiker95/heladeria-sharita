import { Request, Response } from 'express';
import { supabase } from './../database/connectDB';

export const adminTestDashboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { data, error } = await supabase.rpc('get_admin_dashboard');

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
