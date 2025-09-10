import { createContext, useState, useContext, ReactNode } from 'react';
import { format } from 'date-fns';

export interface Activity {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  notes: string;
  cost: number;
}

export interface Accommodation {
  id: string;
  name: string;
  address: string;
  checkIn: string;
  checkOut: string;
  price: number;
  bookingConfirmation: string;
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  coverImage: string;
  description: string;
  activities: Activity[];
  accommodations: Accommodation[];
}

interface TripContextType {
  trips: Trip[];
  addTrip: (trip: Omit<Trip, 'id'>) => void;
  updateTrip: (id: string, updatedTrip: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  addActivity: (tripId: string, activity: Omit<Activity, 'id'>) => void;
  updateActivity: (tripId: string, activityId: string, updatedActivity: Partial<Activity>) => void;
  deleteActivity: (tripId: string, activityId: string) => void;
  addAccommodation: (tripId: string, accommodation: Omit<Accommodation, 'id'>) => void;
  updateAccommodation: (tripId: string, accommodationId: string, updatedAccommodation: Partial<Accommodation>) => void;
  deleteAccommodation: (tripId: string, accommodationId: string) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

// Sample data
const initialTrips: Trip[] = [
  {
    id: '1',
    title: 'Summer in Paris',
    destination: 'Paris, France',
    startDate: '2023-06-15',
    endDate: '2023-06-25',
    budget: 3000,
    coverImage: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Exploring the city of lights, visiting museums, and enjoying French cuisine.',
    activities: [
      {
        id: 'a1',
        title: 'Eiffel Tower Visit',
        date: '2023-06-16',
        time: '10:00',
        location: 'Eiffel Tower',
        notes: 'Buy tickets in advance to skip the line',
        cost: 25
      },
      {
        id: 'a2',
        title: 'Louvre Museum',
        date: '2023-06-17',
        time: '13:00',
        location: 'Louvre Museum',
        notes: 'Focus on the main attractions like Mona Lisa',
        cost: 15
      }
    ],
    accommodations: [
      {
        id: 'acc1',
        name: 'Hotel de Paris',
        address: '123 Rue de Rivoli, Paris',
        checkIn: '2023-06-15',
        checkOut: '2023-06-25',
        price: 1200,
        bookingConfirmation: 'PARIS123456'
      }
    ]
  },
  {
    id: '2',
    title: 'Tokyo Adventure',
    destination: 'Tokyo, Japan',
    startDate: '2023-09-10',
    endDate: '2023-09-20',
    budget: 4500,
    coverImage: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Exploring Japanese culture, visiting temples, and trying authentic Japanese cuisine.',
    activities: [
      {
        id: 'a3',
        title: 'Senso-ji Temple',
        date: '2023-09-11',
        time: '09:00',
        location: 'Asakusa',
        notes: 'Visit early to avoid crowds',
        cost: 0
      },
      {
        id: 'a4',
        title: 'Shibuya Crossing',
        date: '2023-09-12',
        time: '18:00',
        location: 'Shibuya',
        notes: 'Best at sunset for photos',
        cost: 0
      }
    ],
    accommodations: [
      {
        id: 'acc2',
        name: 'Tokyo Bay Hotel',
        address: '456 Shibuya Street, Tokyo',
        checkIn: '2023-09-10',
        checkOut: '2023-09-20',
        price: 1800,
        bookingConfirmation: 'TOKYO789012'
      }
    ]
  }
];

export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);

  const addTrip = (trip: Omit<Trip, 'id'>) => {
    const newTrip = {
      ...trip,
      id: Date.now().toString(),
      activities: [],
      accommodations: []
    };
    setTrips([...trips, newTrip]);
  };

  const updateTrip = (id: string, updatedTrip: Partial<Trip>) => {
    setTrips(trips.map(trip => 
      trip.id === id ? { ...trip, ...updatedTrip } : trip
    ));
  };

  const deleteTrip = (id: string) => {
    setTrips(trips.filter(trip => trip.id !== id));
  };

  const addActivity = (tripId: string, activity: Omit<Activity, 'id'>) => {
    const newActivity = {
      ...activity,
      id: Date.now().toString()
    };
    
    setTrips(trips.map(trip => 
      trip.id === tripId 
        ? { ...trip, activities: [...trip.activities, newActivity] } 
        : trip
    ));
  };

  const updateActivity = (tripId: string, activityId: string, updatedActivity: Partial<Activity>) => {
    setTrips(trips.map(trip => 
      trip.id === tripId 
        ? { 
            ...trip, 
            activities: trip.activities.map(activity => 
              activity.id === activityId 
                ? { ...activity, ...updatedActivity } 
                : activity
            ) 
          } 
        : trip
    ));
  };

  const deleteActivity = (tripId: string, activityId: string) => {
    setTrips(trips.map(trip => 
      trip.id === tripId 
        ? { 
            ...trip, 
            activities: trip.activities.filter(activity => activity.id !== activityId) 
          } 
        : trip
    ));
  };

  const addAccommodation = (tripId: string, accommodation: Omit<Accommodation, 'id'>) => {
    const newAccommodation = {
      ...accommodation,
      id: Date.now().toString()
    };
    
    setTrips(trips.map(trip => 
      trip.id === tripId 
        ? { ...trip, accommodations: [...trip.accommodations, newAccommodation] } 
        : trip
    ));
  };

  const updateAccommodation = (tripId: string, accommodationId: string, updatedAccommodation: Partial<Accommodation>) => {
    setTrips(trips.map(trip => 
      trip.id === tripId 
        ? { 
            ...trip, 
            accommodations: trip.accommodations.map(accommodation => 
              accommodation.id === accommodationId 
                ? { ...accommodation, ...updatedAccommodation } 
                : accommodation
            ) 
          } 
        : trip
    ));
  };

  const deleteAccommodation = (tripId: string, accommodationId: string) => {
    setTrips(trips.map(trip => 
      trip.id === tripId 
        ? { 
            ...trip, 
            accommodations: trip.accommodations.filter(accommodation => accommodation.id !== accommodationId) 
          } 
        : trip
    ));
  };

  return (
    <TripContext.Provider value={{ 
      trips, 
      addTrip, 
      updateTrip, 
      deleteTrip,
      addActivity,
      updateActivity,
      deleteActivity,
      addAccommodation,
      updateAccommodation,
      deleteAccommodation
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrips must be used within a TripProvider');
  }
  return context;
};
