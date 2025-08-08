import React from 'react';
import { Card, CardContent } from '../ui/card';

const StatsCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-50 border-blue-200',
    yellow: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    green: 'text-green-600 bg-green-50 border-green-200',
    red: 'text-red-600 bg-red-50 border-red-200',
    indigo: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    purple: 'text-purple-600 bg-purple-50 border-purple-200',
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer py-0">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
          <div className={`p-3 rounded-full border ${colorClasses[color]}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;