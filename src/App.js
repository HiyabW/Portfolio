import './App.css';
import Home from './pages/HomePage/HomePage.tsx';
import About from './pages/AboutPage/AboutPage.tsx';
import PadPalPage from './pages/Projects/PadPalPage.tsx';
import Navbar from './components/NavBar/Navbar.tsx';
import Footer from './components/Footer/Footer.tsx';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects/padpal" element={<PadPalPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
