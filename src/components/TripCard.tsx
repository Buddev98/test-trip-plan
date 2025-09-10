import { Link } from 'react-router-dom';
import { Calendar, MapPin, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { Trip } from '../context/TripContext';

interface TripCardProps {
  trip: Trip;
}

const TripCard = ({ trip }: TripCardProps) => {
  const { id, title, destination, startDate, endDate, budget, coverImage } = trip;
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={coverImage} 
          alt={destination} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex items-center mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{destination}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-gray-600 mb-3">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="text-sm">
            {formatDate(startDate)} - {formatDate(endDate)}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <DollarSign className="h-4 w-4 mr-1" />
          <span className="text-sm">Budget: ${budget}</span>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Link 
            to={`/trips/${id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
