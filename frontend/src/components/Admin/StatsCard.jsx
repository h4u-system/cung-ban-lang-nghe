// frontend/src/components/Admin/StatsCard.jsx

import React from 'react';

const StatsCard = ({ title, value, icon, color, change }) => {
  const isPositive = change && change.startsWith('+');
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-3xl shadow-lg`}>
          {icon}
        </div>
        {change && (
          <span className={`text-sm font-semibold px-2 py-1 rounded-lg ${
            isPositive 
              ? 'text-green-600 bg-green-50' 
              : 'text-red-600 bg-red-50'
          }`}>
            {change}
          </span>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-800">
        {typeof value === 'number' ? value.toLocaleString('vi-VN') : value}
      </p>
    </div>
  );
};

export default StatsCard;