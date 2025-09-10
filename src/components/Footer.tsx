import { Link } from 'react-router-dom';
import { Map, Mail, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <Map className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">Wanderlust</span>
            </div>
            <p className="text-gray-300 text-sm">
              Plan your perfect trip with our intuitive trip planning tools. Discover new destinations, organize your itinerary, and make memories that last a lifetime.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white text-sm">Home</Link>
              </li>
              <li>
                <Link to="/trips" className="text-gray-300 hover:text-white text-sm">My Trips</Link>
              </li>
              <li>
                <Link to="/explore" className="text-gray-300 hover:text-white text-sm">Explore Destinations</Link>
              </li>
              <li>
                <Link to="/create-trip" className="text-gray-300 hover:text-white text-sm">Plan a Trip</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Travel Guides</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Packing Tips</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Budget Planning</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Safety Information</a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="flex items-center mb-3">
              <Mail className="h-5 w-5 text-gray-300 mr-2" />
              <a href="mailto:info@wanderlust.com" className="text-gray-300 hover:text-white text-sm">info@wanderlust.com</a>
            </div>
            <p className="text-gray-300 text-sm">
              Subscribe to our newsletter for travel tips and exclusive deals.
            </p>
            <form className="mt-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 text-sm text-gray-900 bg-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium rounded-r-md"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">© 2023 Wanderlust. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-white text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
