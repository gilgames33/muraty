import React from 'react';
import type { TravelPlan } from '../types';
import { WeatherIcon } from './WeatherIcon';

interface ResultsDisplayProps {
  plan: TravelPlan;
  onReset: () => void;
  onShowExpenses: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ plan, onReset, onShowExpenses }) => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex gap-3">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
        >
          Yeni Plan Oluştur
        </button>
        <button
          onClick={onShowExpenses}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Harcama Takibi
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="relative h-96">
          <img
            src={plan.tripImageUrl}
            alt={plan.cityName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h2 className="text-4xl font-bold mb-2">{plan.cityName}, {plan.countryName}</h2>
            <p className="text-xl text-slate-200">{plan.travelDates}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Yerel Lezzetler</h3>
          <div className="space-y-4">
            {plan.localCuisine.map((cuisine, index) => (
              <div key={index} className="flex gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <img
                  src={cuisine.imageUrl}
                  alt={cuisine.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold text-slate-800">{cuisine.name}</h4>
                  <p className="text-sm text-slate-600">{cuisine.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Hava Durumu Tahmini</h3>
          <div className="space-y-3">
            {plan.weatherForecast.map((forecast, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <WeatherIcon type={forecast.icon} className="w-10 h-10" />
                  <div>
                    <p className="font-medium text-slate-800">{forecast.dayOfWeek}</p>
                    <p className="text-sm text-slate-600">{forecast.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-slate-800">{forecast.temperature}</p>
                  <p className="text-sm text-slate-600">{forecast.condition}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Günlük Plan</h3>
        <div className="space-y-8">
          {plan.dailyItinerary.map((day) => (
            <div key={day.day} className="border-l-4 border-blue-500 pl-6">
              <h4 className="text-xl font-bold text-slate-800 mb-4">
                Gün {day.day}: {day.title}
              </h4>
              <div className="space-y-4">
                {day.activities.map((activity, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                          {activity.time}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-slate-800 mb-1">{activity.name}</h5>
                        <p className="text-sm text-slate-600 mb-2">{activity.description}</p>
                        {activity.details && activity.details.length > 0 && (
                          <ul className="text-sm text-slate-600 list-disc list-inside">
                            {activity.details.map((detail, i) => (
                              <li key={i}>{detail}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {plan.importantNotes && plan.importantNotes.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-amber-900 mb-4">Önemli Notlar</h3>
          <ul className="space-y-2">
            {plan.importantNotes.map((note, index) => (
              <li key={index} className="text-amber-900 flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
