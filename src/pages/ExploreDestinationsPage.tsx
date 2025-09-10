import { useState } from 'react';
import { Search, MapPin, Globe, Filter } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  rating: number;
  description: string;
  continent: string;
  type: string;
}

const ExploreDestinationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [continentFilter, setContinentFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };
  
  const destinations: Destination[] = [
    {
      id: '1',
      name: 'Santorini',
      country: 'Greece',
      image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.8,
      description: 'Famous for its stunning sunsets, white-washed buildings, and blue domes overlooking the Aegean Sea.',
      continent: 'Europe',
      type: 'Beach'
    },
    {
      id: '2',
      name: 'Kyoto',
      country: 'Japan',
      image: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.7,
      description: 'Known for its classical Buddhist temples, gardens, imperial palaces, and traditional wooden houses.',
      continent: 'Asia',
      type: 'Cultural'
    },
    {
      id: '3',
      name: 'Machu Picchu',
      country: 'Peru',
      image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.9,
      description: 'An ancient Incan citadel set high in the Andes Mountains, featuring dry-stone walls and panoramic views.',
      continent: 'South America',
      type: 'Historical'
    },
    {
      id: '4',
      name: 'Barcelona',
      country: 'Spain',
      image: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.6,
      description: 'Known for its art and architecture, including Gaudí\'s Sagrada Família church and other modernist landmarks.',
      continent: 'Europe',
      type: 'City'
    },
    {
      id: '5',
      name: 'Bali',
      country: 'Indonesia',
      image: 'https://images.pexels.com/photos/1694621/pexels-photo-1694621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.5,
      description: 'A tropical paradise known for its forested volcanic mountains, iconic rice paddies, beaches, and coral reefs.',
      continent: 'Asia',
      type: 'Beach'
    },
    {
      id: '6',
      name: 'New York City',
      country: 'United States',
      image: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.7,
      description: 'The Big Apple offers world-class dining, shopping, and entertainment, with iconic landmarks like Times Square and Central Park.',
      continent: 'North America',
      type: 'City'
    },
    {
      id: '7',
      name: 'Cape Town',
      country: 'South Africa',
      image: 'https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.6,
      description: 'A stunning coastal city at the southern tip of Africa, known for Table Mountain, Cape Point, and vibrant culture.',
      continent: 'Africa',
      type: 'Beach'
    },
    {
      id: '8',
      name: 'Swiss Alps',
      country: 'Switzerland',
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.9,
      description: 'Majestic mountain range offering world-class skiing, hiking, and breathtaking alpine scenery.',
      continent: 'Europe',
      type: 'Mountain'
    }
  ];
  
  const continents = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'];
  const types = ['Beach', 'Mountain', 'City', 'Cultural', 'Historical', 'Adventure'];
  
  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          destination.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesContinent = continentFilter ? destination.continent === continentFilter : true;
    const matchesType = typeFilter ? destination.type === typeFilter : true;
    
    return matchesSearch && matchesContinent && matchesType;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[300px] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Explore Amazing Destinations
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl">
            Discover new places and plan your next adventure.
          </p>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search destinations"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={toggleFilter}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors duration-300 flex items-center"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>
          
          {filterOpen && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Continent</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={continentFilter}
                    onChange={(e) => setContinentFilter(e.target.value)}
                    className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Continents</option>
                    {continents.map(continent => (
                      <option key={continent} value={continent}>{continent}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Type</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Types</option>
                    {types.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {filteredDestinations.length} {filteredDestinations.length === 1 ? 'Destination' : 'Destinations'} Found
          </h2>
          
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDestinations.map(destination => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No destinations found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filters to find destinations.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreDestinationsPage;
