import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import UpcomingMovies from "./pages/UpcomingMovies";
import Header from "./components/header";
function App() {
  return (
    <div className="w-full px-20 min-h-screen bg-slate-950 text-sky-400">
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
