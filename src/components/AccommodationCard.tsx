import { Calendar, MapPin, DollarSign, Edit, Trash2 } from 'lucide-react';
import { Accommodation } from '../context/TripContext';
import { format } from 'date-fns';

interface AccommodationCardProps {
  accommodation: Accommodation;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const AccommodationCard = ({ accommodation, onEdit, onDelete }: AccommodationCardProps) => {
  const { id, name, address, checkIn, checkOut, price, bookingConfirmation } = accommodation;

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(id)}
            className="text-gray-500 hover:text-blue-600 transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button 
            onClick={() => onDelete(id)}
            className="text-gray-500 hover:text-red-600 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="mt-3 space-y-2">
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{address}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">
            Check-in: {formatDate(checkIn)} - Check-out: {formatDate(checkOut)}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <DollarSign className="h-4 w-4 mr-2" />
          <span className="text-sm">Total: ${price}</span>
        </div>
      </div>
      
      {bookingConfirmation && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Booking Confirmation:</span> {bookingConfirmation}
          </p>
        </div>
      )}
    </div>
  );
};

export default AccommodationCard;
