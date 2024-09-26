import React, { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseFilters from './ExpenseFilters';
import ExpenseList from './ExpenseList';
import ExpenseCharts from './ExpenseCharts';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [previousCategories, setPreviousCategories] = useState(['Food', 'Transport', 'Entertainment']); 
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(storedExpenses);
    setFilteredExpenses(storedExpenses); 
  }, []);

  const addExpense = (expense) => {
    const newExpenses = [...expenses, expense];
    setExpenses(newExpenses);
    setFilteredExpenses(newExpenses); 
    if (!previousCategories.includes(expense.category)) {
      setPreviousCategories([...previousCategories, expense.category]);
    }

    localStorage.setItem('expenses', JSON.stringify(newExpenses));
  };

  const updateExpense = (index, updatedExpense) => {
    const updatedExpenses = expenses.map((expense, i) => (i === index ? updatedExpense : expense));
    setExpenses(updatedExpenses);
    setFilteredExpenses(updatedExpenses); 
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const handleFilter = (filterCriteria) => {
    const filtered = expenses.filter((expense) => {
      const matchesCategory = filterCriteria.category ? expense.category === filterCriteria.category : true;
      const matchesDate = filterCriteria.date ? new Date(expense.date).toLocaleDateString() === new Date(filterCriteria.date).toLocaleDateString() : true;
      return matchesCategory && matchesDate;
    });
    setFilteredExpenses(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <ExpenseForm addExpense={addExpense} previousCategories={previousCategories} />
      <ExpenseFilters categories={previousCategories} onFilter={handleFilter} />
      <ExpenseCharts expenses={filteredExpenses} />
      <ExpenseList expenses={filteredExpenses} updateExpense={updateExpense} />
    </div>
  );
};

export default ExpenseTracker;
