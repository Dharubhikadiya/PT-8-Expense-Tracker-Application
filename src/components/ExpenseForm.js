import React, { useState, useEffect } from 'react';

const ExpenseForm = ({ addExpense, previousCategories }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [errors, setErrors] = useState({});
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(storedExpenses);
  }, []);

  const getSuggestions = (input) => {
    return previousCategories.filter((cat) =>
      cat.toLowerCase().startsWith(input.toLowerCase())
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorMessages = {};

    if (!amount || isNaN(amount)) {
      errorMessages.amount = 'Please enter a valid number';
    }
    if (!description) {
      errorMessages.description = 'Description is required';
    }
    if (!date) {
      errorMessages.date = 'Date is required';
    }

    if (Object.keys(errorMessages).length === 0) {
      const newExpense = { amount, description, date, category, paymentMethod };
      const updatedExpenses = [...expenses, newExpense];
      addExpense(newExpense);
      setExpenses(updatedExpenses);
      saveToLocalStorage(newExpense);

      setAmount('');
      setDescription('');
      setDate('');
      setCategory('');
      setPaymentMethod('cash');
    } else {
      setErrors(errorMessages);
    }
  };

  const saveToLocalStorage = (expense) => {
    const existingExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    existingExpenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(existingExpenses));
  };

  return (
    <form
      className="bg-[#181c14] shadow-lg rounded-xl p-8 mb-4 max-w-lg mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl text-[#ecdfcc] font-semibold text-center mb-6">Add New Expense</h2>

      <div className="mb-4">
        <label className="block text-[#ecdfcc] text-sm font-bold mb-2">Amount</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="shadow appearance-none border border-[#697565] rounded-md w-full py-3 px-4 bg-[#3c3d37] text-[#ecdfcc] focus:outline-none focus:border-[#ecdfcc] transition duration-300"
          placeholder="Enter amount"
        />
        {errors.amount && (
          <p className="text-red-400 text-xs italic mt-1">{errors.amount}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-[#ecdfcc] text-sm font-bold mb-2">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border border-[#697565] rounded-md w-full py-3 px-4 bg-[#3c3d37] text-[#ecdfcc] focus:outline-none focus:border-[#ecdfcc] transition duration-300"
          placeholder="Enter description"
        />
        {errors.description && (
          <p className="text-red-400 text-xs italic mt-1">{errors.description}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-[#ecdfcc] text-sm font-bold mb-2">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="shadow appearance-none border border-[#697565] rounded-md w-full py-3 px-4 bg-[#3c3d37] text-[#ecdfcc] focus:outline-none focus:border-[#ecdfcc] transition duration-300"
        />
        {errors.date && (
          <p className="text-red-400 text-xs italic mt-1">{errors.date}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-[#ecdfcc] text-sm font-bold mb-2">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          list="category-suggestions"
          className="shadow appearance-none border border-[#697565] rounded-md w-full py-3 px-4 bg-[#3c3d37] text-[#ecdfcc] focus:outline-none focus:border-[#ecdfcc] transition duration-300"
          placeholder="Enter category"
        />
        <datalist id="category-suggestions">
          {getSuggestions(category).map((cat, idx) => (
            <option key={idx} value={cat} />
          ))}
        </datalist>
      </div>

      <div className="mb-6">
        <label className="block text-[#ecdfcc] text-sm font-bold mb-2">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="shadow appearance-none border border-[#697565] rounded-md w-full py-3 px-4 bg-[#3c3d37] text-[#ecdfcc] focus:outline-none focus:border-[#ecdfcc] transition duration-300"
        >
          <option value="cash">Cash</option>
          <option value="credit">Credit</option>
        </select>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-[#697565] hover:bg-[#ecdfcc] text-[#3c3d37] font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-300"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
