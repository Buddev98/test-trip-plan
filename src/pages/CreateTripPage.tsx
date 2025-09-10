import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTrips } from '../context/TripContext';

const CreateTripPage = () => {
  const navigate = useNavigate();
  const { addTrip } = useTrips();
  
  const [trip, setTrip] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: 0,
    coverImage: '',
    description: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTrip({
      ...trip,
      [name]: name === 'budget' ? parseFloat(value) || 0 : value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!trip.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!trip.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }
    
    if (!trip.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!trip.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (trip.startDate && new Date(trip.endDate) < new Date(trip.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    if (!trip.budget) {
      newErrors.budget = 'Budget is required';
    } else if (trip.budget <= 0) {
      newErrors.budget = 'Budget must be greater than 0';
    }
    
    if (!trip.coverImage.trim()) {
      newErrors.coverImage = 'Cover image URL is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      addTrip(trip);
      navigate('/trips');
    }
  };

  // Sample cover images for selection
  const sampleCoverImages = [
    'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-1" />
        Back
      </button>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Trip</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trip Title*</label>
              <input
                type="text"
                name="title"
                value={trip.title}
                onChange={handleChange}
                className={`w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Summer in Paris"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination*</label>
              <input
                type="text"
                name="destination"
                value={trip.destination}
                onChange={handleChange}
                className={`w-full border ${errors.destination ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Paris, France"
              />
              {errors.destination && <p className="mt-1 text-sm text-red-600">{errors.destination}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date*</label>
              <input
                type="date"
                name="startDate"
                value={trip.startDate}
                onChange={handleChange}
                className={`w-full border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date*</label>
              <input
                type="date"
                name="endDate"
                value={trip.endDate}
                onChange={handleChange}
                className={`w-full border ${errors.endDate ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget* ($)</label>
              <input
                type="number"
                name="budget"
                value={trip.budget || ''}
                onChange={handleChange}
                className={`w-full border ${errors.budget ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
              {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget}</p>}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image*</label>
              <input
                type="text"
                name="coverImage"
                value={trip.coverImage}
                onChange={handleChange}
                className={`w-full border ${errors.coverImage ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.coverImage && <p className="mt-1 text-sm text-red-600">{errors.coverImage}</p>}
              
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Or select from sample images:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {sampleCoverImages.map((image, index) => (
                    <div 
                      key={index}
                      onClick={() => setTrip({...trip, coverImage: image})}
                      className={`cursor-pointer rounded-md overflow-hidden h-20 border-2 ${trip.coverImage === image ? 'border-blue-500' : 'border-transparent'}`}
                    >
                      <img 
                        src={image} 
                        alt={`Sample ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={trip.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your trip plans..."
                rows={4}
              ></textarea>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/trips')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-medium transition-colors duration-300 mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-300"
            >
              Create Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTripPage;
