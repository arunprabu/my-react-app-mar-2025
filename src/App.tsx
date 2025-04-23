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
import Todos from "./pages/Todos";
import AboutUs from "./pages/AboutUs";

function App() {
  // must return JSX
  return(
    // Here comes JSX
    <div>
      <Header />

      <main className="container mt-5 pt-2">
        {/* Ideal place for routing configuration */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/netflix" element={<Netflix />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
