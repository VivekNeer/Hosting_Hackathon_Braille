import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import CustomNavbar from "./components/CustomNavbar";

function App() {

  return (
    <>
    <div className="flex flex-col min-h-screen">
    <CustomNavbar/>
    <div className="flex-grow relative">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="contact" element={<Contact />} />
      </Routes>
      </div>
      <Footer />
      </div>
    </>
  )
}

export default App
