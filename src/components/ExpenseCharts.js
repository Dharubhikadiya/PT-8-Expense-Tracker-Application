import React, { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, ArcElement, CategoryScale);

const ExpenseCharts = () => {
  const [expenses, setExpenses] = useState([]);
  const monthlyData = {};

  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const month = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    monthlyData[month] = (monthlyData[month] || 0) + expense.amount;
  });

  const labels = Object.keys(monthlyData);
  const lineData = {
    labels: labels,
    datasets: [
      {
        label: 'Monthly Expenses',
        data: Object.values(monthlyData),
        borderColor: '#ECDFCC',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        tension: 0.1,
        borderWidth: 2,
      },
    ],
  };

  const categoryData = {};
  expenses.forEach(expense => {
    categoryData[expense.category] = (categoryData[expense.category] || 0) + expense.amount;
  });

  const pieData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#ecdfcc'
        },
        grid: {
          color: '#41493D'
        }
      },
      x: {
        ticks: {
          color: '#ecdfcc'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#ecdfcc'
        }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ecdfcc'
        }
      }
    }
  };

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(storedExpenses);
  }, []);

  return (
    <div className="flex w-full gap-0">
      <div className="chart-container text-center w-full">
        <h2 className="text-lg font-semibold mb-4 text-[#ecdfcc]">Monthly Expenses</h2>
        <div className="mx-auto" style={{ height: '400px', width: '100%', maxWidth: '1000px' }}>
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>
      <div className="chart-container text-center w-full">
        <h2 className="text-lg font-semibold mb-4 text-[#ecdfcc]">Expense Breakdown by Category</h2>
        <div className="mx-auto" style={{ height: '400px', width: '80%', maxWidth: '600px' }}>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseCharts;
