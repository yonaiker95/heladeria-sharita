'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Save, Bell, Palette, Shield, CreditCard, Users, Store, Mail, Phone, MapPin, Globe, Eye, EyeOff } from 'lucide-react';

export default function AdminSettingsPage() {
  // Estados para cada sección (simulando datos guardados)
  const [general, setGeneral] = useState({
    storeName: 'Heladería Don Pepito',
    address: 'Av. Principal 123, Ciudad',
    phone: '+54 11 1234-5678',
    email: 'contacto@heladeria.com',
    website: 'https://heladeria.com',
    taxId: '30-12345678-9',
  });

  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailLowStock: true,
    emailPromotions: false,
    smsOrders: false,
    pushNewOrder: true,
  });

  const [appearance, setAppearance] = useState({
    theme: 'light',
    primaryColor: 'blue',
    density: 'comfortable',
    showLogo: true,
    animations: true,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: '30',
    passwordLastChanged: '2025-02-15',
  });

  const [billing, setBilling] = useState({
    paymentMethod: 'stripe',
    currency: 'ARS',
    invoiceEmail: 'facturacion@heladeria.com',
    taxRate: '21',
  });

  // Estados para cambios temporales (antes de guardar)
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleGeneralChange = (field: string, value: string) => {
    setGeneral(prev => ({ ...prev, [field]: value }));
    setDirty(true);
    setSaved(false);
  };

  const handleNotificationChange = (field: string, checked: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: checked }));
    setDirty(true);
    setSaved(false);
  };

  const handleAppearanceChange = (field: string, value: string | boolean) => {
    setAppearance(prev => ({ ...prev, [field]: value }));
    setDirty(true);
    setSaved(false);
  };

  const handleSecurityChange = (field: string, value: string | boolean) => {
    setSecurity(prev => ({ ...prev, [field]: value }));
    setDirty(true);
    setSaved(false);
  };

  const handleBillingChange = (field: string, value: string) => {
    setBilling(prev => ({ ...prev, [field]: value }));
    setDirty(true);
    setSaved(false);
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar en backend
    console.log('Guardando configuración:', { general, notifications, appearance, security, billing });
    setDirty(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Configuración</h1>
        <div className="flex items-center gap-4">
          {saved && (
            <Alert className="w-auto py-2 bg-green-50 border-green-200 text-green-800">
              <span>✓ Cambios guardados</span>
            </Alert>
          )}
          <Button onClick={handleSave} disabled={!dirty} className="gap-2">
            <Save className="h-4 w-4" />
            Guardar cambios
          </Button>
        </div>
      </div>

      <Separator />

      {/* Pestañas de configuración */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid grid-cols-5 md:w-[600px]">
          <TabsTrigger value="general" className="gap-2">
            <Store className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notificaciones</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Apariencia</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Seguridad</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Facturación</span>
          </TabsTrigger>
        </TabsList>

        {/* General */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Información del negocio</CardTitle>
              <CardDescription>
                Datos generales de tu heladería. Estos datos se usarán en facturas y comunicaciones.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Nombre del local</Label>
                  <div className="relative">
                    <Store className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="storeName"
                      className="pl-8"
                      value={general.storeName}
                      onChange={(e) => handleGeneralChange('storeName', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId">CUIT/RUT</Label>
                  <Input
                    id="taxId"
                    value={general.taxId}
                    onChange={(e) => handleGeneralChange('taxId', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <div className="relative">
                  <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    className="pl-8"
                    value={general.address}
                    onChange={(e) => handleGeneralChange('address', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      className="pl-8"
                      value={general.phone}
                      onChange={(e) => handleGeneralChange('phone', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-8"
                      value={general.email}
                      onChange={(e) => handleGeneralChange('email', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Sitio web</Label>
                <div className="relative">
                  <Globe className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website"
                    className="pl-8"
                    value={general.website}
                    onChange={(e) => handleGeneralChange('website', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificaciones */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de notificaciones</CardTitle>
              <CardDescription>
                Elige qué alertas quieres recibir y por qué medios.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailOrders" className="flex-1">Nuevos pedidos</Label>
                  <Switch
                    id="emailOrders"
                    checked={notifications.emailOrders}
                    onCheckedChange={(c) => handleNotificationChange('emailOrders', c)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailLowStock" className="flex-1">Stock bajo</Label>
                  <Switch
                    id="emailLowStock"
                    checked={notifications.emailLowStock}
                    onCheckedChange={(c) => handleNotificationChange('emailLowStock', c)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailPromotions" className="flex-1">Promociones y ofertas</Label>
                  <Switch
                    id="emailPromotions"
                    checked={notifications.emailPromotions}
                    onCheckedChange={(c) => handleNotificationChange('emailPromotions', c)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Otros canales</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="smsOrders" className="flex-1">SMS para nuevos pedidos</Label>
                  <Switch
                    id="smsOrders"
                    checked={notifications.smsOrders}
                    onCheckedChange={(c) => handleNotificationChange('smsOrders', c)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="pushNewOrder" className="flex-1">Notificaciones push</Label>
                  <Switch
                    id="pushNewOrder"
                    checked={notifications.pushNewOrder}
                    onCheckedChange={(c) => handleNotificationChange('pushNewOrder', c)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Apariencia */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Personalización visual</CardTitle>
              <CardDescription>
                Ajusta el tema y la apariencia del panel de administración.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Tema</Label>
                  <Select
                    value={appearance.theme}
                    onValueChange={(v) => handleAppearanceChange('theme', v)}
                  >
                    <SelectTrigger id="theme">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Oscuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Color primario</Label>
                  <Select
                    value={appearance.primaryColor}
                    onValueChange={(v) => handleAppearanceChange('primaryColor', v)}
                  >
                    <SelectTrigger id="primaryColor">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Azul</SelectItem>
                      <SelectItem value="green">Verde</SelectItem>
                      <SelectItem value="purple">Púrpura</SelectItem>
                      <SelectItem value="orange">Naranja</SelectItem>
                      <SelectItem value="red">Rojo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="density">Densidad de la interfaz</Label>
                <Select
                  value={appearance.density}
                  onValueChange={(v) => handleAppearanceChange('density', v)}
                >
                  <SelectTrigger id="density">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comfortable">Cómoda</SelectItem>
                    <SelectItem value="compact">Compacta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="showLogo" className="flex-1">Mostrar logo en el encabezado</Label>
                <Switch
                  id="showLogo"
                  checked={appearance.showLogo}
                  onCheckedChange={(c) => handleAppearanceChange('showLogo', c)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="animations" className="flex-1">Animaciones</Label>
                <Switch
                  id="animations"
                  checked={appearance.animations}
                  onCheckedChange={(c) => handleAppearanceChange('animations', c)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Seguridad */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad de la cuenta</CardTitle>
              <CardDescription>
                Administra tu contraseña, verificación en dos pasos y sesiones.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Autenticación de dos factores</Label>
                  <p className="text-sm text-muted-foreground">
                    Añade una capa extra de seguridad a tu cuenta.
                  </p>
                </div>
                <Switch
                  checked={security.twoFactor}
                  onCheckedChange={(c) => handleSecurityChange('twoFactor', c)}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Tiempo de sesión (minutos)</Label>
                <Select
                  value={security.sessionTimeout}
                  onValueChange={(v) => handleSecurityChange('sessionTimeout', v)}
                >
                  <SelectTrigger id="sessionTimeout">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                    <SelectItem value="120">2 horas</SelectItem>
                    <SelectItem value="240">4 horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Contraseña</Label>
                <div className="flex items-center gap-2">
                  <Input type="password" value="••••••••" disabled className="flex-1" />
                  <Button variant="outline">Cambiar</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Último cambio: {security.passwordLastChanged}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Facturación */}
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de facturación</CardTitle>
              <CardDescription>
                Métodos de pago, moneda e impuestos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Método de pago por defecto</Label>
                  <Select
                    value={billing.paymentMethod}
                    onValueChange={(v) => handleBillingChange('paymentMethod', v)}
                  >
                    <SelectTrigger id="paymentMethod">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="mercadopago">Mercado Pago</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="efectivo">Efectivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Moneda</Label>
                  <Select
                    value={billing.currency}
                    onValueChange={(v) => handleBillingChange('currency', v)}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ARS">Peso Argentino ($)</SelectItem>
                      <SelectItem value="USD">Dólar (USD$)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="invoiceEmail">Email para facturación</Label>
                <div className="relative">
                  <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="invoiceEmail"
                    type="email"
                    className="pl-8"
                    value={billing.invoiceEmail}
                    onChange={(e) => handleBillingChange('invoiceEmail', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxRate">Tasa de impuesto (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  step="0.1"
                  value={billing.taxRate}
                  onChange={(e) => handleBillingChange('taxRate', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sección adicional: Usuarios y roles (puede enlazar a otra página) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Usuarios y permisos
          </CardTitle>
          <CardDescription>
            Administra los usuarios que tienen acceso al panel y sus roles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Actualmente hay 3 usuarios activos. Puedes gestionarlos desde la sección de usuarios.
          </p>
          <Button variant="outline" asChild>
            <a href="/admin/users">Ir a Usuarios</a>
          </Button>
        </CardContent>
      </Card>

      {/* Botón de guardado flotante (opcional) */}
      {dirty && (
        <div className="fixed bottom-6 right-6">
          <Button onClick={handleSave} size="lg" className="shadow-lg gap-2">
            <Save className="h-5 w-5" />
            Guardar cambios
          </Button>
        </div>
      )}
    </div>
  );
}