import React, { useState } from 'react';

const ExpenseFilters = ({ categories, onFilter }) => {
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilter = () => {
    onFilter({
      category,
      paymentMethod,
      startDate,
      endDate,
      searchTerm,
    });
  };

  return (
    <div className="mb-4 p-6 bg-[#3c3d37] text-[#ecdfcc] rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Filters</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded px-3 py-2 w-full bg-[#ecdfcc] text-[#181c14]"
          >
            <option value="">All</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border rounded px-3 py-2 w-full bg-[#ecdfcc] text-[#181c14]"
          >
            <option value="">All</option>
            <option value="Cash">Cash</option>
            <option value="Credit">Credit</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-3 py-2 w-full bg-[#ecdfcc] text-[#181c14]"
          />
        </div>
        <div>
          <label className="block mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-3 py-2 w-full bg-[#ecdfcc] text-[#181c14]"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="block mb-1">Search Term</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search description..."
          className="border rounded px-3 py-2 w-full bg-[#ecdfcc] text-[#181c14]"
        />
      </div>
      <button
        onClick={handleFilter}
        className="mt-4 px-4 py-2 bg-[#697565] text-white rounded"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default ExpenseFilters;
