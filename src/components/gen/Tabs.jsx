// src/components/Tabs.jsx
import React from 'react';

export default function Tabs() {
  return (
    <nav className="mb-6">
      <ul className="flex space-x-4 border-b">
        <li className="pb-2 border-b-2 border-green-600 font-medium cursor-pointer">Dashboard</li>
        <li className="pb-2 text-gray-500 hover:text-gray-700 cursor-pointer">Patients</li>
        <li className="pb-2 text-gray-500 hover:text-gray-700 cursor-pointer">Messages</li>
      </ul>
    </nav>
  );
}
