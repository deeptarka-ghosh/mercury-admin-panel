import type { ActivityItem, Product, SessionUser } from '../types';

export const mockUser: SessionUser = {
  id: 'usr_01',
  email: 'owner@vastra.example',
  name: 'Ananya Rao',
  roles: ['backend_read', 'backend_write', 'backend_admin', 'user_management'],
};

export const products: Product[] = [
  { id: 'p1', name: 'Indigo Camp Collar Shirt', slug: 'indigo-camp-collar-shirt', category: 'Shirts', status: 'active', price: '2890.00', stock: 42, variants: 8, image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=240&q=80', updatedAt: '2026-08-29T06:15:00Z' },
  { id: 'p2', name: 'Sand Pleated Trousers', slug: 'sand-pleated-trousers', category: 'Trousers', status: 'active', price: '3490.00', stock: 18, variants: 10, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=240&q=80', updatedAt: '2026-08-29T04:40:00Z' },
  { id: 'p3', name: 'Madder Handloom Overshirt', slug: 'madder-handloom-overshirt', category: 'Outerwear', status: 'draft', price: '4290.00', stock: 0, variants: 6, image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=240&q=80', updatedAt: '2026-08-28T12:20:00Z' },
  { id: 'p4', name: 'Forest Everyday Tee', slug: 'forest-everyday-tee', category: 'T-shirts', status: 'active', price: '1490.00', stock: 7, variants: 12, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=240&q=80', updatedAt: '2026-08-28T09:10:00Z' },
  { id: 'p5', name: 'Ecru Utility Jacket', slug: 'ecru-utility-jacket', category: 'Outerwear', status: 'archived', price: '5990.00', stock: 3, variants: 5, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=240&q=80', updatedAt: '2026-08-27T15:45:00Z' },
];

export const activities: ActivityItem[] = [
  { id: 'a1', actor: 'Ananya Rao', action: 'published', object: 'Indigo Camp Collar Shirt', at: '12 minutes ago', tone: 'catalog' },
  { id: 'a2', actor: 'Inventory sync', action: 'flagged low stock for', object: 'Forest Everyday Tee · M / Olive', at: '34 minutes ago', tone: 'inventory' },
  { id: 'a3', actor: 'Rohan Mehta', action: 'confirmed', object: 'Order #MRC-1048', at: '1 hour ago', tone: 'order' },
  { id: 'a4', actor: 'Ananya Rao', action: 'invited', object: 'Priya as Catalog editor', at: 'Yesterday, 18:12', tone: 'team' },
];

export const formatInr = (amount: string | number) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
}).format(Number(amount));
