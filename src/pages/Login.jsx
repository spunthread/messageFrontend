import React, { useContext, useState } from 'react';
import { loginUser } from '../utils/Auth';  // Import the API service
import { GlobalContext } from '../GlobalContext';

const Login = () => {
  const {dispatch}=useContext(GlobalContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const credentials = {
      email,
      password,
    };
   dispatch({type:"LOGIN",payload:true})

    try {
      const response = await loginUser(credentials);
      // Handle successful login here, e.g., store user data and redirect
      console.log('Login successful', response);
      setLoading(false);
      // Example: redirect to boards page
      // window.location.href = '/boards';
    } catch (err) {
      setLoading(false);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
         
      
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

