'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Plus, Eye, Ban } from 'lucide-react';

// Tipos
interface Product {
  id: string;
  name: string;
  price: number;
}

interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

type SaleStatus = 'Activo' | 'Anulado';
type PaymentMethod = 'Efectivo' | 'Tarjeta' | 'Transferencia' | 'Otro';

interface Sale {
  id: string;
  saleNumber: string;
  customerName: string;
  date: string;
  items: SaleItem[];
  total: number;
  status: SaleStatus;
  paymentMethod: PaymentMethod;
}

// Datos mock
const mockProducts: Product[] = [
  { id: '1', name: 'Helado de Chocolate', price: 3.5 },
  { id: '2', name: 'Helado de Vainilla', price: 3.0 },
  { id: '3', name: 'Cono Mixto', price: 4.0 },
  { id: '4', name: 'Batido de Fresa', price: 5.5 },
];

const mockSales: Sale[] = [
  {
    id: '1',
    saleNumber: '0001',
    customerName: 'Juan Pérez',
    date: new Date(Date.now() - 2 * 86400000).toISOString(),
    items: [
      { productId: '1', productName: 'Helado de Chocolate', quantity: 2, unitPrice: 3.5 },
      { productId: '2', productName: 'Helado de Vainilla', quantity: 1, unitPrice: 3.0 },
    ],
    total: 10.0,
    status: 'Activo',
    paymentMethod: 'Efectivo',
  },
  {
    id: '2',
    saleNumber: '0002',
    customerName: 'María Gómez',
    date: new Date(Date.now() - 1 * 86400000).toISOString(),
    items: [
      { productId: '3', productName: 'Cono Mixto', quantity: 3, unitPrice: 4.0 },
    ],
    total: 12.0,
    status: 'Activo',
    paymentMethod: 'Tarjeta',
  },
  {
    id: '3',
    saleNumber: '0003',
    customerName: 'Carlos Ruiz',
    date: new Date().toISOString(),
    items: [
      { productId: '1', productName: 'Helado de Chocolate', quantity: 1, unitPrice: 3.5 },
      { productId: '4', productName: 'Batido de Fresa', quantity: 1, unitPrice: 5.5 },
    ],
    total: 9.0,
    status: 'Anulado',
    paymentMethod: 'Efectivo',
  },
];

// Helper para generar número de venta secuencial
const generateSaleNumber = (sales: Sale[]): string => {
  const max = sales.reduce((max, s) => {
    const num = parseInt(s.saleNumber, 10);
    return num > max ? num : max;
  }, 0);
  return (max + 1).toString().padStart(4, '0');
};

// Colores para badges de estado
const statusColors: Record<SaleStatus, string> = {
  Activo: 'bg-green-100 text-green-800 border-green-300',
  Anulado: 'bg-red-100 text-red-800 border-red-300',
};

export default function AdminSalesPage() {
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);
  const [saleToDelete, setSaleToDelete] = useState<Sale | null>(null); // para anular
  const [viewingSale, setViewingSale] = useState<Sale | null>(null);

  // Estado del formulario
  const [formData, setFormData] = useState({
    customerName: '',
    items: [] as { productId: string; quantity: number }[],
    paymentMethod: 'Efectivo' as PaymentMethod,
  });

  const [selectedProductId, setSelectedProductId] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);

  // Calcular total del formulario
  const calculateTotal = (items: { productId: string; quantity: number }[]) => {
    return items.reduce((sum, item) => {
      const product = mockProducts.find(p => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const handleAdd = () => {
    setEditingSale(null);
    setFormData({
      customerName: '',
      items: [],
      paymentMethod: 'Efectivo',
    });
    setSelectedProductId('');
    setItemQuantity(1);
    setIsDialogOpen(true);
  };

  const handleEdit = (sale: Sale) => {
    // Solo permitimos editar si está activa? Podría ser, pero aquí lo dejamos editar cualquier cosa excepto tal vez el número.
    setEditingSale(sale);
    setFormData({
      customerName: sale.customerName,
      items: sale.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      paymentMethod: sale.paymentMethod,
    });
    setSelectedProductId('');
    setItemQuantity(1);
    setIsDialogOpen(true);
  };

  const addItemToForm = () => {
    if (!selectedProductId) return;
    const product = mockProducts.find(p => p.id === selectedProductId);
    if (!product) return;

    setFormData(prev => {
      const existing = prev.items.find(i => i.productId === selectedProductId);
      if (existing) {
        return {
          ...prev,
          items: prev.items.map(i =>
            i.productId === selectedProductId
              ? { ...i, quantity: i.quantity + itemQuantity }
              : i
          ),
        };
      } else {
        return {
          ...prev,
          items: [...prev.items, { productId: selectedProductId, quantity: itemQuantity }],
        };
      }
    });

    setSelectedProductId('');
    setItemQuantity(1);
  };

  const removeItemFromForm = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(i => i.productId !== productId),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.items.length === 0) {
      alert('Debe agregar al menos un producto');
      return;
    }

    const total = calculateTotal(formData.items);
    const itemsWithDetails = formData.items.map(item => {
      const product = mockProducts.find(p => p.id === item.productId)!;
      return {
        productId: item.productId,
        productName: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
      };
    });

    if (editingSale) {
      // Actualizar venta existente (manteniendo estado y número)
      setSales(prev =>
        prev.map(sale =>
          sale.id === editingSale.id
            ? {
                ...sale,
                customerName: formData.customerName,
                items: itemsWithDetails,
                total,
                paymentMethod: formData.paymentMethod,
                date: new Date().toISOString(), // actualizar fecha?
              }
            : sale
        )
      );
    } else {
      // Nueva venta
      const newSale: Sale = {
        id: Date.now().toString(),
        saleNumber: generateSaleNumber(sales),
        customerName: formData.customerName,
        date: new Date().toISOString(),
        items: itemsWithDetails,
        total,
        status: 'Activo',
        paymentMethod: formData.paymentMethod,
      };
      setSales(prev => [newSale, ...prev]);
    }

    setIsDialogOpen(false);
  };

  // Anular venta (cambiar estado a Anulado)
  const handleVoid = (sale: Sale) => {
    setSales(prev =>
      prev.map(s =>
        s.id === sale.id ? { ...s, status: 'Anulado' } : s
      )
    );
  };

  // Confirmar anulación
  const confirmVoid = () => {
    if (saleToDelete) {
      handleVoid(saleToDelete);
      setSaleToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Ventas</h1>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Venta
        </Button>
      </div>

      {/* Tabla de ventas */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N° Venta</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Productos</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Método Pago</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">#{sale.saleNumber}</TableCell>
                <TableCell>{sale.customerName}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {sale.items.map((item, idx) => (
                      <span key={idx} className="text-sm">
                        {item.quantity} x {item.productName}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>${sale.total.toFixed(2)}</TableCell>
                <TableCell>{sale.paymentMethod}</TableCell>
                <TableCell>
                  <Badge className={statusColors[sale.status]}>
                    {sale.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(sale.date)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setViewingSale(sale)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {sale.status === 'Activo' && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(sale)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSaleToDelete(sale)}
                            >
                              <Ban className="h-4 w-4 text-red-500" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Anular venta?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción cambiará el estado de la venta a "Anulado". 
                                No se podrá revertir, pero el registro permanecerá.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setSaleToDelete(null)}>
                                Cancelar
                              </AlertDialogCancel>
                              <AlertDialogAction onClick={confirmVoid}>
                                Anular
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {sales.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No hay ventas. Registra una nueva.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal de creación/edición */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSale ? `Editar Venta #${editingSale.saleNumber}` : 'Nueva Venta'}
            </DialogTitle>
            <DialogDescription>
              Ingresa los datos de la venta. Puedes agregar múltiples productos.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Cliente *</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Productos</Label>
              <div className="flex gap-2">
                <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Seleccionar producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} - ${product.price.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  min="1"
                  value={itemQuantity}
                  onChange={(e) => setItemQuantity(parseInt(e.target.value) || 1)}
                  className="w-20"
                />
                <Button type="button" onClick={addItemToForm} disabled={!selectedProductId}>
                  Agregar
                </Button>
              </div>
            </div>

            {formData.items.length > 0 && (
              <div className="border rounded-md p-3 space-y-2">
                <p className="text-sm font-medium">Productos en esta venta:</p>
                {formData.items.map((item, idx) => {
                  const product = mockProducts.find(p => p.id === item.productId);
                  if (!product) return null;
                  return (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span>
                        {item.quantity} x {product.name} (${product.price.toFixed(2)} c/u)
                      </span>
                      <span className="font-medium">
                        ${(product.price * item.quantity).toFixed(2)}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItemFromForm(item.productId)}
                      >
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                  );
                })}
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total:</span>
                  <span>${calculateTotal(formData.items).toFixed(2)}</span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Método de Pago</Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value: PaymentMethod) =>
                  setFormData(prev => ({ ...prev, paymentMethod: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Efectivo">Efectivo</SelectItem>
                  <SelectItem value="Tarjeta">Tarjeta</SelectItem>
                  <SelectItem value="Transferencia">Transferencia</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {editingSale ? 'Actualizar Venta' : 'Registrar Venta'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de detalles */}
      <Dialog open={!!viewingSale} onOpenChange={() => setViewingSale(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detalles de Venta #{viewingSale?.saleNumber}</DialogTitle>
          </DialogHeader>
          {viewingSale && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Cliente</p>
                <p className="font-medium">{viewingSale.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estado</p>
                <Badge className={statusColors[viewingSale.status]}>
                  {viewingSale.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Método de Pago</p>
                <p>{viewingSale.paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Productos</p>
                <div className="border rounded-md p-3 space-y-2">
                  {viewingSale.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>
                        {item.quantity} x {item.productName}
                      </span>
                      <span>${(item.quantity * item.unitPrice).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Total</span>
                    <span>${viewingSale.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fecha</p>
                <p>{formatDate(viewingSale.date)}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setViewingSale(null)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}