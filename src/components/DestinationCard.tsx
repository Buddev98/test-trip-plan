import { Star, MapPin } from 'lucide-react';

interface DestinationCardProps {
  destination: {
    id: string;
    name: string;
    country: string;
    image: string;
    rating: number;
    description: string;
  };
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  const { name, country, image, rating, description } = destination;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 m-2 rounded-md flex items-center">
          <Star className="h-4 w-4 mr-1 fill-current" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <div className="flex items-center text-gray-600 mt-1 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{country}</span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        
        <div className="mt-4 flex justify-end">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Explore →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
