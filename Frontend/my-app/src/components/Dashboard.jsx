import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { name: 'Upload', path: '/upload' },
  { name: 'AI Insights', path: '/ai' },
  { name: 'Users', path: '/users' },
  { name: 'Charts', path: '/charts' },
  { name: 'Logout', path: '/' },
];

function Dashboard({ children }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-blue-800 text-white p-5 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        {tabs.map(tab => (
          <Link
            key={tab.name}
            to={tab.path}
            className={`block px-4 py-2 rounded hover:bg-blue-600 transition-all ${
              location.pathname === tab.path ? 'bg-blue-600' : ''
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}

export default Dashboard;