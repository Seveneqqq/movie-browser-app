import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import UpcomingMovies from "./pages/UpcomingMovies";
import Header from "./components/Header";
function App() {
  return (
    <div className="w-full min-h-screen bg-[#0B0D0D] text-[#e3eaeb] font-sans">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id/details" element={<MovieDetails />} />
          <Route path="/upcoming" element={<UpcomingMovies />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
