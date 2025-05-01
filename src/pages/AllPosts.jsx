import { useEffect, useState } from "react";
import axios from "axios";

const AllPosts = () => {
  const baseURL = "https://panini8-backend-ie4d.onrender.com"
  // const baseURL = "http://localhost:3000";
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/posts`);
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          All Blog Posts
        </h3>
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No blog posts found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div key={post._id} className="bg-white rounded-lg shadow-md p-4">
                <h4 className="text-lg font-bold mb-2">{post.title}</h4>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <div className="flex justify-between">
                  <button className="text-blue-600 hover:underline">
                    Like
                  </button>
                  <button className="text-green-600 hover:underline">
                    Comment
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

export default AllPosts;
