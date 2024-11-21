import React, { useState, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import type { FilterState } from '../types';

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
  airlines: string[];
}

export default function Filters({ onFilterChange, airlines }: FiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    stops: [],
    airlines: [],
    maxPrice: 2000
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleStopChange = (stop: string) => {
    setFilters(prev => ({
      ...prev,
      stops: prev.stops.includes(stop)
        ? prev.stops.filter(s => s !== stop)
        : [...prev.stops, stop]
    }));
  };

  const handleAirlineChange = (airline: string) => {
    setFilters(prev => ({
      ...prev,
      airlines: prev.airlines.includes(airline)
        ? prev.airlines.filter(a => a !== airline)
        : [...prev.airlines, airline]
    }));
  };

  const handlePriceChange = (price: number) => {
    setFilters(prev => ({
      ...prev,
      maxPrice: price
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <motion.div layout className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">Stops</h3>
          <div className="space-y-2">
            {['Direct', '1 Stop', '2+ Stops'].map((stop) => (
              <label key={stop} className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.stops.includes(stop)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors"
                  onChange={() => handleStopChange(stop)}
                />
                <span className="ml-2 text-gray-700 group-hover:text-blue-600 transition-colors">
                  {stop}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Airlines</h3>
          <div className="space-y-2">
            {airlines.map((airline) => (
              <label key={airline} className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.airlines.includes(airline)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors"
                  onChange={() => handleAirlineChange(airline)}
                />
                <span className="ml-2 text-gray-700 group-hover:text-blue-600 transition-colors">
                  {airline}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Price Range</h3>
          <input
            type="range"
            min="0"
            max="2000"
            value={filters.maxPrice}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            onChange={(e) => handlePriceChange(parseInt(e.target.value))}
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>$0</span>
            <span className="text-blue-600 font-medium">${filters.maxPrice}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}