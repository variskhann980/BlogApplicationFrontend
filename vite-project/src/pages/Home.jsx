import { Link } from "react-router-dom";
import PostList from "../components/PostList";
function Home() {
  return (
    <>
      <div class="sticky top-0 z-50 w-full bg-white/10 backdrop-blur-md border-b border-white/20 p-3">
        <h1 className="text-2xl font-bold text-yellow-300"> Blog App</h1>
      </div>
     <Link
          to="/create"
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-lg shadow"
        >
          + Create Post
        </Link>
      {/*it is using for make multiple page in on web */}
         <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-black">
            Latest Posts
          </h2>

          <PostList />
        </div>
      </div>
      
    </>
  );
}

export default Home;
