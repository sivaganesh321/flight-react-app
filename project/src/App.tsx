import React, { useState, useCallback } from 'react';
import { Plane } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import SearchForm from './components/SearchForm';
import FlightCard from './components/FlightCard';
import Filters from './components/Filters';
import type { Flight, SearchParams, FilterState } from './types';

const mockFlights: Flight[] = [
  {
    id: '1',
    airline: 'United Airlines',
    flightNumber: 'UA123',
    departure: {
      airport: 'JFK',
      time: '08:00 AM'
    },
    arrival: {
      airport: 'LAX',
      time: '11:00 AM'
    },
    duration: '3h 00m',
    price: 299,
    stops: 0
  },
  {
    id: '2',
    airline: 'Delta',
    flightNumber: 'DL456',
    departure: {
      airport: 'JFK',
      time: '10:30 AM'
    },
    arrival: {
      airport: 'LAX',
      time: '2:30 PM'
    },
    duration: '4h 00m',
    price: 275,
    stops: 1
  },
  {
    id: '3',
    airline: 'American Airlines',
    flightNumber: 'AA789',
    departure: {
      airport: 'JFK',
      time: '2:00 PM'
    },
    arrival: {
      airport: 'LAX',
      time: '5:00 PM'
    },
    duration: '3h 00m',
    price: 325,
    stops: 0
  }
];

const airlines = ['United Airlines', 'Delta', 'American Airlines'];

function App() {
  const [allFlights, setAllFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (params: SearchParams) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAllFlights(mockFlights);
    setFilteredFlights(mockFlights);
    setHasSearched(true);
    setIsLoading(false);
  };

  const handleFilterChange = useCallback((filters: FilterState) => {
    let results = [...allFlights];

    // Filter by stops
    if (filters.stops.length > 0) {
      results = results.filter(flight => {
        if (filters.stops.includes('Direct')) {
          return flight.stops === 0;
        }
        if (filters.stops.includes('1 Stop')) {
          return flight.stops === 1;
        }
        if (filters.stops.includes('2+ Stops')) {
          return flight.stops >= 2;
        }
        return true;
      });
    }

    // Filter by airlines
    if (filters.airlines.length > 0) {
      results = results.filter(flight => filters.airlines.includes(flight.airline));
    }

    // Filter by price
    if (filters.maxPrice < 2000) {
      results = results.filter(flight => flight.price <= filters.maxPrice);
    }

    setFilteredFlights(results);
  }, [allFlights]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Plane className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Flight Search</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </motion.div>

        {hasSearched && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="sticky top-24">
                <Filters onFilterChange={handleFilterChange} airlines={airlines} />
              </div>
            </motion.div>
            <div className="lg:col-span-3 space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredFlights.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-lg shadow-md p-8 text-center"
                  >
                    <p className="text-gray-600">No flights found matching your filters.</p>
                  </motion.div>
                ) : (
                  filteredFlights.map((flight, index) => (
                    <motion.div
                      key={flight.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <FlightCard flight={flight} />
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;