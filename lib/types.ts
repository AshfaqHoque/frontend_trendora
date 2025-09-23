export interface Admin {
  id: number;
  fullName: string;
  email: string;
  age: number;
  linkedInUrl: string;
  joiningDate: string;
  status: "active" | "inactive";
  role: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  stock: number;
  category?: string;
  rating?: number;
  image?: string;
  status: 'active' | 'inactive' | 'out_of_stock'; 
  vendor?: {
    id: number;
    name?: string;
  };
}

export interface ProductWithDetails extends Product {
  showDetails: boolean;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  customer: Customer;
  items: OrderItem[];
  totalAmount: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
}

export interface OrderWithDetails extends Order {
  showItems: boolean;
}

export interface StatusData {
  status: string;
  count: number;
}