import React, { useState, useEffect } from 'react';
import { getAllOrders, deleteOrder, updateOrderStatus } from '@/lib/api';
import { OrderWithDetails, Order } from '@/lib/types';

export default function OrdersSection() {
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const ordersData = await getAllOrders();
      const ordersArray = Array.isArray(ordersData) ? ordersData : [];
      
      const ordersWithDetails = ordersArray.map((order: Order) => ({
        ...order,
        showItems: false
      }));
      
      setOrders(ordersWithDetails);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId: number) => {
    if (!confirm('Are you sure you want to delete this order? This action cannot be undone.')) return;

    try {
      await deleteOrder(orderId);
      setOrders(orders.filter(o => o.id !== orderId));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete order');
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(o => 
        o.id === orderId 
          ? { ...o, status: newStatus as Order['status'] }
          : o
      ));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update order status');
    }
  };

  const toggleOrderItems = (orderId: number) => {
    setOrders(orders.map(o => 
      o.id === orderId 
        ? { ...o, showItems: !o.showItems }
        : o
    ));
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-orange-100 text-orange-800';
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders;

  if (loading) return <div className="text-gray-600">Loading orders...</div>;
  if (error)
    return (
      <div className="text-red-600">
        Error: {error}
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Orders List */}
      {filteredOrders.map(order => (
        <div
          key={order.id}
          className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden"
        >
          {/* Order Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Order #{order.id}
                      <span className="text-sm font-normal text-gray-500 ml-2">
                        ({new Date(order.createdAt).toLocaleDateString()})
                      </span>
                    </h3>
                    <p className="text-gray-600 mb-1">
                      <strong>Email:</strong> {order.customer.email}
                    </p>
                  </div>
                  <div>
                    <div className="mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                      ৳{parseFloat(order.totalAmount.toString()).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="ml-6 flex flex-col space-y-2">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="px-3 py-2 border rounded bg-blue-100 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="shipped">Shipped</option>
                  <option value="paid">Paid</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  onClick={() => handleDeleteOrder(order.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete Order
                </button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="mt-4 flex items-center space-x-6">
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <span className="text-blue-800 font-semibold">
                  {order.items.length} Items
                </span>
              </div>
              <button
                onClick={() => toggleOrderItems(order.id)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                {order.showItems ? 'Hide Items' : 'Show Items'}
              </button>
            </div>
          </div>

          {/* Order Items Section */}
          {order.showItems && (
            <div className="p-6 bg-gray-50">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h4>
              {order.items.length === 0 ? (
                <p className="text-gray-600">No items found for this order.</p>
              ) : (
                <div className="space-y-3">
                  {order.items.map(item => (
                    <div
                      key={item.id}
                      className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center"
                    >
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 mb-1">{item.product.name}</h5>
                        <p className="text-gray-600 text-sm">
                          Product ID: {item.product.id}
                        </p>
                        <p className="text-sm text-gray-600">
                          Unit Price: ৳{parseFloat(item.price.toString()).toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-green-600 font-semibold">
                          ৳{(parseFloat(item.price.toString()) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Order Total */}
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                      <span className="text-2xl font-bold text-green-600">
                        ৳{parseFloat(order.totalAmount.toString()).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      
      {filteredOrders.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No orders found.
        </div>
      )}
    </div>
  );
}