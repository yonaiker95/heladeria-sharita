import { Request, Response } from 'express';
import { supabase } from './../database/connectDB';

export const adminDashboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userRole = await req.headers['x-user-role'];
   console.log('Rol extraído:', userRole);
  try {
    const { data, error } = await supabase.rpc('get_dashboard_data', { 
    p_user_id: userRole
  });

    if (error) throw error;

    console.log('Datos del dashboard obtenidos:', data);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default adminDashboard;