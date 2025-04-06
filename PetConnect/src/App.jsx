import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PetStories from './components/PetStories';
import LostPetsScreen from './pages/lost_pets_screen'; 
import BookAPet from './pages/book_pet';  
import DonorScreen from './pages/donor_screen';
import TempScreen from './pages/temp_screen';
import DummySession from './pages/dummy_session';
import MoreStrays from './pages/more_strays';
import Footer from './components/footer';
import SponsoredStrays from './pages/user_sponsors'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
          <Routes>
            <Route path="/" element={<PetStories />} />
            <Route path="/lostpets" element={<LostPetsScreen />} /> 
            <Route path="/donation" element={<DonorScreen />} />
            <Route path="/session" element={<DummySession />} />
            <Route path='/sponsor' element={<MoreStrays />} />
            <Route path='/sponsor/:email' element={<SponsoredStrays />} />
            <Route path='/sponsor/:type/:id' element={<BookAPet />} />
            <Route path='/temp' element={<TempScreen />} />
          </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;