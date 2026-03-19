import { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";
import SearchFilter from "../../SearchFilter/SearchFilter";

const url = "http://localhost:4000";
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN;
const STATUS_OPTIONS = ["Food Processing", "Out for Delivery", "Delivered"];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/list`, {
        headers: { token: ADMIN_TOKEN },
      });
      if (res.data.success) setOrders(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    await axios.post(
      `${url}/api/order/status`,
      { orderId, status },
      { headers: { token: ADMIN_TOKEN } },
    );
    fetchOrders();
  };

  const filteredOrders = orders.filter((order) => {
    const name =
      `${order.address?.firstName} ${order.address?.lastName}`.toLowerCase();
    const matchesSearch =
      name.includes(search.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="orders-page">
      <h1>Orders</h1>

      <SearchFilter
        search={search}
        onSearch={setSearch}
        filter={statusFilter}
        onFilter={setStatusFilter}
        filterOptions={STATUS_OPTIONS}
        filterLabel="All Status"
        count={filteredOrders.length}
        placeholder="Search by customer or item..."
      />

      <div className="orders-table">
        <div className="orders-table-header">
          <span>#</span>
          <span>Items</span>
          <span>Customer</span>
          <span>Amount</span>
          <span>Payment</span>
          <span>Status</span>
          <span>Update</span>
        </div>

        {filteredOrders.length === 0 ? (
          <p className="orders-no-results">No orders found.</p>
        ) : (
          filteredOrders.map((order) => (
            <div key={order._id} className="orders-table-row">
              <span className="order-id">
                #{order._id.slice(-6).toUpperCase()}
              </span>

              <span className="order-items">
                {order.items.map((item, i) => (
                  <p key={i}>
                    {item.name} × {item.quantity}
                  </p>
                ))}
              </span>

              <span className="order-customer">
                <p>
                  {order.address?.firstName} {order.address?.lastName}
                </p>
                <p>{order.address?.phone}</p>
                <p>{order.address?.city}</p>
              </span>

              <span>₹{order.amount}</span>

              <span>
                <p>{order.paymentMethod?.toUpperCase()}</p>
                <p>{order.payment ? "✅ Paid" : "⏳ Pending"}</p>
              </span>

              <span>
                <p
                  className={`status-badge ${order.status.replace(/\s/g, "-").toLowerCase()}`}
                >
                  {order.status}
                </p>
              </span>

              <span>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  disabled={order.status === "Delivered"}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
