
import React, { useState } from 'react';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    date: '',
    description: '',
    amount: '',
    paidBy: 'yo'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newExpense.description || !newExpense.amount || !newExpense.date) return;

    setExpenses(prev => [...prev, {
      ...newExpense,
      id: Date.now(),
      amount: parseFloat(newExpense.amount)
    }]);

    setNewExpense({
      date: '',
      description: '',
      amount: '',
      paidBy: 'yo'
    });
  };

  const calculateTotals = () => {
    let myTotal = 0;
    let motherTotal = 0;

    expenses.forEach(expense => {
      if (expense.paidBy === 'yo') {
        myTotal += expense.amount;
      } else {
        motherTotal += expense.amount;
      }
    });

    const myHalf = myTotal / 2;
    const motherHalf = motherTotal / 2;
    const difference = motherHalf - myHalf;

    return {
      myTotal,
      motherTotal,
      myHalf,
      motherHalf,
      difference
    };
  };

  const totals = calculateTotals();

  return (
    <div style={{ maxWidth: '1024px', margin: '1rem auto', padding: '1rem' }}>
      <div style={{ backgroundColor: '#fff', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Control de Gastos Compartidos</h1>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <input
            type="date"
            name="date"
            value={newExpense.date}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="text"
            name="description"
            placeholder="Descripción"
            value={newExpense.description}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="number"
            name="amount"
            placeholder="Monto"
            value={newExpense.amount}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <select
            name="paidBy"
            value={newExpense.paidBy}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="yo">Yo</option>
            <option value="mama">Mamá</option>
          </select>
          <button
            type="submit"
            style={{ gridColumnStart: '1', gridColumnEnd: '5', padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Agregar Gasto
          </button>
        </form>

        <div style={{ marginBottom: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid #ccc' }}>Fecha</th>
                <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid #ccc' }}>Descripción</th>
                <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid #ccc' }}>Monto</th>
                <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid #ccc' }}>Pagado por</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(expense => (
                <tr key={expense.id}>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{expense.date}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{expense.description}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>${expense.amount.toFixed(2)}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{expense.paidBy === 'yo' ? 'Yo' : 'Mamá'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ backgroundColor: '#fff', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Mis Pagos:</span>
                <span style={{ fontWeight: 'bold' }}>${totals.myTotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Pagos Mamá:</span>
                <span style={{ fontWeight: 'bold' }}>${totals.motherTotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Gastos:</span>
                <span style={{ fontWeight: 'bold' }}>${(totals.myTotal + totals.motherTotal).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#fff', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>50% por persona:</span>
                <span style={{ fontWeight: 'bold' }}>${((totals.myTotal + totals.motherTotal) / 2).toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Balance Final:</span>
                <span style={{ fontWeight: 'bold', color: totals.difference > 0 ? '#4CAF50' : '#FF0000' }}>
                  {totals.difference > 0 ? 'Debo pagar a mama: ' : 'Mama debe pagar: '}
                  ${Math.abs(totals.difference).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;