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

  //const handleDelete = async (id) => {
  //  if (!window.confirm("Are sure delete this notes")) return;

  //  try {
  //    setLoading(true)
  //    await deletePost(id);
  //    // setpost ke andar jo post unpe filter lagao aur uniki id check karo if id not equal hai delete id ke tho alert dedo
  //    setPosts((pre) => pre.filter((p) => p.id !== id));
  //  } catch(err) {
  //    console.error("Delete Error Details:", err.response || err);
  //    alert("failed to delete");
  //  }
  //  finally{
  //    setLoading(false)
  //  }
  //};
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
      <div className="bg-transparent p-6 border border-gray-400 rounded-lg">
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          posts.map((post) => (
            <div
              className="text-gray-900"
              key={post.id}
              style={{
                border: "1px solid #ddd",
                padding: "16px",
                marginBottom: "12px",
                borderRadius: "6px",
              }}
            >
              <h1>{post.title}</h1>
              <p>{post.content}</p>
              <p>
                <small>By: {post.author}</small>
              </p>
              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <Link to={`/edit/${post.id}`}>Edit</Link>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default PostList;
