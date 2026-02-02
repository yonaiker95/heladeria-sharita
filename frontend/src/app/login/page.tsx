// frontend/src/app/admin/login/page.tsx
import LoginUI from '@/app/components/login/LoginForm';

export const metadata = {
  title: 'Iniciar Sesión - Admin | Heladería Sharita',
  description: 'Panel de administración de Heladería Sharita',
};

export default function AdminLoginPage() {
  return <LoginUI />;
}
