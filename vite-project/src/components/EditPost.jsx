import { getPost ,updaetPost } from "../service/api";
import { useState , useEffect, } from "react";
import { useParams , useNavigate } from "react-router-dom";

function EditPost() {
const {id} = useParams();
const navigate = useNavigate();
const [post  , setpost] = useState({title:"" , content :"" , author:""})
const [error , setError] = useState(null);
const [submitting , setSubmitting] = useState(false);
const [loading , setLoading] = useState(false);


useEffect(() => {
   const loadPost= async()=> {
     try{
      setLoading(true)
      const res = await getPost(id);
      setpost(res.data);
       }  catch{
        setError("Failed to load")
      }finally{
        setLoading(false)
      

     }
   }
   loadPost();
}, [id]); //when  id change hogi tabhi chalega 

if(loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>
const handleChange = async(e) => {
    setpost({...post , [e.target.name] : e.target.value});

  
}

const handleSubmit= async (e) =>{
  e.preventDefault();

  // if user are not are not write anything in input feild 
    if(!post.title.trim() || !post.content.trim() || !post.author.trim()){ // if user khcuh nhi likhe ga 
      setError("All Field are required ");
      return
    }
    
    try{
      setSubmitting(true);

      await updaetPost(id , post);
      navigate('/')// isliye data submit hoan ke baad direct home page return hojaynge 
    }catch{
      setError("Failed to update post");
    }finally{
      setSubmitting(false)
    }

}
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Create new post</h1>
        {error && (<p>{error}</p>)}
        <div>
          <label>Title</label>
          <input type="text" name="title"
          placeholder="Enter Post title"
          value={post.title}
          onChange={handleChange} />
        </div>

        <div>
          <label>Content</label>
          <input type="text" name="content"
          placeholder="Enter Post Content"
          value={post.content}
          onChange={handleChange} />
        </div>
        <div>
          <label>Author</label>
          <input type="text" name="author"
          placeholder="Enter Post author"
          value={post.author}
          onChange={handleChange} />
        </div>

        <button>{submitting ? "Updating .." : "Update post"}</button>

        <button onClick={() => navigate("/") }>Cancel</button>
      </form>
    </>
  );
}

export default EditPost;
