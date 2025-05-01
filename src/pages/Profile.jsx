import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // assuming you're using React Router
import axios from "axios";

const Profile = () => {
  const baseURL = "https://panini8-backend-ie4d.onrender.com"
  // const baseURL = "http://localhost:3000";
  const [user, setUser] = useState({ username: "" });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const userRes = await axios.get(`${baseURL}/api/auth/profile`, config);
        setUser(userRes.data);

        const postRes = await axios.get(
          `${baseURL}/api/posts/user-post`,
          config
        );
        setPosts(postRes.data);

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch profile or posts", err);
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseURL}/api/auth/profile`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`${baseURL}/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  const handleEdit = (post) => {
    // navigate to CreatePost with post data using state
    navigate("/create", { state: { post } });
  };

  if (loading)
    return <div className="text-center mt-20">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

        {/* User Info */}
        <div className="mb-8 border-b pb-6">
          <h3 className="text-xl font-semibold mb-2">Current Information</h3>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <h3 className="text-lg font-semibold mb-2">Edit Profile</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* User Posts */}
      <div className="max-w-3xl mx-auto mt-10">
        <h3 className="text-xl font-semibold mb-4">My Posts</h3>
        {posts.length === 0 ? (
          <p className="text-gray-600">No posts yet.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm"
              >
                <h4 className="text-lg font-bold">{post.title}</h4>
                <p className="text-gray-700 mt-1">{post.content}</p>
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => handleEdit(post)}
                    className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
