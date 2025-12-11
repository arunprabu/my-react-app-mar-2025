/* 
  Component is made up of TS, JSX, CSS (optional) 
*/

/* Component Blueprint 
  1. can have imports 
  2. component definition 
      must return JSX 

  3. export the component
*/

import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import './App.css' // css (optional)
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Netflix from "./pages/Netflix";
import Employees from "./pages/Employees";
import Blog from "./pages/Blog";
// import Todos from "./pages/TodosV1";
import AboutUs from "./pages/AboutUs";
import AddEmployee from "./components/employees/AddEmployee";
import AddBlog from "./components/blog/AddBlog";
import TodosV2 from "./pages/TodosV2";
import Notes from "./pages/Notes";
import Spotify from "./pages/Spotify";

function App() {
  // must return JSX
  return (
    // Here comes JSX
    <div>
      <Header />

      <main className="container mt-5 pt-2">
        {/* Ideal place for routing configuration */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/netflix" element={<Netflix />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/add" element={<AddBlog />} />
          {/* <Route path="/todos-version1" element={<TodosV1 />} /> */}
          <Route path="/todos-version2" element={<TodosV2 />} />
          <Route path="/spotify" element={<Spotify />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
