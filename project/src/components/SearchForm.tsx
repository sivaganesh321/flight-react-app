import React, { useState } from 'react';
import { Plane, Calendar, Users, ArrowRight, ArrowLeftRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { SearchParams } from '../types';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: '',
    to: '',
    departDate: new Date(),
    returnDate: new Date(),
    passengers: 1,
    tripType: 'roundTrip'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const toggleTripType = () => {
    setSearchParams(prev => ({
      ...prev,
      tripType: prev.tripType === 'roundTrip' ? 'oneWay' : 'roundTrip',
      returnDate: prev.tripType === 'roundTrip' ? undefined : new Date()
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-4 mb-6">
        <motion.button
          type="button"
          onClick={toggleTripType}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeftRight className="w-4 h-4" />
          {searchParams.tripType === 'roundTrip' ? 'Round Trip' : 'One Way'}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Plane className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="From"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
            value={searchParams.from}
            onChange={(e) => setSearchParams(prev => ({ ...prev, from: e.target.value }))}
          />
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="To"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
            value={searchParams.to}
            onChange={(e) => setSearchParams(prev => ({ ...prev, to: e.target.value }))}
          />
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
          <input
            type="date"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
            value={searchParams.departDate.toISOString().split('T')[0]}
            onChange={(e) => setSearchParams(prev => ({ ...prev, departDate: new Date(e.target.value) }))}
          />
        </div>

        {searchParams.tripType === 'roundTrip' && (
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <input
              type="date"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
              value={searchParams.returnDate?.toISOString().split('T')[0]}
              onChange={(e) => setSearchParams(prev => ({ ...prev, returnDate: new Date(e.target.value) }))}
            />
          </div>
        )}

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Users className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
            value={searchParams.passengers}
            onChange={(e) => setSearchParams(prev => ({ ...prev, passengers: parseInt(e.target.value) }))}
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <motion.button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
              Searching...
            </span>
          ) : (
            'Search Flights'
          )}
        </motion.button>
      </div>
    </form>
  );
}