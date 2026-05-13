import { useState } from "react";
import axios from "axios";
import "./AddDelivery.css";

const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN;

const AddDelivery = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(
        `${url}/api/user/create-delivery`,
        form,
        { headers: { token: ADMIN_TOKEN } }
      );
      if (res.data.success) {
        setMessage("✅ Delivery partner created successfully!");
        setForm({ name: "", email: "", password: "" });
      } else {
        setMessage(`❌ ${res.data.message}`);
      }
    } catch (err) {
      setMessage("❌ Failed to create delivery partner.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-delivery-page">
      <h1>Add Delivery Partner</h1>

      <form className="add-delivery-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Ravi Kumar"
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g. ravi@tomato.com"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Min 8 characters"
            required
          />
        </div>

        {message && <p className="form-message">{message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Delivery Partner"}
        </button>
      </form>
    </div>
  );
};

export default AddDelivery;