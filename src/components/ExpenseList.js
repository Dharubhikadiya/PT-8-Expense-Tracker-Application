import React, { useEffect, useState } from 'react';

const ExpenseList = ({ updateExpense }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const expensesPerPage = 5;
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editExpense, setEditExpense] = useState({});
  const [expenses, setExpenses] = useState([]);

  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);

  const totalPages = Math.ceil(expenses.length / expensesPerPage);

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const handleEditClick = (index, expense) => {
    setEditingIndex(index);
    setEditExpense(expense);
  };

  const handleSaveClick = () => {
    const updatedExpenses = [...expenses];
    updatedExpenses[editingIndex] = editExpense;
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    setEditingIndex(null);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(storedExpenses);
  }, []);

  return (
    <div className="p-6 bg-[#181c14] text-[#ecdfcc] rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-[#ecdfcc]">Expense List</h2>
      {currentExpenses.length > 0 ? (
        <table className="min-w-full bg-[#181c14] border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left text-[#ecdfcc] cursor-pointer" onClick={() => handleSort('amount')}>
                Amount {sortField === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="py-3 px-4 border-b text-left text-[#ecdfcc] cursor-pointer" onClick={() => handleSort('description')}>
                Description
              </th>
              <th className="py-3 px-4 border-b text-left text-[#ecdfcc] cursor-pointer" onClick={() => handleSort('date')}>
                Date {sortField === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="py-3 px-4 border-b text-left text-[#ecdfcc] cursor-pointer" onClick={() => handleSort('category')}>
                Category {sortField === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="py-3 px-4 border-b text-left text-[#ecdfcc]">Payment Method</th>
              <th className="py-3 px-4 border-b text-left text-[#ecdfcc]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentExpenses.map((expense, index) => (
              <tr key={index} className="hover:bg-[#3c3d37] transition">
                {editingIndex === index ? (
                  <>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="text"
                        value={editExpense.amount}
                        onChange={(e) => setEditExpense({ ...editExpense, amount: e.target.value })}
                        className="border rounded px-2 py-1 w-full bg-[#ecdfcc] text-[#181c14]"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="text"
                        value={editExpense.description}
                        onChange={(e) => setEditExpense({ ...editExpense, description: e.target.value })}
                        className="border rounded px-2 py-1 w-full bg-[#ecdfcc] text-[#181c14]"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="date"
                        value={editExpense.date}
                        onChange={(e) => setEditExpense({ ...editExpense, date: e.target.value })}
                        className="border rounded px-2 py-1 w-full bg-[#ecdfcc] text-[#181c14]"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="text"
                        value={editExpense.category}
                        onChange={(e) => setEditExpense({ ...editExpense, category: e.target.value })}
                        className="border rounded px-2 py-1 w-full bg-[#ecdfcc] text-[#181c14]"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">{editExpense.paymentMethod}</td>
                    <td className="py-2 px-4 border-b">
                      <button onClick={handleSaveClick} className="bg-[#ecdfcc] text-black px-4 py-2 rounded">Save</button>
                      <button onClick={() => setEditingIndex(null)} className="bg-red-800 text-white px-4 py-2 rounded ml-2">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-4 border-b text-[#ecdfcc]">{expense.amount}</td>
                    <td className="py-2 px-4 border-b text-[#ecdfcc]">{expense.description}</td>
                    <td className="py-2 px-4 border-b text-[#ecdfcc]">{new Date(expense.date).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b text-[#ecdfcc]">{expense.category}</td>
                    <td className="py-2 px-4 border-b text-[#ecdfcc]">{expense.paymentMethod}</td>
                    <td className="py-2 px-4 border-b">
                      <button onClick={() => handleEditClick(index, expense)} className="bg-[#697565] text-white px-4 py-2 rounded">Edit</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-400">No expenses found.</p>
      )}

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-[#697565] text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-[#ecdfcc]">Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-[#697565] text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExpenseList;
