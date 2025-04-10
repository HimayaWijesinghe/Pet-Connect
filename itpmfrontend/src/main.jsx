import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes,Route } from "react-router-dom"; // Import BrowserRouter
import "./index.css";
import App from "./App.jsx";
import Aboutus from "./components/Aboutus.jsx";
import Trainpage from "./Pages/Trainpage.jsx";
import Firstaidpage from "./Pages/Firstaidpage.jsx";
import Adminpanel from "./Pages/Adminpanel.jsx";
import PetSymptomChecker from "./Pages/PetSymptomChecker.jsx";
import PetTrainingVideos from "./Pages/PetTrainingVideos.jsx";
import Contactus from "./components/Contactus.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/training" element={<Trainpage />} />
        <Route path="/Firstaid" element={<Firstaidpage />} />
        <Route path="/adminpanel" element={<Adminpanel/>} />
        <Route path="/Pet" element={<PetSymptomChecker/>}/>
        <Route path="/Trainv" element={<PetTrainingVideos/>}/>
        <Route path="/contact" element={<Contactus/>}/>
      
     </Routes>

    </BrowserRouter>
  </StrictMode>
);
