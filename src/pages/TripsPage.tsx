import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, Calendar, MapPin, SlidersHorizontal } from 'lucide-react';
import { useTrips } from '../context/TripContext';
import TripCard from '../components/TripCard';

const TripsPage = () => {
  const { trips } = useTrips();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState('');
  const [destinationFilter, setDestinationFilter] = useState('');

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          trip.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = dateFilter ? 
      (new Date(trip.startDate) <= new Date(dateFilter) && new Date(trip.endDate) >= new Date(dateFilter)) : 
      true;
    
    const matchesDestination = destinationFilter ? 
      trip.destination.toLowerCase().includes(destinationFilter.toLowerCase()) : 
      true;
    
    return matchesSearch && matchesDate && matchesDestination;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">My Trips</h1>
        <Link 
          to="/create-trip" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300 flex items-center"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Create New Trip
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search trips by title or destination"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={toggleFilter}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors duration-300 flex items-center"
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>
        
        {filterOpen && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Enter destination"
                  value={destinationFilter}
                  onChange={(e) => setDestinationFilter(e.target.value)}
                  className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map(trip => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No trips found</h3>
          <p className="text-gray-600 mb-6">
            {trips.length === 0 
              ? "You haven't created any trips yet." 
              : "No trips match your search criteria."}
          </p>
          {trips.length === 0 && (
            <Link 
              to="/create-trip" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-300"
            >
              Create Your First Trip
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default TripsPage;
