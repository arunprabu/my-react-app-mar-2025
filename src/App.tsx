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

function App() {
  // must return JSX
  return(
    // Here comes JSX
    <div>
      <Header />

      <main className="container mt-5 pt-2">
        <h1>Success!</h1>
      </main>

      <Footer />
    </div>
  )
}

export default App
