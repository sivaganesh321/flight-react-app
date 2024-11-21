export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    time: string;
  };
  arrival: {
    airport: string;
    time: string;
  };
  duration: string;
  price: number;
  stops: number;
}

export interface SearchParams {
  from: string;
  to: string;
  departDate: Date;
  returnDate?: Date;
  passengers: number;
  tripType: 'oneWay' | 'roundTrip';
}

export interface FilterState {
  stops: string[];
  airlines: string[];
  maxPrice: number;
}