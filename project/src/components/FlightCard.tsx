import React from 'react';
import { Clock, Plane } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Flight } from '../types';

interface FlightCardProps {
  flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <img
            src={`https://source.unsplash.com/64x64/?airline,${flight.airline.toLowerCase()}`}
            alt={flight.airline}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="font-semibold text-lg">{flight.airline}</h3>
            <p className="text-gray-500 text-sm">{flight.flightNumber}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
          <p className="text-gray-500 text-sm">per person</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex-1">
          <p className="font-semibold text-lg">{flight.departure.time}</p>
          <p className="text-gray-600">{flight.departure.airport}</p>
        </div>

        <div className="flex-1 flex flex-col items-center px-4">
          <div className="w-full flex items-center">
            <div className="h-[2px] flex-1 bg-gray-300"></div>
            <Plane className="mx-2 text-blue-600 transform rotate-90" />
            <div className="h-[2px] flex-1 bg-gray-300"></div>
          </div>
          <div className="flex items-center mt-2 text-gray-500 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            {flight.duration}
          </div>
          <p className="text-gray-500 text-sm mt-1">
            {flight.stops === 0 ? (
              <span className="text-green-600 font-medium">Direct</span>
            ) : (
              <span className="text-orange-600 font-medium">
                {flight.stops} stop{flight.stops > 1 ? 's' : ''}
              </span>
            )}
          </p>
        </div>

        <div className="flex-1 text-right">
          <p className="font-semibold text-lg">{flight.arrival.time}</p>
          <p className="text-gray-600">{flight.arrival.airport}</p>
        </div>
      </div>
    </motion.div>
  );
}