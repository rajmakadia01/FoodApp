import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use Routes instead of Switch
import PunjabiMenu from './components/punjabiMenu';
import SouthIndianMenu from './components/southIndianMenu';
import Header from './components/header';
import Home from './components/home';
import Footer from './components/footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Define your routes without the need for exact */}
        <Route path="/" element={<Home />} />
        <Route path="/punjabi" element={<PunjabiMenu />} />
        <Route path="/south-indian" element={<SouthIndianMenu />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
