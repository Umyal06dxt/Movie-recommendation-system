import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import RecommendationForm from './components/RecommendationForm';
import Shows from './components/Shows';
import Discover from './components/Discover';
import Reviews from './components/Reviews';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommendations" element={<RecommendationForm />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
