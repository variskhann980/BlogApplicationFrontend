import CreatePost from "./components/CreatePost"
import EditPost from "./components/EditPost"
import Home from "./pages/Home"
import { BrowserRouter ,  Route, Routes } from "react-router-dom"

function App() {
  return (
    

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/create" element={<CreatePost/>}></Route>
      <Route path="/edit/:id" element={<EditPost/>}></Route>
    </Routes>
    </BrowserRouter>
   
  )
}

export default App
