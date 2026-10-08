import axios from "axios"



const API = "https://blogapplication-7fre.onrender.com/api/posts";


export const getPosts=()=>axios.get(API) // it use in PostList

export const getPost=(id)=>axios.get(`${API}/${id}`)

export const createPost =(data)=> axios.post(API,data)// it is use in CreatePost

export const deletePost = (id)=> axios.delete(`${API}/${id}`)// it use in PostList

export const updaetPost = (id , data) => axios.put(`${API}/${id}` , data)



