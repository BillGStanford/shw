import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, User, ChevronDown } from 'lucide-react';
import articles from '../data/articlesData';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  
  // Extract unique categories from all articles
  const getAllCategories = () => {
    const categoriesSet = new Set();
    articles.forEach(article => {
      if (article.categories && Array.isArray(article.categories)) {
        article.categories.forEach(category => categoriesSet.add(category));
      }
    });
    return Array.from(categoriesSet);
  };
  
  const allCategories = getAllCategories();
  const primaryCategories = ['Latest', ...allCategories.slice(0, 4)]; // Latest + first 4 categories
  const moreCategories = allCategories.slice(4); // Remaining categories for the dropdown
  
  const handleClickOutside = (event) => {
    if (!event.target.closest('.more-dropdown') && isMoreOpen) {
      setIsMoreOpen(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMoreOpen]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-10 w-10 flex items-center justify-center bg-red-600 rounded-full">
                <span className="text-white font-bold text-lg">RS</span>
              </div>
              <h1 className="ml-3 text-3xl font-bold text-gray-900 hidden md:block">
                <span className="text-red-600">Red</span> Social
              </h1>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/revolutionaries" className="text-gray-800 hover:text-red-600 px-3 py-2 font-medium">Revolutionaries</Link>
            <Link to="/economy" className="text-gray-800 hover:text-red-600 px-3 py-2 font-medium">Economy</Link>
            <Link to="/labor" className="text-gray-800 hover:text-red-600 px-3 py-2 font-medium">Labor</Link>
            <Link to="/theory" className="text-gray-800 hover:text-red-600 px-3 py-2 font-medium">Theory</Link>
            <Link to="/international" className="text-gray-800 hover:text-red-600 px-3 py-2 font-medium">International</Link>
          </nav>

        </div>

        {/* Search bar (toggled by search button) */}
        {isSearchOpen && (
          <div className="py-3 border-t border-gray-200">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
                <button className="absolute right-3 top-2.5 text-gray-500 hover:text-red-600">
                  <Search size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu (toggled by menu button) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/revolutionaries" 
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-red-50 hover:text-red-600 rounded-md"
            >
              Revolutionaries
            </Link>
            <Link 
              to="/economy" 
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-red-50 hover:text-red-600 rounded-md"
            >
              Economy
            </Link>
            <Link 
              to="/labor" 
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-red-50 hover:text-red-600 rounded-md"
            >
              Labor
            </Link>
            <Link 
              to="/theory" 
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-red-50 hover:text-red-600 rounded-md"
            >
              Theory
            </Link>
            <Link 
              to="/international" 
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-red-50 hover:text-red-600 rounded-md"
            >
              International
            </Link>
          </div>
        </div>
      )}

    </header>
  );
};

export default Navbar;