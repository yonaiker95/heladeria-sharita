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
import { Pencil, Trash2, Plus, Eye } from 'lucide-react';

// ---------- Tipos ----------
interface Product {
  id: string;
  name: string;
  price: number;
}

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number; // precio al momento del pedido (puede cambiar luego)
}

type OrderStatus = 'Pendiente' | 'En preparacion' | 'Completado' | 'Cancelado';

interface Order {
  id: string;
  orderNumber: string; // número legible (ej. "0001")
  customerName: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: string;
  updatedAt?: string;
}

// ---------- Datos mock ----------
const mockProducts: Product[] = [
  { id: '1', name: 'Helado de Chocolate', price: 3.5 },
  { id: '2', name: 'Helado de Vainilla', price: 3.0 },
  { id: '3', name: 'Cono Mixto', price: 4.0 },
  { id: '4', name: 'Batido de Fresa', price: 5.5 },
];

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: '0001',
    customerName: 'Juan Pérez',
    items: [
      {
        productId: '1',
        productName: 'Helado de Chocolate',
        quantity: 2,
        unitPrice: 3.5,
      },
      {
        productId: '2',
        productName: 'Helado de Vainilla',
        quantity: 1,
        unitPrice: 3.0,
      },
    ],
    status: 'Completado',
    total: 10.0,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // ayer
  },
  {
    id: '2',
    orderNumber: '0002',
    customerName: 'María Gómez',
    items: [
      {
        productId: '3',
        productName: 'Cono Mixto',
        quantity: 3,
        unitPrice: 4.0,
      },
    ],
    status: 'En preparacion',
    total: 12.0,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    orderNumber: '0003',
    customerName: 'Carlos Ruiz',
    items: [
      {
        productId: '1',
        productName: 'Helado de Chocolate',
        quantity: 1,
        unitPrice: 3.5,
      },
      {
        productId: '4',
        productName: 'Batido de Fresa',
        quantity: 1,
        unitPrice: 5.5,
      },
    ],
    status: 'Pendiente',
    total: 9.0,
    createdAt: new Date().toISOString(),
  },
];

// Helper para generar número de pedido secuencial
const generateOrderNumber = (orders: Order[]): string => {
  const maxNumber = orders.reduce((max, order) => {
    const num = parseInt(order.orderNumber, 10);
    return num > max ? num : max;
  }, 0);
  return (maxNumber + 1).toString().padStart(4, '0');
};

// Mapeo de colores para badges según estado
const statusColors: Record<OrderStatus, string> = {
  Pendiente: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'En preparacion': 'bg-blue-100 text-blue-800 border-blue-300',
  Completado: 'bg-green-100 text-green-800 border-green-300',
  Cancelado: 'bg-red-100 text-red-800 border-red-300',
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null); // para ver detalles

  // Estado del formulario de pedido
  const [formData, setFormData] = useState({
    customerName: '',
    items: [] as { productId: string; quantity: number }[],
    status: 'Pendiente' as OrderStatus,
  });

  // Para añadir un item temporalmente antes de guardar
  const [selectedProductId, setSelectedProductId] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);

  // Calcular total del pedido actual (formulario)
  const calculateTotal = (items: { productId: string; quantity: number }[]) => {
    return items.reduce((sum, item) => {
      const product = mockProducts.find((p) => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
  };

  // Abrir modal para crear
  const handleAdd = () => {
    setEditingOrder(null);
    setFormData({
      customerName: '',
      items: [],
      status: 'Pendiente',
    });
    setSelectedProductId('');
    setItemQuantity(1);
    setIsDialogOpen(true);
  };

  // Abrir modal para editar
  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setFormData({
      customerName: order.customerName,
      items: order.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      status: order.status,
    });
    setSelectedProductId('');
    setItemQuantity(1);
    setIsDialogOpen(true);
  };

  // Agregar un producto a la lista del formulario
  const addItemToForm = () => {
    if (!selectedProductId) return;
    const product = mockProducts.find((p) => p.id === selectedProductId);
    if (!product) return;

    setFormData((prev) => {
      // Verificar si el producto ya está en la lista
      const existingIndex = prev.items.findIndex(
        (i) => i.productId === selectedProductId
      );
      if (existingIndex >= 0) {
        // Si ya existe, sumar cantidad
        const updatedItems = [...prev.items];
        updatedItems[existingIndex].quantity += itemQuantity;
        return { ...prev, items: updatedItems };
      } else {
        // Agregar nuevo
        return {
          ...prev,
          items: [
            ...prev.items,
            { productId: selectedProductId, quantity: itemQuantity },
          ],
        };
      }
    });

    // Resetear selección
    setSelectedProductId('');
    setItemQuantity(1);
  };

  // Eliminar un item del formulario
  const removeItemFromForm = (productId: string) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.productId !== productId),
    }));
  };

  // Guardar pedido
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.items.length === 0) {
      alert('Debe agregar al menos un producto');
      return;
    }

    const total = calculateTotal(formData.items);
    const itemsWithDetails = formData.items.map((item) => {
      const product = mockProducts.find((p) => p.id === item.productId)!;
      return {
        productId: item.productId,
        productName: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
      };
    });

    if (editingOrder) {
      // Actualizar pedido existente
      setOrders((prev) =>
        prev.map((order) =>
          order.id === editingOrder.id
            ? {
                ...order,
                customerName: formData.customerName,
                items: itemsWithDetails,
                status: formData.status,
                total,
                updatedAt: new Date().toISOString(),
              }
            : order
        )
      );
    } else {
      // Crear nuevo pedido
      const newOrder: Order = {
        id: Date.now().toString(),
        orderNumber: generateOrderNumber(orders),
        customerName: formData.customerName,
        items: itemsWithDetails,
        status: formData.status,
        total,
        createdAt: new Date().toISOString(),
      };
      setOrders((prev) => [newOrder, ...prev]);
    }

    setIsDialogOpen(false);
  };

  // Eliminar pedido
  const confirmDelete = () => {
    if (orderToDelete) {
      setOrders((prev) => prev.filter((o) => o.id !== orderToDelete.id));
      setOrderToDelete(null);
    }
  };

  // Cambiar estado rápidamente desde la lista (sin abrir edición)
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
          : order
      )
    );
  };

  // Formatear fecha
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
        <h1 className="text-3xl font-bold">Pedidos</h1>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Pedido
        </Button>
      </div>

      {/* Tabla de pedidos */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N° Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Productos</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  #{order.orderNumber}
                </TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {order.items.map((item, idx) => (
                      <span key={idx} className="text-sm">
                        {item.quantity} x {item.productName}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onValueChange={(value: OrderStatus) =>
                      handleStatusChange(order.id, value)
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue>
                        <Badge className={statusColors[order.status]}>
                          {order.status}
                        </Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pendiente">
                        <Badge className={statusColors.Pendiente}>
                          Pendiente
                        </Badge>
                      </SelectItem>
                      <SelectItem value="En preparacion">
                        <Badge className={statusColors['En preparacion']}>
                          En preparacion
                        </Badge>
                      </SelectItem>
                      <SelectItem value="Completado">
                        <Badge className={statusColors.Completado}>
                          Completado
                        </Badge>
                      </SelectItem>
                      <SelectItem value="Cancelado">
                        <Badge className={statusColors.Cancelado}>
                          Cancelado
                        </Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setViewingOrder(order)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(order)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setOrderToDelete(order)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Se eliminará
                            permanentemente el pedido #
                            {orderToDelete?.orderNumber}.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={() => setOrderToDelete(null)}
                          >
                            Cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction onClick={confirmDelete}>
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {orders.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No hay pedidos. Crea uno nuevo.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal de creación/edición de pedido */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingOrder
                ? `Editar Pedido #${editingOrder.orderNumber}`
                : 'Nuevo Pedido'}
            </DialogTitle>
            <DialogDescription>
              Completa los datos del pedido. Puedes agregar varios productos.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Cliente */}
            <div className="space-y-2">
              <Label htmlFor="customerName">Nombre del Cliente *</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    customerName: e.target.value,
                  }))
                }
                required
              />
            </div>

            {/* Selector de productos */}
            <div className="space-y-2">
              <Label>Agregar Productos</Label>
              <div className="flex gap-2">
                <Select
                  value={selectedProductId}
                  onValueChange={setSelectedProductId}
                >
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
                  onChange={(e) =>
                    setItemQuantity(parseInt(e.target.value) || 1)
                  }
                  className="w-20"
                />
                <Button
                  type="button"
                  onClick={addItemToForm}
                  disabled={!selectedProductId}
                >
                  Agregar
                </Button>
              </div>
            </div>

            {/* Lista de productos agregados */}
            {formData.items.length > 0 && (
              <div className="border rounded-md p-3 space-y-2">
                <p className="text-sm font-medium">Productos en este pedido:</p>
                {formData.items.map((item, idx) => {
                  const product = mockProducts.find(
                    (p) => p.id === item.productId
                  );
                  if (!product) return null;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm"
                    >
                      <span>
                        {item.quantity} x {product.name} ($
                        {product.price.toFixed(2)} c/u)
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

            {/* Estado del pedido */}
            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Select
                value={formData.status}
                onValueChange={(value: OrderStatus) =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="En preparacion">En preparacion</SelectItem>
                  <SelectItem value="Completado">Completado</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {editingOrder ? 'Actualizar' : 'Crear Pedido'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de visualización de detalles */}
      <Dialog open={!!viewingOrder} onOpenChange={() => setViewingOrder(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              Detalles del Pedido #{viewingOrder?.orderNumber}
            </DialogTitle>
          </DialogHeader>
          {viewingOrder && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Cliente</p>
                <p className="font-medium">{viewingOrder.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estado</p>
                <Badge className={statusColors[viewingOrder.status]}>
                  {viewingOrder.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Productos</p>
                <div className="border rounded-md p-3 space-y-2">
                  {viewingOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>
                        {item.quantity} x {item.productName}
                      </span>
                      <span>
                        ${(item.quantity * item.unitPrice).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Total</span>
                    <span>${viewingOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Creado</p>
                  <p className="text-sm">
                    {formatDate(viewingOrder.createdAt)}
                  </p>
                </div>
                {viewingOrder.updatedAt && (
                  <div>
                    <p className="text-sm text-muted-foreground">Actualizado</p>
                    <p className="text-sm">
                      {formatDate(viewingOrder.updatedAt)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setViewingOrder(null)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
