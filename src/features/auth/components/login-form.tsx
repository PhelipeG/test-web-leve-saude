import { useState } from 'react';

import { useLogin } from '../hooks/useLogin';

export function LoginForm() {
  const { login, loading, error } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md max-w-md w-full">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="border rounded p-2 mb-4 w-full"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="border rounded p-2 mb-4 w-full"
      />
      <button type="submit" disabled={loading} className="bg-blue-500 w-full text-white p-2 rounded">
        {loading ? 'Loading...' : 'Login'}
      </button>
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </form>
  );
}
