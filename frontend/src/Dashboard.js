import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate jika Anda menggunakan react-router

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // Inisialisasi dengan array kosong
  const [error, setError] = useState('');
  const [name, setName] = useState(''); // State untuk nama pengguna baru
  const [age, setAge] = useState(''); // State untuk umur pengguna baru

  useEffect(() => {
    // Cek otentikasi
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login'); // Alihkan ke halaman login jika tidak terautentikasi
    }

    let isMounted = true; // Menandakan apakah komponen masih terpasang
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost/myapp/backend/get_users.php');
        // Cek apakah respons adalah array
        if (Array.isArray(response.data) && isMounted) {
          setUsers(response.data);
        } else {
          throw new Error('Data tidak dalam format yang benar');
        }
      } catch (err) {
        console.error('There was an error fetching users!', err);
        if (isMounted) {
          setError('Failed to load users. Please try again.');
        }
      }
    };

    fetchUsers();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, [navigate]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!name || !age) {
      setError('Both fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost/myapp/backend/add_user.php', {
        name,
        age,
      });
      if (response.data.status === 'success') {
        // Tambahkan pengguna baru ke state tanpa memanggil ulang fetchUsers
        setUsers([...users, { name, age }]);
        setName(''); // Reset input name
        setAge(''); // Reset input age
        setError(''); // Reset error
      } else {
        setError('Failed to add user.');
      }
    } catch (err) {
      console.error('There was an error adding the user!', err);
      setError('Failed to add user. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Age</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulir untuk menambah pengguna */}
      <form onSubmit={handleAddUser} className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block text-gray-700">Age</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
