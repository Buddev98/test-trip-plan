import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Compass, PlaneLanding, Clock, Star } from 'lucide-react';
import { useTrips } from '../context/TripContext';

const HomePage = () => {
  const { trips } = useTrips();
  const featuredTrips = trips.slice(0, 3);
  
  const popularDestinations = [
    {
      id: '1',
      name: 'Santorini',
      country: 'Greece',
      image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.8,
      description: 'Famous for its stunning sunsets, white-washed buildings, and blue domes.'
    },
    {
      id: '2',
      name: 'Kyoto',
      country: 'Japan',
      image: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.7,
      description: 'Known for its classical Buddhist temples, gardens, imperial palaces, and traditional wooden houses.'
    },
    {
      id: '3',
      name: 'Machu Picchu',
      country: 'Peru',
      image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.9,
      description: 'An ancient Incan citadel set high in the Andes Mountains, featuring dry-stone walls and panoramic views.'
    },
    {
      id: '4',
      name: 'Barcelona',
      country: 'Spain',
      image: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.6,
      description: 'Known for its art and architecture, including Gaudí\'s Sagrada Família church and other modernist landmarks.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Plan Your Perfect Trip
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl">
            Discover amazing destinations, create detailed itineraries, and make your travel dreams a reality with our trip planner.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/create-trip" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium transition-colors duration-300"
            >
              Start Planning
            </Link>
            <Link 
              to="/explore" 
              className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-md text-lg font-medium transition-colors duration-300"
            >
              Explore Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6 -mt-20 relative z-10">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="date"
                    className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="date"
                    className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-300 flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Plan Your Trip with Ease</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our trip planner helps you organize every aspect of your journey, from accommodations to activities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Discover Destinations</h3>
              <p className="text-gray-600">
                Explore popular destinations around the world and find the perfect place for your next adventure.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Create Itineraries</h3>
              <p className="text-gray-600">
                Build detailed day-by-day itineraries with activities, accommodations, and transportation.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Save Time</h3>
              <p className="text-gray-600">
                Streamline your travel planning process and focus on enjoying your trip instead of stressing about details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Popular Destinations</h2>
            <Link 
              to="/explore" 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              View All
              <Compass className="ml-1 h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map(destination => (
              <div key={destination.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 m-2 rounded-md flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{destination.name}</h3>
                  <div className="flex items-center text-gray-600 mt-1 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{destination.country}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-2">{destination.description}</p>
                  
                  <div className="mt-4 flex justify-end">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Explore →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Trips Section */}
      {trips.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Your Trips</h2>
              <Link 
                to="/trips" 
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                View All
                <PlaneLanding className="ml-1 h-5 w-5" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredTrips.map(trip => (
                <div key={trip.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={trip.coverImage} 
                      alt={trip.destination} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="text-xl font-bold">{trip.title}</h3>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{trip.destination}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center text-gray-600 mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Link 
                        to={`/trips/${trip.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Plan Your Next Adventure?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Start planning your trip today and create memories that will last a lifetime.
          </p>
          <Link 
            to="/create-trip" 
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300"
          >
            Create Your Trip
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
