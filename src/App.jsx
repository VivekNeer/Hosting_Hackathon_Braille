import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import CustomNavbar from "./components/CustomNavbar";
import TextToBraille from "./pages/TextToBraille.jsx";
import ImageToBraille from "./pages/ImageToBraille.jsx";
import PdfToBraille from "./pages/PdfToBraille.jsx";

function App() {

    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <CustomNavbar/>
                <div className="flex-grow relative">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                        <Route path="/texttobraille" element={<TextToBraille/>}/>
                        <Route path="/imagetobraille" element={<ImageToBraille/>}/>
                        <Route path="/pdftobraille" element={<PdfToBraille/>}/>
                    </Routes>
                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default App
