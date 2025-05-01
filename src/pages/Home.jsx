import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleCreateBlog = () => {
    if (token) {
      navigate("/create");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-2xl text-center bg-white p-10 rounded-xl shadow-md">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to the Blog Hub
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Explore ideas, share your stories, and connect with the world through
          writing.
        </p>
        <button
          onClick={handleCreateBlog}
          className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition duration-300 font-medium"
        >
          Create Blog
        </button>
      </div>
    </div>
  );
};

export default Home;
