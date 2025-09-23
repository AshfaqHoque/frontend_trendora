import axios from "axios";
import { LoginData, SignupData, VerifyEmailData } from "./validation";
import { Admin, Product, StatusData } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function registerAdmin(userData: SignupData) {
  const response = await axios.post(`${API_BASE_URL}/admin/register`, userData);
  return response.data;
}

export async function loginAdmin(adminData: LoginData) {
  const response = await axios.post(`${API_BASE_URL}/auth/admin/login`, adminData, {
    withCredentials: true,
  });
  return response.data;
}

export async function verifyEmail(userData: VerifyEmailData) {
  const response = await axios.post(`${API_BASE_URL}/admin/verify-email`, userData);
  return response.data;
}

export async function fetchProducts() {
  const response = await axios.get(`${API_BASE_URL}/product`);
  return response.data;
}

export async function getTotalSales() {
  const response = await axios.get(`${API_BASE_URL}/order/total-sales`, {
    withCredentials: true,  
  });
  return response.data;
}

export async function getTotalOrders() {
  const response = await axios.get(`${API_BASE_URL}/order/total-orders`, {
    withCredentials: true,
  });
  return response.data;
}

export async function getTotalCustomers() {
  const response = await axios.get(`${API_BASE_URL}/customer/total-customers`, {
    withCredentials: true,
  });
  return response.data;
}

export async function getYearlyStats() {
  const response = await axios.get(`${API_BASE_URL}/order/yearly-stats`, {
    withCredentials: true,
  });
  return response.data;
}

export async function getTopSellingProducts() {
  const response = await axios.get(`${API_BASE_URL}/order/top-selling-products`, {
    withCredentials: true,
  });
  return response.data;
}

export async function getTopCustomers() {
  const response = await axios.get(`${API_BASE_URL}/order/top-customers`, {
    withCredentials: true,
  });
  return response.data;
}

export async function getProductById(id: string): Promise<Product | null> {
  const response = await fetch(`${API_BASE_URL}/product/${id}`, { cache: "no-store" });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
}

export async function logoutAdmin() {
  const response = await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
    withCredentials: true,
  });
  return response.data;
}

export interface GetEmailData {
  id: string;
}

export async function getUserEmail(userData: GetEmailData) {
  const response = await axios.post('${API_BASE_URL}/admin/', userData, {
    withCredentials: true, 
  });
  return response.data; 
}

export async function getVendors() {
  const response = await axios.get(`${API_BASE_URL}/vendor`, {
    withCredentials: true, 
  });
  return response.data;
}

export async function deleteVendor(vendorId: number) {
  const response = await axios.delete(`${API_BASE_URL}/vendor/delete-vendor/${vendorId}`, {
    withCredentials: true,
  });
  return response.data;
}

export async function getProductCountsByVendor(vendorId: number) {
  const response = await axios.get(`${API_BASE_URL}/product/counts-by-vendor?id=${vendorId}`, {
    withCredentials: true,
  });
  return response.data;
}

export async function getProductsByVendor(vendorId: number) {
  const response = await axios.get(`${API_BASE_URL}/product/by-vendor?id=${vendorId}`, {
    withCredentials: true,
  });
  return response.data;
}

export async function getAdmins() {
  const response = await axios.get(`${API_BASE_URL}/admin`, {
    withCredentials: true,
  });
  return response.data;
}

export async function getAdminById(id: number): Promise<Admin> {
  const response = await axios.get(`${API_BASE_URL}/admin/id/${id}`, {
    withCredentials: true,
  });
  return response.data;
}

export async function getAdminByEmail(email: string): Promise<Admin> {
  const response = await axios.get(`${API_BASE_URL}/admin/email/${email}`, {
    withCredentials: true,
  });
  return response.data;
}

export async function updateAdmin(id: number, data: Partial<Admin>) {
  const response = await axios.put(`${API_BASE_URL}/admin/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
}

export async function deleteAdmin(id: number) {
  const response = await axios.delete(`${API_BASE_URL}/admin/${id}`, {
    withCredentials: true,
  });
  return response.data;
}

export async function updateAdminStatus(id: number, status: "active" | "inactive") {
  const response = await axios.patch(
    `${API_BASE_URL}/admin/${id}/update-status`,
    { status },
    { withCredentials: true }
  );
  return response.data;
}

export async function updateAdminPassword(id: number, password: string) {
  const response = await axios.patch(
    `${API_BASE_URL}/admin/${id}/update-password`,
    { password },
    { withCredentials: true }
  );
  return response.data;
}

export async function getInactiveAdmins() {
  const response = await axios.get(`${API_BASE_URL}/admin/find/inactive`, {
    withCredentials: true,
  });
  return response.data;
}

export async function getAdminsOlderThan(age: number) {
  const response = await axios.get(`${API_BASE_URL}/admin/find/olderthan/${age}`, {
    withCredentials: true,
  });
  return response.data;
}


export async function getAllOrders() {
  const response = await axios.get(`${API_BASE_URL}/order`, {
    withCredentials: true,
  });
  return response.data;
}

export async function deleteOrder(orderId: number) {
  const response = await axios.delete(`${API_BASE_URL}/order/${orderId}`, {
    withCredentials: true,
  });
  return response.data;
}

export async function updateOrderStatus(orderId: number, status: string) {
  const response = await axios.patch(
    `${API_BASE_URL}/order/${orderId}/status`,
    { status },
    { withCredentials: true }
  );
  return response.data;
}

export async function getOrderById(orderId: number) {
  const response = await axios.get(`${API_BASE_URL}/order/${orderId}`, {
    withCredentials: true,
  });
  return response.data;
}

export async function getOrdersByCustomer(customerId: number) {
  const response = await axios.get(`${API_BASE_URL}/order/customer/${customerId}`, {
    withCredentials: true,
  });
  return response.data;
}

export async function deleteProduct(productId: number) {
  const response = await axios.delete(`${API_BASE_URL}/product/${productId}`, {
    withCredentials: true,
  });
  return response.data;
}

export async function setProductInactive(productId: number) {
  const response = await axios.patch(`${API_BASE_URL}/product/${productId}/inactive`,{}, {
      withCredentials: true,
    }
  );
  return response.data;
}


export async function updateProduct(productId: number, productData: Partial<Product>) {
  const response = await axios.put(`${API_BASE_URL}/product/${productId}`, productData, {
    withCredentials: true,
  });
  return response.data;
}

export async function createProduct(productData: Omit<Product, 'id'>) {
  const response = await axios.post(`${API_BASE_URL}/product/create`, productData, {
    withCredentials: true,
  });
  return response.data;
}

export async function fetchOrderStatusSummary(): Promise<StatusData[]> {
  const res = await axios.get(`${API_BASE_URL}/order/order-status-summary`, {
    withCredentials: true, 
  });
  return res.data;
}
