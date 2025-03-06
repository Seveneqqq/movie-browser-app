import React, { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import { Input } from "./ui/input";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    setDebouncedQuery(query);
  }, [query]);

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query) {
      navigate(`/search?q=${query}`);
    }
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="relative bg-zinc-900 text-white text-2xl">
      <div className="flex justify-between items-center py-5 px-4 md:px-20">

        <button 
          onClick={toggleMobileMenu} 
          className="lg:hidden z-50"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="hidden lg:block">
          <ul className="flex gap-8">
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

        <div className="flex items-center relative">
          <div
            className={`flex items-center transition-all duration-300 ${
              isExpanded ? "w-64" : "w-10"
            } overflow-hidden`}
          >
            {isExpanded && (
              <Input
                type="text"
                placeholder="Search movie..."
                className="w-full h-[20px] pl-10 text-[#e3eaeb] bg-zinc-900 border-0 rounded-full focus:outline-none focus:ring-0 focus-visible:ring-0"
                autoFocus
                value={query}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress}
              />
            )}
            <button
              onClick={toggleSearch}
              className={`absolute top-1/2 transform -translate-y-1/2 ${
                isExpanded ? "left-2" : "left-0"
              } flex items-center justify-center`}
            >
              <Search />
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-zinc-900 z-40 lg:hidden">
          <ul className="flex flex-col items-center justify-center h-full space-y-8 text-2xl">
            <li>
              <Link 
                to="/" 
                onClick={handleLinkClick}
                className="hover:text-sky-300 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/browse-movies" 
                onClick={handleLinkClick}
                className="hover:text-sky-300 transition duration-300"
              >
                Browse
              </Link>
            </li>
            <li>
              <Link 
                to="/upcoming" 
                onClick={handleLinkClick}
                className="hover:text-sky-300 transition duration-300"
              >
                Upcoming
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;