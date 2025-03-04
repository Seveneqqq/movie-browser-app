import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useNavigate, Link } from "react-router-dom";


const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedQuery) {
        navigate(`/search?q=${debouncedQuery}`);
      } else {
        navigate("/");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [debouncedQuery]);

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (query) {
        navigate(`/search?q=${query}`);
      }
    }
  };

  useEffect(() => {
    setDebouncedQuery(query);
  }, [query]);

  return (
    <header className="flex md:flex-row flex-col justify-between items-center py-5 text-2xl">
      <nav className="flex gap-30 px-20">
        <ul className="flex gap-15">
          <li className="relative group">
            <Link
              to="/"
              className="hover:text-sky-300 transition duration-500 relative 
                            after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-full 
                            after:h-[2px] after:bg-sky-300 after:scale-x-0 after:transition-transform 
                            after:duration-500 group-hover:after:scale-x-100"
            >
              Home
            </Link>
          </li>
          <li className="relative group">
            <Link
              to="/browse-movies"
              className="hover:text-sky-300 transition duration-500 relative 
                            after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-full 
                            after:h-[2px] after:bg-sky-300 after:scale-x-0 after:transition-transform 
                            after:duration-500 group-hover:after:scale-x-100"
            >
              Browse
            </Link>
          </li>
          <li className="relative group">
            <Link
              to="/upcoming"
              className="hover:text-sky-300 transition duration-500 relative 
                            after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-full 
                            after:h-[2px] after:bg-sky-300 after:scale-x-0 after:transition-transform 
                            after:duration-500 group-hover:after:scale-x-100"
            >
              Upcoming
            </Link>
          </li>
        </ul>
      </nav>

      <div className="relative flex items-center mr-20">
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <div
            className={`flex items-center transition-all duration-300 ${
              isExpanded ? "w-64" : "w-10"
            } overflow-hidden`}
          >
            {isExpanded && (
              <Input
                type="text"
                placeholder="Search movie..."
                className="w-full pl-10 text-[#e3eaeb] bg-zinc-900 border-0 rounded-full focus:outline-none focus:ring-0 focus-visible:ring-0"
                autoFocus
                value={query}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress}
              />
            )}
            <button
              onClick={toggleSearch}
              className={`flex items-center justify-center ${
                isExpanded ? "absolute left-2" : "w-10 h-10"
              }`}
            >
              <Search />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
