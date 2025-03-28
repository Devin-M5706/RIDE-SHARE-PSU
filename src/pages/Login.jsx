import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('passenger');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email && password) {
      localStorage.setItem('token', 'mock-token');
      navigate(role === 'driver' ? '/driver' : '/passenger');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <input type="email" placeholder="Email" className="border px-3 py-2 rounded w-64" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="border px-3 py-2 rounded w-64" onChange={(e) => setPassword(e.target.value)} />
      <select className="border px-3 py-2 rounded w-64" onChange={(e) => setRole(e.target.value)}>
        <option value="passenger">Passenger</option>
        <option value="driver">Driver</option>
      </select>
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">Log In</button>
    </div>
  );
}
