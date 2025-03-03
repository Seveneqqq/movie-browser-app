import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

const Header = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const toggleSearch = () => {
        setIsExpanded(!isExpanded);
    };
  
    return (
        <header className="flex md:flex-row flex-col justify-between items-center py-5 text-2xl">
            <nav className="flex gap-30 px-20">
                <ul className="flex gap-15">
                    <li className="relative group">
                      <a href="/" className="hover:text-sky-300 transition duration-500 relative 
                        after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-full 
                        after:h-[2px] after:bg-sky-300 after:scale-x-0 after:transition-transform 
                        after:duration-500 group-hover:after:scale-x-100">
                        Home
                      </a>
                    </li>
                    <li className="relative group">
                      <a href="/upcoming" className="hover:text-sky-300 transition duration-500 relative 
                        after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-full 
                        after:h-[2px] after:bg-sky-300 after:scale-x-0 after:transition-transform 
                        after:duration-500 group-hover:after:scale-x-100">
                        Upcoming
                      </a>
                    </li>
                </ul>
            </nav>
            
            <div className="relative flex items-center mr-20">
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <div className={`flex items-center transition-all duration-300 ${isExpanded ? 'w-64' : 'w-10'} overflow-hidden`}>
                        {isExpanded && (
                            <Input
                                type="text"
                                placeholder="Search movie..."
                                className="w-full pl-10 text-[#e3eaeb] border-zinc-900 bg-zinc-900 rounded-full !focus-visible:ring-0 !focus-visible:ring-offset-0 !focus-visible:border-input !focus:border-input !focus:ring-0 !focus:outline-none"
                                autoFocus
                                style={{ boxShadow: 'none' }}
                            />
                        )}
                        <button 
                            onClick={toggleSearch}
                            className={`flex items-center justify-center ${isExpanded ? 'absolute left-2' : 'w-10 h-10'}`}
                        >
                            <Search />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
