import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/user/admin-dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setMessage(res.data.message))
    .catch(() => setMessage('Access Denied'));
  }, [token]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-2">Admin Panel</h2>
      <p>{message}</p>
    </div>
  );
}
