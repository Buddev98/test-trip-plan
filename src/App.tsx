import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TripsPage from './pages/TripsPage';
import TripDetailsPage from './pages/TripDetailsPage';
import CreateTripPage from './pages/CreateTripPage';
import ExploreDestinationsPage from './pages/ExploreDestinationsPage';
import { TripProvider } from './context/TripContext';

function App() {
  return (
    <TripProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50 font-[Poppins]">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/trips" element={<TripsPage />} />
              <Route path="/trips/:id" element={<TripDetailsPage />} />
              <Route path="/create-trip" element={<CreateTripPage />} />
              <Route path="/explore" element={<ExploreDestinationsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </TripProvider>
  );
}

export default App;
