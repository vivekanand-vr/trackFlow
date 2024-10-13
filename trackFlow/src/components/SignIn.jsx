import React, { useState, useContext } from 'react';
import { UserContext } from '../context/userContext';
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import {
  doSignInWithEmailAndPassword,
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
} from '../authentication/authMethods';

const SignIn = ({ isOpen, toggleModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await doSignInWithEmailAndPassword(email, password);
      loginUser(userCredential.user);
      localStorage.setItem('userEmail', userCredential.user.email); // Save email in localStorage
      toggleModal(); // Close modal on successful login
    } catch (err) {
      console.error(err.message);
      setError('Login failed, try again or Sign Up!');
    }
  };

  const handleSignUp = async () => {
    setError('');

    try {
      await doCreateUserWithEmailAndPassword(email, password);
      alert('Sign-up successful! Now Login with your credentials.');
    } catch (err) {
      console.error(err.message);
      setError('Sign-up failed, try again later.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await doSignInWithGoogle();
      loginUser(userCredential.user);
      localStorage.setItem('userEmail', userCredential.user.email); // Save email in localStorage
      toggleModal();
    } catch (err) {
      console.error(err.message);
      setError('Google Sign-in failed, try again later.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative font-poppins bg-white rounded-lg shadow-lg p-6 w-[440px]">
        <button
          className="absolute right-4 top-4 hover:text-gray-600"
          onClick={toggleModal}
        >
          <IoCloseCircleOutline size={22} />
        </button>
        <h2 className="text-3xl text-center">Sign In</h2>

        {error && (
          <p className="text-red-500 text-center mt-2">{error}</p>
        )}

        <form onSubmit={handleLogin} className="mt-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-400 rounded mt-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-400 rounded mt-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex justify-between gap-4 mt-8">
            <button
              type="submit"
              className="w-1/2 bg-blue-700 text-white py-2 rounded hover:bg-gray-600"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleSignUp}
              className="w-1/2 bg-emerald-700 text-white py-2 rounded hover:bg-gray-600"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <span className="text-gray-700 mr-2">Or Sign In with</span>
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center border border-gray-600 rounded p-2 hover:bg-[#FF7518] hover:text-white"
          >
            <FaGoogle className="mr-2" />
            <span className='font-semibold'>Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
