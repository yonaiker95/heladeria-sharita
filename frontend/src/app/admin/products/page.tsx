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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Trash2, Plus } from 'lucide-react';

// Definición del tipo Producto (coincide con tu schema de Supabase)
interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  minimum_stock: number;
  created_at?: string; // Opcional para el mock
}

// Datos de ejemplo (mockProducts)
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Helado de Chocolate',
    description: 'Delicioso helado de chocolate belga',
    price: 3.5,
    stock: 45,
    minimum_stock: 10,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Helado de Vainilla',
    description: 'Clásico helado de vainilla',
    price: 3.0,
    stock: 32,
    minimum_stock: 10,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Cono Mixto',
    description: 'Cono con helado de chocolate y vainilla',
    price: 4.0,
    stock: 8,
    minimum_stock: 15,
    created_at: new Date().toISOString(),
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Estado del formulario (usamos useState simple para el mock, pero podrías usar react-hook-form si quieres)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    minimum_stock: 0,
  });

  // Manejar cambios en el formulario
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'price' || name === 'stock' || name === 'minimum_stock'
          ? parseFloat(value) || 0
          : value,
    }));
  };

  // Abrir modal para crear
  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      minimum_stock: 0,
    });
    setIsDialogOpen(true);
  };

  // Abrir modal para editar
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      stock: product.stock,
      minimum_stock: product.minimum_stock,
    });
    setIsDialogOpen(true);
  };

  // Guardar producto (crear o actualizar)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      // Actualizar
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? { ...p, ...formData, description: formData.description || null }
            : p
        )
      );
    } else {
      // Crear nuevo producto con ID temporal
      const newProduct: Product = {
        id: Date.now().toString(),
        ...formData,
        description: formData.description || null,
        created_at: new Date().toISOString(),
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
    setIsDialogOpen(false);
  };

  // Confirmar eliminación
  const confirmDelete = () => {
    if (productToDelete) {
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      setProductToDelete(null);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Productos</h1>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Producto
        </Button>
      </div>

      {/* Tabla de productos */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="text-right">Precio</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Stock Mínimo</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {product.description || '—'}
                </TableCell>
                <TableCell className="text-right">
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={
                      product.stock < product.minimum_stock
                        ? 'text-red-600 font-medium'
                        : ''
                    }
                  >
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  {product.minimum_stock}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setProductToDelete(product)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Se eliminará
                            permanentemente el producto{' '}
                            <strong>{productToDelete?.name}</strong>.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={() => setProductToDelete(null)}
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
            {products.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No hay productos. Agrega uno nuevo.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal para agregar/editar producto */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
            </DialogTitle>
            <DialogDescription>
              Completa los campos para{' '}
              {editingProduct ? 'actualizar el' : 'crear un nuevo'} producto.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Precio ($) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock *</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minimum_stock">Stock Mínimo *</Label>
              <Input
                id="minimum_stock"
                name="minimum_stock"
                type="number"
                value={formData.minimum_stock}
                onChange={handleInputChange}
                required
              />
              <p className="text-xs text-muted-foreground">
                Cantidad mínima para alertas de stock bajo.
              </p>
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
                {editingProduct ? 'Actualizar' : 'Crear'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// export default function Products() {

//   return (
//     <div> Producs </div>
//   )
// }
