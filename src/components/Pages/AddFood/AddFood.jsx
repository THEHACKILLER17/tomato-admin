import { useState } from "react";
import axios from "axios";
import "./AddFood.css";

const url = "http://localhost:4000";

const CATEGORIES = [
  "BBQ", "Biryani", "Burger", "Cake", "Chinese",
  "Desserts", "Noodles", "Pasta", "Pizza",
  "Pure Veg", "Rolls", "Salad", "Sandwich",
];

const AddFood = () => {
  const [form, setForm] = useState({
    name: "", image: "", price: "", description: "", category: CATEGORIES[0],
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => {
    const updated = { ...prev, [name]: value };
    if (name === "name" && value.trim()) {
      updated.image = `https://picsum.photos/seed/${encodeURIComponent(value)}/400/300`;
    }
    return updated;
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${url}/api/food/add`, {
        ...form,
        price: Number(form.price),
      });
      if (res.data.success) {
        setMessage("✅ Food item added successfully!");
        setForm({ name: "", image: "", price: "", description: "", category: CATEGORIES[0] });
      } else {
        setMessage(`❌ ${res.data.message}`);
      }
    } catch (err) {
      setMessage("❌ Failed to add food item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addfood-page">
      <h1>Add Food Item</h1>

      <form className="addfood-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Food Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Cheese Burst Pizza" required />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." required />
          {form.image && (
            <img src={form.image} alt="preview" className="image-preview" />
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price (₹)</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="e.g. 299" min="80" max="2000" required />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Short description..." rows={3} required />
        </div>

        {message && <p className="form-message">{message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Food Item"}
        </button>
      </form>
    </div>
  );
};

export default AddFood;