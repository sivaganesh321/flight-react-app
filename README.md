Project Overview
The application allows users to search for flight prices between different locations using the Sky Scrapper API.
Features

🔍 Flight Price Search
📍 Airport Selection (Multiple Airports)
💰 Currency Conversion Support
📅 Date-based Flight Pricing
📱 Fully Responsive Design
🚨 Robust Error Handling
📊 Sample Data Fallback

Prerequisites

Node.js (v14 or later)
npm or Yarn
React
Tailwind CSS
modern ui Components

Installation
1. Clone the Repository
cd google-flights-clone
2. Install Dependencies
bashCopynpm install
# or
yarn install
3. Set Up Environment

Ensure you have the Sky Scrapper API key
Configure API endpoint in the source code

API Integration

API Provider: Sky Scrapper
Endpoint: Flight Price Calendar
Authentication: RapidAPI Key
Methods: GET Flight Prices

Supported Airports

Mumbai (BOM)
New York (JFK)
London (LHR)
San Francisco (SFO)
Dubai (DXB)

Supported Currencies

USD
EUR
GBP
INR
AED

Usage

Select Origin Airport
Select Destination Airport
Choose Travel Date
Select Currency
Click "Search Flights"

Error Handling

Network Error Detection
API Limitation Handling
Sample Data Fallback
User-Friendly Error Messages

Deployment

Build Command: npm run build
Start Command: npm start

Technical Stack

React
Tailwind CSS
shadcn/ui
Fetch API
Lucide React Icons

Project Structure
Copysrc/
├── components/
│   └── FlightSearch.js
└── App.js
Performance Optimization

Minimal API Calls
Responsive Design
Error State Management

Contributing

Fork the Repository
Create Feature Branch
Commit Changes
Push to Branch
Create Pull Request

Known Limitations

Limited Airport Selections
Dependent on Sky Scrapper API Availability
Sample Data Used for API Failures

Future Enhancements

More Airports
Round Trip Support
Price Comparison
Detailed Flight Information

Demo Video
