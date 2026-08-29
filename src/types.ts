export type Role = 'backend_read' | 'backend_write' | 'backend_admin' | 'user_management';

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  roles: Role[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  status: 'active' | 'draft' | 'archived';
  price: string;
  stock: number;
  variants: number;
  image: string;
  updatedAt: string;
}

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  object: string;
  at: string;
  tone: 'catalog' | 'inventory' | 'order' | 'team';
}
