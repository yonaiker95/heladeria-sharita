// components/SimpleNavLink.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ 
  href, 
  children 
}: { 
  href: string; 
  children: React.ReactNode 
}) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link 
      href={href} 
      className={`nav-item nav-link ${isActive ? 'active' : ''}`}
    >
      {children}
    </Link>
  );
}