import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./components/Header";

const Home = lazy(() => import("./pages/Home"));
const BrowseMovies = lazy(() => import("./pages/BrowseMovies"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const UpcomingMovies = lazy(() => import("./pages/UpcomingMovies"));
const Search = lazy(() => import("./pages/Search"));

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen bg-[#0B0D0D] text-[#e3eaeb] font-sans">
        <Header />
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse-movies" element={<BrowseMovies />} />
            <Route path="/movie/:id/details" element={<MovieDetails />} />
            <Route path="/upcoming" element={<UpcomingMovies />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;