import React, { useState } from 'react';
import { Header } from './components/Header';
import { TravelForm } from './components/TravelForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ExpenseTracker } from './components/ExpenseTracker';
import { generateTravelPlan } from './services/geminiService';
import type { TravelPlan, TravelRequest, ExpenseItem } from './types';

type View = 'form' | 'results' | 'expenses';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('form');
  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlanRequest = async (request: TravelRequest) => {
    setIsLoading(true);
    setError(null);
    setTravelPlan(null);
    try {
      const plan = await generateTravelPlan(request);
      setTravelPlan(plan);
      setCurrentView('results');
    } catch (err) {
      console.error(err);
      setError('Seyahat planı oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const addExpense = (expense: Omit<ExpenseItem, 'id'>) => {
    setExpenses(prev => [...prev, { ...expense, id: Date.now().toString() }]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  const handleReset = () => {
    setTravelPlan(null);
    setError(null);
    setExpenses([]);
    setCurrentView('form');
  };

  const renderFormView = () => (
    <div className="max-w-4xl mx-auto">
      <section id="planner" className="bg-slate-800 rounded-2xl shadow-lg p-6 md:p-10 mb-12 animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-2">Hayalinizdeki Tatili Planlayın</h2>
        <p className="text-slate-400 mb-8">Varış noktalarınızı, tarihlerinizi ve tercihlerinizi girin, gerisini yapay zekaya bırakın.</p>
        <TravelForm onPlanRequest={handlePlanRequest} isLoading={isLoading} />
      </section>

      {isLoading && <LoadingSpinner />}
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md animate-fade-in" role="alert">
          <p className="font-bold">Hata</p>
          <p>{error}</p>
        </div>
      )}

      {!travelPlan && !isLoading && !error && (
        <div className="text-center py-16 px-6 bg-white rounded-2xl shadow-lg animate-fade-in">
            <div className="mx-auto h-24 w-24 text-indigo-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664l.143.258a1.107 1.107 0 0 0 1.664.57l.143-.048a2.25 2.25 0 0 1 1.161.886l.51.766c.319.48.226 1.121-.216 1.49l-1.068.89a1.125 1.125 0 0 0-.405.864v.568m-6 0v-.568c0-.334-.148-.65-.405-.864l-1.068-.89a1.125 1.125 0 0 1-.216-1.49l.51-.766a2.25 2.25 0 0 0 1.161-.886l.143-.048a1.107 1.107 0 0 1 .57-1.664l-.143-.258a1.107 1.107 0 0 1-1.664-.57l-.143.048a2.25 2.25 0 0 0-1.161-.886l-.51-.766c-.319-.48-.226-1.121.216-1.49l1.068-.89a1.125 1.125 0 0 0 .405.864v-.568" />
                </svg>
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-gray-900">Planınız sizi bekliyor</h3>
            <p className="mt-2 text-md text-gray-500">Başlamak için yukarıdaki formu doldurun.</p>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    if (isLoading) return renderFormView();

    switch (currentView) {
      case 'results':
        return travelPlan ? <ResultsDisplay plan={travelPlan} onReset={handleReset} onShowExpenses={() => setCurrentView('expenses')} /> : renderFormView();
      case 'expenses':
        return <ExpenseTracker expenses={expenses} onAddExpense={addExpense} onDeleteExpense={deleteExpense} onBack={() => setCurrentView('results')} />;
      case 'form':
      default:
        return renderFormView();
    }
  }

  return (
    <div className="bg-slate-100 min-h-screen text-slate-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;