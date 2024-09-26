import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseFilters from './components/ExpenseFilters';
import ExpenseCharts from './components/ExpenseCharts';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [previousCategories, setPreviousCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
    setFilteredExpenses([...expenses, newExpense]);

    if (!categories.includes(newExpense.category)) {
      setCategories([...categories, newExpense.category]);
    }
    if (!previousCategories.includes(newExpense.category)) {
      setPreviousCategories([...previousCategories, newExpense.category]);
    }
  };

  const updateExpense = (index, updatedExpense) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index] = updatedExpense;
    setExpenses(updatedExpenses);
    setFilteredExpenses(updatedExpenses);
  };

  const applyFilters = ({ category, paymentMethod, startDate, endDate, searchTerm }) => {
    let filtered = [...expenses];

    if (category) {
      filtered = filtered.filter(expense => expense.category === category);
    }

    if (paymentMethod) {
      filtered = filtered.filter(expense => expense.paymentMethod === paymentMethod);
    }

    if (startDate) {
      filtered = filtered.filter(expense => new Date(expense.date) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter(expense => new Date(expense.date) <= new Date(endDate));
    }

    if (searchTerm) {
      filtered = filtered.filter(expense =>
        expense.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredExpenses(filtered);
  };

  return (
    <Router>
      <div className="bg-[#181c14] min-h-screen text-[#ecdfcc]">
        <nav className="bg-[#3c3d37] text-[#ecdfcc] p-5 flex justify-between items-center">
          <div className="text-lg font-bold">
            <Link to="/" className="hover:text-[#697565] text-xl">Expense Tracker</Link>
          </div>
          <div className="space-x-4">
            <Link to="/add-expense" className="hover:text-[#697565]">Add Expense</Link>
            <Link to="/expenses" className="hover:text-[#697565]">View Expenses</Link>
          </div>
        </nav>

        <div className="container mx-auto mt-10 px-4">
          <h1 className="text-3xl font-bold mb-5 text-center text-[#ecdfcc]">Expense Tracker</h1>

          <Routes>
            <Route path="/" element={<div className="text-center text-lg">Hey there! Welcome to Expense Tracker!</div>} />
            <Route path="/add-expense" element={<ExpenseForm addExpense={addExpense} previousCategories={previousCategories}  />} />
            <Route path="/expenses" element={
              <>
                <ExpenseFilters categories={categories} onFilter={applyFilters} />
                <ExpenseCharts expenses={filteredExpenses.length > 0 ? filteredExpenses : expenses} />
                <ExpenseList expenses={filteredExpenses.length > 0 ? filteredExpenses : expenses} updateExpense={updateExpense} />
              </>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
