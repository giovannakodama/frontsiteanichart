import "./App.css"
import { Home } from "./pages/home"
import { Routes, Route } from "react-router-dom"
import { Register } from "./pages/register"
import { Header } from "./components/header"
import { NewPost } from "./pages/newPost"
import { Posts } from "./pages/posts"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="newPost" element={<NewPost />} />
        <Route path="posts" element={<Posts />} />
      </Routes>
    </>
  )
}

export default App
