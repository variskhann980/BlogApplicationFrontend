import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../service/api";

function CreatePost() {
const navigate = useNavigate();
const [post  , setpost] = useState({title:"" , content :"" , author:""})
const [error , setError] = useState(null);
const [submitting , setSubmitting] = useState(false);


const handleChange = async(e) => {
    setpost({...post , [e.target.name] : e.target.value});
    
  
}

const handleSubmit= async (e) =>{
  e.preventDefault();
    if(!post.title.trim() || !post.content.trim() || !post.author.trim()){ // if user khcuh nhi likhe ga 
      setError(alert("All Field are required"));
      return
    }
    
    try{
      setSubmitting(true);

      await createPost(post);
      navigate('/')// isliye data submit hone ke baad direct home page return hojaynge 
    }catch{
      setError("Failed to create post");
    }finally{
      setSubmitting(false)
    }

}
return (
  <>
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">

      <form onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-orange-500 p-8 rounded-2xl shadow-lg">
        <h1 className=" text-5xl text-center font-bold ">Create new post</h1>
        {error && (<p>{error}</p>)}
        <div>
          <label className="block  text-4xl text-shadow-white font-mono
          mb-3">Title</label>
          <input type="text" name="title"
          placeholder="Enter Post title"
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-zinc-900 text-white placeholder-zinc-500 border border-zinc-700 rounded-lg outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
        </div>

        <div>
          <label className="block  text-4xl text-shadow-white font-mono
          mb-3">Content</label>
          <input type="text" name="content"
          placeholder="Enter Post Content"
          onChange={handleChange} 
          className="w-full px-4 py-2.5 bg-zinc-900 text-white placeholder-zinc-500 border border-zinc-700 rounded-lg outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"/>
        </div>
        <div>
          <label className="block  text-4xl text-shadow-white font-mono
          mb-3">Author</label>
          <input   type="text" name="author"
          placeholder="Enter Post author"
          onChange={handleChange} 
          className="w-full px-4 py-2.5 bg-zinc-900 text-white placeholder-zinc-500 border border-zinc-700 rounded-lg outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"/>
        </div>

        <button className="px-6 py-2.5 bg-gray-900 hover:bg-white-500 text-white font-medium rounded-lg mt-7 animate-bounce">{submitting ? "Publishing.." : "Publish post"}</button>
      </form>
          </div>
    </>
  );
}

export default CreatePost;
