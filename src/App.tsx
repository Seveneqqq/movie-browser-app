import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import UpcomingMovies from "./pages/UpcomingMovies";
import Header from "./components/Header";
import BrowseMovies from "./pages/BrowseMovies";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen bg-[#0B0D0D] text-[#e3eaeb] font-sans">
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse-movies" element={<BrowseMovies />} />
            <Route path="/movie/:id/details" element={<MovieDetails />} />
            <Route path="/upcoming" element={<UpcomingMovies />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
