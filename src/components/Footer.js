import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Twitter, Facebook, Instagram, Rss } from 'lucide-react';
import { Youtube } from 'lucide-react'; // Changed from YouTube to Youtube

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo and about */}
          <div className="col-span-1 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center">
              <div className="h-10 w-10 flex items-center justify-center bg-red-600 rounded-full">
                <span className="text-white font-bold text-lg">RS</span>
              </div>
              <h1 className="ml-3 text-2xl font-bold">
                <span className="text-red-500">Red</span> Social
              </h1>
            </Link>
            <p className="mt-4 text-gray-400">
              Independent socialist media dedicated to advancing working class interests and 
              providing critical analysis of capitalism, imperialism, and the path to a more just society.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
              <a href="/rss" className="text-gray-400 hover:text-white transition-colors">
                <Rss size={20} />
                <span className="sr-only">RSS Feed</span>
              </a>
            </div>
          </div>

          {/* Footer navigation */}
          <div>
            <h3 className="text-lg font-semibold text-red-500 mb-4">Sections</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/politics" className="text-gray-400 hover:text-white transition-colors">Politics</Link>
              </li>
              <li>
                <Link to="/economy" className="text-gray-400 hover:text-white transition-colors">Economy</Link>
              </li>
              <li>
                <Link to="/labor" className="text-gray-400 hover:text-white transition-colors">Labor</Link>
              </li>
              <li>
                <Link to="/theory" className="text-gray-400 hover:text-white transition-colors">Theory</Link>
              </li>
              <li>
                <Link to="/international" className="text-gray-400 hover:text-white transition-colors">International</Link>
              </li>
              <li>
                <Link to="/culture" className="text-gray-400 hover:text-white transition-colors">Culture</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-500 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/archive" className="text-gray-400 hover:text-white transition-colors">Archive</Link>
              </li>
              <li>
                <Link to="/authors" className="text-gray-400 hover:text-white transition-colors">Authors</Link>
              </li>
              <li>
                <Link to="/podcast" className="text-gray-400 hover:text-white transition-colors">Podcast</Link>
              </li>
              <li>
                <Link to="/video" className="text-gray-400 hover:text-white transition-colors">Video</Link>
              </li>
              <li>
                <Link to="/theory-guide" className="text-gray-400 hover:text-white transition-colors">Theory Guide</Link>
              </li>
              <li>
                <Link to="/reading-lists" className="text-gray-400 hover:text-white transition-colors">Reading Lists</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-500 mb-4">Organization</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-white transition-colors">Support Our Work</Link>
              </li>
              <li>
                <Link to="/subscribe" className="text-gray-400 hover:text-white transition-colors">Subscribe</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/write" className="text-gray-400 hover:text-white transition-colors">Write for Us</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-white transition-colors">Events</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-gray-400 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Red Social. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
              <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;