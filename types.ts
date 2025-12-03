// FIX: Add Location and CityLocation interfaces for map coordinates.
export interface Location {
    lat: number;
    lng: number;
}

export interface CityLocation extends Location {
    city: string;
}

export interface Destination {
  country: string;
  city: string;
}

export interface TravelRequest {
  destinations: Destination[];
  startDate: string;
  endDate: string;
  transport: string;
}

export interface Activity {
  time: string;
  name: string;
  description: string;
  imageUrl: string;
  details: string[];
  // FIX: Add optional location property for map functionality.
  location?: Location;
}

export interface DailyPlan {
  day: number;
  title: string;
  activities: Activity[];
}

export interface LocalCuisine {
  name: string;
  description: string;
  imageUrl: string;
}

export interface HourlyForecast {
  time: string;
  temperature: string;
  icon: WeatherIconType;
}

export interface WeatherForecast {
  date: string;
  dayOfWeek: string;
  temperature: string;
  condition: string;
  icon: WeatherIconType;
  hourly: HourlyForecast[];
}

export type WeatherIconType = 'SUNNY' | 'PARTLY_CLOUDY' | 'CLOUDY' | 'RAINY' | 'SNOWY' | 'THUNDERSTORM' | 'FOGGY';

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface TravelPlan {
  cityName: string;
  countryName: string;
  travelDates: string;
  tripImageUrl: string;
  dailyItinerary: DailyPlan[];
  localCuisine: LocalCuisine[];
  importantNotes: string[];
  weatherForecast: WeatherForecast[];
  // FIX: Add optional locations property for map functionality.
  locations?: CityLocation[];
  groundingSources?: GroundingSource[];
}

export type ExpenseCategory = 'Konaklama' | 'Yemek' | 'Ulaşım' | 'Eğlence' | 'Alışveriş' | 'Diğer';

export interface ExpenseItem {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category?: ExpenseCategory;
}