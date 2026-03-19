import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import SearchFilter from "../../SearchFilter/SearchFilter";
import ConfirmToast from "../../ConfirmToast/ConfirmToast";
import "./Foods.css";

const url = "http://localhost:4000";

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const fetchFoods = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      if (res.data.success) setFoods(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  const removeFood = async (id) => {
    await axios.delete(`${url}/api/food/remove`, { data: { id } });
    fetchFoods();
  };

  const handleRemove = (id, name) => {
    toast((t) => (
      <ConfirmToast
        message={`Remove "${name}"?`}
        toastId={t.id}
        onConfirm={() => removeFood(id)}
      />
    ), { duration: Infinity, style: { padding: "16px" } });
  };

  const categories = [...new Set(foods.map((f) => f.category))].sort();

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase()) ||
      food.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || food.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => { fetchFoods(); }, []);

  if (loading) return <p>Loading foods...</p>;

  return (
    <div className="foods-page">
      <h1>Foods</h1>

      <SearchFilter
        search={search}
        onSearch={setSearch}
        filter={categoryFilter}
        onFilter={setCategoryFilter}
        filterOptions={categories}
        filterLabel="All Categories"
        count={filteredFoods.length}
        placeholder="Search by name or category..."
      />

      <div className="foods-table">
        <div className="foods-table-header">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Action</span>
        </div>

        {filteredFoods.length === 0 ? (
          <p className="foods-no-results">No food items found.</p>
        ) : filteredFoods.map((food) => (
          <div key={food._id} className="foods-table-row">
            <img src={food.image} alt={food.name} />
            <span>{food.name}</span>
            <span>{food.category}</span>
            <span>₹{food.price}</span>
            <button onClick={() => handleRemove(food._id, food.name)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Foods;