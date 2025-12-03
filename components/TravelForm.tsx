import React, { useState } from 'react';
import type { TravelRequest } from '../types';

interface TravelFormProps {
  onPlanRequest: (request: TravelRequest) => void;
  isLoading: boolean;
}

export const TravelForm: React.FC<TravelFormProps> = ({ onPlanRequest, isLoading }) => {
  const [destinations, setDestinations] = useState([{ country: '', city: '' }]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transport, setTransport] = useState('Uçak');

  const addDestination = () => {
    setDestinations([...destinations, { country: '', city: '' }]);
  };

  const removeDestination = (index: number) => {
    if (destinations.length > 1) {
      setDestinations(destinations.filter((_, i) => i !== index));
    }
  };

  const updateDestination = (index: number, field: 'country' | 'city', value: string) => {
    const newDestinations = [...destinations];
    newDestinations[index][field] = value;
    setDestinations(newDestinations);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (destinations.some(d => !d.country || !d.city) || !startDate || !endDate) {
      alert('Lütfen tüm alanları doldurun');
      return;
    }
    onPlanRequest({ destinations, startDate, endDate, transport });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-3">Gitmek İstediğiniz Yerler</label>
        {destinations.map((dest, index) => (
          <div key={index} className="flex gap-3 mb-3">
            <input
              type="text"
              placeholder="Ülke"
              value={dest.country}
              onChange={(e) => updateDestination(index, 'country', e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <input
              type="text"
              placeholder="Şehir"
              value={dest.city}
              onChange={(e) => updateDestination(index, 'city', e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {destinations.length > 1 && (
              <button
                type="button"
                onClick={() => removeDestination(index)}
                className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Sil
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addDestination}
          className="mt-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium"
        >
          + Başka Bir Yer Ekle
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Başlangıç Tarihi</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Bitiş Tarihi</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">Ulaşım Şekli</label>
        <select
          value={transport}
          onChange={(e) => setTransport(e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          <option value="Uçak">Uçak</option>
          <option value="Tren">Tren</option>
          <option value="Otobüs">Otobüs</option>
          <option value="Araba">Araba</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Plan Oluşturuluyor...' : 'Seyahat Planı Oluştur'}
      </button>
    </form>
  );
};
