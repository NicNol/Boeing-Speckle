import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Api from "./pages/Api";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="about" element={<About />} />
                <Route path="api" element={<Api />} />
                <Route index element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
