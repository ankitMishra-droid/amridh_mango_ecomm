import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [loginMethod, setLoginMethod] = React.useState<'email' | 'phone'>('email');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [registerPhone, setRegisterPhone] = React.useState('');
  const [role, setRole] = React.useState<'customer' | 'wholesale'>('customer');
  const { login } = useAuth();
  const navigate = useNavigate();

  const validPhone = (num: string) => /^\d{10}$/.test(num);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate login identifier
    if (isLogin) {
      if (loginMethod === 'phone' && !validPhone(phone)) {
        toast.error('Enter a valid 10-digit phone number');
        return;
      }
    } else {
      if (!validPhone(registerPhone)) {
        toast.error('Enter a valid 10-digit phone number');
        return;
      }
    }

    const endpoint = isLogin ? '/api/login' : '/api/register';

    let body: Record<string, string>;
    if (isLogin) {
      body =
        loginMethod === 'email'
          ? { email, password }
          : { phone, password };
    } else {
      body = { email, password, name, role, phone: registerPhone };
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.ok) {
        login(data.token, data.user);
        toast.success(isLogin ? 'Welcome back!' : 'Account created!');
        navigate('/');
      } else {
        toast.error(data.error || 'Something went wrong');
      }
    } catch {
      toast.error('Connection error');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] border border-orange-50 shadow-xl">
        <h1 className="text-3xl font-black text-center mb-8">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ── REGISTER FIELDS ── */}
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <input
                  type="text"
                  required
                  value={registerPhone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setRegisterPhone(value);
                  }}
                  className="w-full px-6 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Account Type</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full px-6 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="customer">Retail Customer</option>
                  <option value="wholesale">Wholesale Partner</option>
                </select>
              </div>
            </>
          )}

          {/* ── LOGIN IDENTIFIER TOGGLE ── */}
          {isLogin && (
            <div>
              <div className="flex rounded-2xl border border-gray-200 overflow-hidden mb-4">
                <button
                  type="button"
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-2.5 text-sm font-bold transition-all ${
                    loginMethod === 'email'
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-gray-500 hover:bg-orange-50'
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 py-2.5 text-sm font-bold transition-all ${
                    loginMethod === 'phone'
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-gray-500 hover:bg-orange-50'
                  }`}
                >
                  Phone
                </button>
              </div>

              {loginMethod === 'email' ? (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setPhone(value);
                    }}
                    placeholder="10-digit mobile number"
                    className="w-full px-6 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              )}
            </div>
          )}

          {/* ── REGISTER: EMAIL ── */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
          )}

          {/* ── PASSWORD ── */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-200"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setLoginMethod('email');
            }}
            className="text-orange-600 font-bold hover:underline"
          >
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}