import React, { useState } from 'react';
import type { ExpenseItem, ExpenseCategory } from '../types';

interface ExpenseTrackerProps {
  expenses: ExpenseItem[];
  onAddExpense: (expense: Omit<ExpenseItem, 'id'>) => void;
  onDeleteExpense: (id: string) => void;
  onBack: () => void;
}

export const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({
  expenses,
  onAddExpense,
  onDeleteExpense,
  onBack,
}) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState<ExpenseCategory>('Diğer');

  const categories: ExpenseCategory[] = ['Konaklama', 'Yemek', 'Ulaşım', 'Eğlence', 'Alışveriş', 'Diğer'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) {
      alert('Lütfen tüm alanları doldurun');
      return;
    }
    onAddExpense({
      description,
      amount: parseFloat(amount),
      type,
      category: type === 'expense' ? category : undefined,
    });
    setDescription('');
    setAmount('');
  };

  const totalIncome = expenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const totalExpense = expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="mb-6 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
      >
        Plana Dön
      </button>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-100 rounded-xl p-6 shadow-lg">
          <h3 className="text-sm font-medium text-green-800 mb-2">Toplam Gelir</h3>
          <p className="text-3xl font-bold text-green-900">{totalIncome.toFixed(2)} ₺</p>
        </div>
        <div className="bg-red-100 rounded-xl p-6 shadow-lg">
          <h3 className="text-sm font-medium text-red-800 mb-2">Toplam Gider</h3>
          <p className="text-3xl font-bold text-red-900">{totalExpense.toFixed(2)} ₺</p>
        </div>
        <div className={`rounded-xl p-6 shadow-lg ${balance >= 0 ? 'bg-blue-100' : 'bg-orange-100'}`}>
          <h3 className={`text-sm font-medium mb-2 ${balance >= 0 ? 'text-blue-800' : 'text-orange-800'}`}>Kalan Bakiye</h3>
          <p className={`text-3xl font-bold ${balance >= 0 ? 'text-blue-900' : 'text-orange-900'}`}>{balance.toFixed(2)} ₺</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Yeni İşlem Ekle</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Açıklama</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Örn: Otel rezervasyonu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tutar (₺)</label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">İşlem Tipi</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as 'income' | 'expense')}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="expense">Gider</option>
                <option value="income">Gelir</option>
              </select>
            </div>
            {type === 'expense' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Kategori</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            İşlem Ekle
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">İşlem Geçmişi</h3>
        {expenses.length === 0 ? (
          <p className="text-center text-slate-500 py-8">Henüz işlem kaydı bulunmuyor</p>
        ) : (
          <div className="space-y-3">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{expense.description}</p>
                  {expense.category && (
                    <p className="text-sm text-slate-600">{expense.category}</p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-lg font-bold ${expense.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {expense.type === 'income' ? '+' : '-'}{expense.amount.toFixed(2)} ₺
                  </span>
                  <button
                    onClick={() => onDeleteExpense(expense.id)}
                    className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-sm rounded transition-colors"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
