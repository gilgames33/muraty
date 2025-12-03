import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-6 text-lg font-medium text-slate-700">Seyahat planınız hazırlanıyor...</p>
      <p className="mt-2 text-sm text-slate-500">Bu birkaç saniye sürebilir</p>
    </div>
  );
};
