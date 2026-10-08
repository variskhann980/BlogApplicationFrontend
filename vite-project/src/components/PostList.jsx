import { deletePost, getPosts } from "../service/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPost = async () => {
    setLoading(true);

    try {
      // It is called Api
      const res = await getPosts();
      setPosts(res.data); // set post me data send kardiya array ki form me
    } catch {
      setError("failed To load data ");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(id);
      // ✅ Optimistic UI — no need to re-fetch
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete post.");
    }
  };

  useEffect(() => {
    loadPost();
  }, []);
  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading posts...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!posts.length)
    return <p className="text-center mt-10 text-gray-400">No posts yet.</p>;

  return (
    <>
      <div className="z-50 w-full bg-white/10 backdrop-blur-md border-b border-white/20 p-3">
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          posts.map((post) => (
            <div
              className="text-black"
              key={post.id}
              style={{
                border: "1px solid #ddd",
                padding: "16px",
                marginBottom: "12px",
                borderRadius: "6px",
              }}
            >
              <h1 className="bg-black">{post.title}</h1>
              <p>{post.content}</p>
              <p>
                <small className="bg-black">By: {post.author}</small>
              </p>
              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <Link to={`/edit/${post.id}`}>Edit</Link>
                <button
                  className="relative group overflow-hidden px-8 py-3.5 rounded-xl font-black tracking-wider text-xs uppercase text-black  from-yellow-400 via-amber-300 to-yellow-500 hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(250,204,21,0.35)] hover:shadow-[0_0_35px_rgba(250,204,21,0.65)] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 transition-all duration-300 ease-out"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default PostList;
