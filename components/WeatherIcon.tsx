import React from 'react';
import type { WeatherIconType } from '../types';

interface WeatherIconProps {
  type: WeatherIconType;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ type, className = "w-8 h-8" }) => {
  const getIcon = () => {
    switch (type) {
      case 'SUNNY':
        return (
          <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5" className="text-yellow-400" />
            <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-yellow-500" />
          </svg>
        );
      case 'PARTLY_CLOUDY':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" className="text-gray-400" />
          </svg>
        );
      case 'CLOUDY':
        return (
          <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19c-1.7 0-3.37-.8-4.47-2.08A6.01 6.01 0 011 13c0-1.85.84-3.53 2.25-4.66A6.5 6.5 0 019.8 6.2c.93-.94 2.16-1.5 3.45-1.5 1.96 0 3.73 1.15 4.55 2.94A5.5 5.5 0 0123 12.5c0 3.03-2.47 5.5-5.5 5.5H6z" className="text-gray-500" />
          </svg>
        );
      case 'RAINY':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" className="text-blue-400" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 19v2m4-2v2m4-2v2" className="text-blue-500" />
          </svg>
        );
      case 'SNOWY':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" className="text-blue-200" />
          </svg>
        );
      case 'THUNDERSTORM':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" className="text-gray-600" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10l-3 6h4l-3 6" className="text-yellow-500" />
          </svg>
        );
      case 'FOGGY':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15h18M3 11h18M3 19h18" className="text-gray-400" />
          </svg>
        );
      default:
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        );
    }
  };

  return getIcon();
};
