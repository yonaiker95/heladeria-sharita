import { Request, Response } from 'express';
import { supabase } from '../database/connectDB';

export const adminEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = await req.headers['x-user-id'];
  try {
    const { data, error } = await supabase.rpc('get_employees_list', {
      p_user_id: userId,
    });

    if (error) throw error;
    console.log(data);
    res.json({ EmployeeUpdate: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
