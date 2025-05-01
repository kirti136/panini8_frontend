import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
  const baseURL = "https://panini8-backend-ie4d.onrender.com"
  // const baseURL = "http://localhost:3000";
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();
  const editingPost = location.state?.post || null;

  const [form, setForm] = useState({
    title: editingPost?.title || "",
    content: editingPost?.content || "",
  });

  const [editingId, setEditingId] = useState(editingPost?._id || null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (editingId) {
        await axios.put(`${baseURL}/api/posts/${editingId}`, form, config);
        navigate("/profile");
      } else {
        await axios.post(`${baseURL}/api/posts`, form, config);
        navigate("/blogs");
      }
      alert("Post saved successfully!");
      setForm({ title: "", content: "" });
      setEditingId(null);
    } catch (err) {
      console.error("Error submitting post:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          {editingId ? "Update Blog Post" : "Create Blog Post"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <textarea
            name="content"
            placeholder="Content"
            value={form.content}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
          />
          <button
            type="submit"
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
          >
            {editingId ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
