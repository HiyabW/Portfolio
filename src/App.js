import './App.css';
import Home from './pages/HomePage/HomePage.tsx';
import About from './pages/AboutPage/AboutPage.tsx';
import Navbar from './components/NavBar/Navbar.tsx';
import Footer from './components/Footer/Footer.tsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
