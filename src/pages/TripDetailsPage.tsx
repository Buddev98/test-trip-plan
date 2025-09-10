import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, DollarSign, Clock, PlusCircle, 
  Edit, Trash2, ArrowLeft, Hotel, Compass 
} from 'lucide-react';
import { format } from 'date-fns';
import { useTrips, Activity, Accommodation } from '../context/TripContext';
import ActivityCard from '../components/ActivityCard';
import AccommodationCard from '../components/AccommodationCard';

const TripDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { trips, deleteTrip, addActivity, updateActivity, deleteActivity, addAccommodation, updateAccommodation, deleteAccommodation } = useTrips();
  
  const trip = trips.find(t => t.id === id);
  
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [showAddAccommodation, setShowAddAccommodation] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [editingAccommodation, setEditingAccommodation] = useState<Accommodation | null>(null);
  
  const [newActivity, setNewActivity] = useState<Omit<Activity, 'id'>>({
    title: '',
    date: '',
    time: '',
    location: '',
    notes: '',
    cost: 0
  });
  
  const [newAccommodation, setNewAccommodation] = useState<Omit<Accommodation, 'id'>>({
    name: '',
    address: '',
    checkIn: '',
    checkOut: '',
    price: 0,
    bookingConfirmation: ''
  });

  if (!trip) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Compass className="h-8 w-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Trip Not Found</h2>
        <p className="text-gray-600 mb-8">The trip you're looking for doesn't exist or has been deleted.</p>
        <Link 
          to="/trips" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-300"
        >
          Back to My Trips
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  const handleDeleteTrip = () => {
    if (window.confirm('Are you sure you want to delete this trip? This action cannot be undone.')) {
      deleteTrip(trip.id);
      navigate('/trips');
    }
  };

  const handleAddActivity = () => {
    addActivity(trip.id, newActivity);
    setNewActivity({
      title: '',
      date: '',
      time: '',
      location: '',
      notes: '',
      cost: 0
    });
    setShowAddActivity(false);
  };

  const handleEditActivity = (activityId: string) => {
    const activity = trip.activities.find(a => a.id === activityId);
    if (activity) {
      setEditingActivity(activity);
      setNewActivity({
        title: activity.title,
        date: activity.date,
        time: activity.time,
        location: activity.location,
        notes: activity.notes,
        cost: activity.cost
      });
      setShowAddActivity(true);
    }
  };

  const handleUpdateActivity = () => {
    if (editingActivity) {
      updateActivity(trip.id, editingActivity.id, newActivity);
      setEditingActivity(null);
      setNewActivity({
        title: '',
        date: '',
        time: '',
        location: '',
        notes: '',
        cost: 0
      });
      setShowAddActivity(false);
    }
  };

  const handleAddAccommodation = () => {
    addAccommodation(trip.id, newAccommodation);
    setNewAccommodation({
      name: '',
      address: '',
      checkIn: '',
      checkOut: '',
      price: 0,
      bookingConfirmation: ''
    });
    setShowAddAccommodation(false);
  };

  const handleEditAccommodation = (accommodationId: string) => {
    const accommodation = trip.accommodations.find(a => a.id === accommodationId);
    if (accommodation) {
      setEditingAccommodation(accommodation);
      setNewAccommodation({
        name: accommodation.name,
        address: accommodation.address,
        checkIn: accommodation.checkIn,
        checkOut: accommodation.checkOut,
        price: accommodation.price,
        bookingConfirmation: accommodation.bookingConfirmation
      });
      setShowAddAccommodation(true);
    }
  };

  const handleUpdateAccommodation = () => {
    if (editingAccommodation) {
      updateAccommodation(trip.id, editingAccommodation.id, newAccommodation);
      setEditingAccommodation(null);
      setNewAccommodation({
        name: '',
        address: '',
        checkIn: '',
        checkOut: '',
        price: 0,
        bookingConfirmation: ''
      });
      setShowAddAccommodation(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[300px] bg-cover bg-center" style={{ backgroundImage: `url(${trip.coverImage})` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute top-4 left-4">
          <Link 
            to="/trips" 
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300 flex items-center"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Trips
          </Link>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{trip.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{trip.destination}</span>
              </div>
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
              <Link 
                to={`/edit-trip/${trip.id}`} 
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors duration-300 flex items-center"
              >
                <Edit className="h-5 w-5 mr-2" />
                Edit
              </Link>
              <button 
                onClick={handleDeleteTrip}
                className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md font-medium transition-colors duration-300 flex items-center"
              >
                <Trash2 className="h-5 w-5 mr-2" />
                Delete
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="flex items-center bg-blue-50 p-4 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Dates</p>
                <p className="font-medium">{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</p>
              </div>
            </div>
            
            <div className="flex items-center bg-green-50 p-4 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Budget</p>
                <p className="font-medium">${trip.budget}</p>
              </div>
            </div>
            
            <div className="flex items-center bg-purple-50 p-4 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">
                  {Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                </p>
              </div>
            </div>
          </div>
          
          {trip.description && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600">{trip.description}</p>
            </div>
          )}
        </div>
        
        {/* Accommodations Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Accommodations</h2>
            <button 
              onClick={() => {
                setEditingAccommodation(null);
                setNewAccommodation({
                  name: '',
                  address: '',
                  checkIn: trip.startDate,
                  checkOut: trip.endDate,
                  price: 0,
                  bookingConfirmation: ''
                });
                setShowAddAccommodation(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300 flex items-center"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Accommodation
            </button>
          </div>
          
          {showAddAccommodation && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {editingAccommodation ? 'Edit Accommodation' : 'Add New Accommodation'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newAccommodation.name}
                    onChange={(e) => setNewAccommodation({...newAccommodation, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Hotel name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={newAccommodation.address}
                    onChange={(e) => setNewAccommodation({...newAccommodation, address: e.target.value})}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                  <input
                    type="date"
                    value={newAccommodation.checkIn}
                    onChange={(e) => setNewAccommodation({...newAccommodation, checkIn: e.target.value})}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                  <input
                    type="date"
                    value={newAccommodation.checkOut}
                    onChange={(e) => setNewAccommodation({...newAccommodation, checkOut: e.target.value})}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    value={newAccommodation.price}
                    onChange={(e) => setNewAccommodation({...newAccommodation, price: parseFloat(e.target.value)})}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Booking Confirmation</label>
                  <input
                    type="text"
                    value={newAccommodation.bookingConfirmation}
                    onChange={(e) => setNewAccommodation({...newAccommodation, bookingConfirmation: e.target.value})}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirmation number"
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-6 space-x-3">
                <button 
                  onClick={() => {
                    setShowAddAccommodation(false);
                    setEditingAccommodation(null);
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors duration-300"
                >
                  Cancel
                </button>
                <button 
                  onClick={editingAccommodation ? handleUpdateAccommodation : handleAddAccommodation}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
                >
                  {editingAccommodation ? 'Update' : 'Add'} Accommodation
                </button>
              </div>
            </div>
          )}
          
          {trip.accommodations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trip.accommodations.map(accommodation => (
                <AccommodationCard 
                  key={accommodation.id} 
                  accommodation={accommodation} 
                  onEdit={handleEditAccommodation}
                  onDelete={(id) => {
                    if (window.confirm('Are you sure you want to delete this accommodation?')) {
                      deleteAccommodation(trip.id, id);
                    }
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Hotel className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Accommodations Added</h3>
              <p className="text-gray-600 mb-6">
                Add where you'll be staying during your trip.
              </p>
              <button 
                onClick={() => {
                  setEditingAccommodation(null);
                  setNewAccommodation({
                    name: '',
                    address: '',
                    checkIn: trip.startDate,
                    checkOut: trip.endDate,
                    price: 0,
                    bookingConfirmation: ''
                  });
                  setShowAddAccommodation(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-300"
              >
                Add Your First Accommodation
              </button>
            </div>
          )}
        </div>
        
        {/* Activities Section */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Activities</h2>
            <button 
              onClick={() => {
                setEditingActivity(null);
                setNewActivity({
                  title: '',
                  date: trip.startDate,
                  time: '10:00',
                  location: '',
                  notes: '',
                  cost: 0
                });
                setShowAddActivity(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300 flex items-center"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Activity
            </button>
          </div>
          
          {showAddActivity && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {editingActivity ? 'Edit Activity' : 'Add New Activity'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={newActivity.title}
                    onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Activity name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newActivity.location}
                    onChange={(e) => setNewActivity({...newActivity, location: e.target.value})}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Location"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={newActivity.date}
                    onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={newActivity.time}
                    onChange={(e) => setNewActivity({...newActivity, time: e.target.value})}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
                  <input
                    type="number"
                    value={newActivity.cost}
                    onChange={(e) => setNewActivity({...newActivity, cost: parseFloat(e.target.value)})}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={newActivity.notes}
                    onChange={(e) => setNewActivity({...newActivity, notes: e.target.value})}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Additional notes"
                    rows={3}
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end mt-6 space-x-3">
                <button 
                  onClick={() => {
                    setShowAddActivity(false);
                    setEditingActivity(null);
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors duration-300"
                >
                  Cancel
                </button>
                <button 
                  onClick={editingActivity ? handleUpdateActivity : handleAddActivity}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
                >
                  {editingActivity ? 'Update' : 'Add'} Activity
                </button>
              </div>
            </div>
          )}
          
          {trip.activities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trip.activities.map(activity => (
                <ActivityCard 
                  key={activity.id} 
                  activity={activity} 
                  onEdit={handleEditActivity}
                  onDelete={(id) => {
                    if (window.confirm('Are you sure you want to delete this activity?')) {
                      deleteActivity(trip.id, id);
                    }
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Compass className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Activities Added</h3>
              <p className="text-gray-600 mb-6">
                Add activities to make the most of your trip.
              </p>
              <button 
                onClick={() => {
                  setEditingActivity(null);
                  setNewActivity({
                    title: '',
                    date: trip.startDate,
                    time: '10:00',
                    location: '',
                    notes: '',
                    cost: 0
                  });
                  setShowAddActivity(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-300"
              >
                Add Your First Activity
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripDetailsPage;
