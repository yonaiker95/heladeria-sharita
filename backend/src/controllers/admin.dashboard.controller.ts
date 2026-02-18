import { Request, Response } from 'express';
import { supabase } from './../database/connectDB';

export const adminDashboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);
    const startDate = sevenDaysAgo.toISOString().split('T')[0];
    const endDate = today.toISOString().split('T')[0];

    const { data: sellerUpdate, error: errorSellerUpdate } = await supabase
      .from('sales')
      .select('created_at, total_price')
      .gte('created_at', startDate)
      .lte('created_at', endDate + ' 23:59:59');

    const { data: recentOrders, error: errorRecentOrder } = await supabase
      .from('sales')
      .select(
        `
      id,
      status,
      invoice_number,
      product_name,
      total_price,
      created_at,
      customer:users!customer_id ( name, email )
    `
      )
      .order('created_at', { ascending: false })
      .limit(10);

    const { data: topProducts, error: errorTopProducts } = await supabase.rpc(
      'get_top_selling_products'
    );

    const { data: lowStockProducts, error: errorLowStockProducts } =
      await supabase.rpc('get_low_stock_products');

    if (
      errorSellerUpdate ||
      errorRecentOrder ||
      errorTopProducts ||
      errorLowStockProducts
    )
      throw (
        errorSellerUpdate ||
        errorRecentOrder ||
        errorTopProducts ||
        errorLowStockProducts
      );

    const salesByDay: Record<string, number> = {};
    (sellerUpdate || []).forEach((row) => {
      const dateStr = new Date(row.created_at).toISOString().split('T')[0];
      salesByDay[dateStr] =
        (salesByDay[dateStr] || 0) + Number(row.total_price ?? 0);
    });

    const sortedDates = Object.keys(salesByDay).sort();
    const totals: number[] = sortedDates.map((d) => salesByDay[d]);
    const maxTotal = totals.length ? Math.max(...totals) : 0;

    const salesData = sortedDates.map((dateStr) => {
      const date = new Date(dateStr);
      const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' });
      const dayCapitalized = dayName.charAt(0).toUpperCase() + dayName.slice(1);
      const amount = salesByDay[dateStr];
      const percent = maxTotal > 0 ? Math.round((amount / maxTotal) * 100) : 0;
      return { day: dayCapitalized, amount, percent };
    });

    res.json({
      sellerUpdate: salesData,
      recentOrders: recentOrders,
      topProducts: topProducts,
      minimumQuantity: lowStockProducts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
