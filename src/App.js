import './App.css';
import Home from './pages/HomePage/HomePage.tsx';
import About from './pages/AboutPage/AboutPage.tsx';
import PadPalPage from './pages/Projects/PadPalPage.tsx';
import TokyoAfterfallPage from './pages/Projects/TokyoAfterfallPage.tsx';
import Navbar from './components/NavBar/Navbar.tsx';
import Footer from './components/Footer/Footer.tsx';
import TransitionOverlay from './components/TransitionOverlay/TransitionOverlay.tsx';
import { TransitionProvider } from './context/TransitionContext.tsx';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <TransitionProvider>
        <TransitionOverlay />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects/padpal" element={<PadPalPage />} />
          <Route path="/projects/tokyoAfterfall" element={<TokyoAfterfallPage />} />
        </Routes>
        <Footer />
      </TransitionProvider>
    </div>
  );
}

export default App;
