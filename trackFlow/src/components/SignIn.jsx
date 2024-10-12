import React, { useState, useContext } from 'react';
import { UserContext } from '../context/userContext';
import { IoCloseCircleOutline } from "react-icons/io5";
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
      alert('Login successful!');
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
      alert('Login with Google successful!');
      toggleModal();
    } catch (err) {
      console.error(err.message);
      setError('Google Sign-in failed, try again later.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <button
          className="absolute right-4 top-4 hover:text-gray-600"
          onClick={toggleModal}
        >
          <IoCloseCircleOutline  size={22}/>
        </button>
        <h2 className="text-2xl font-semibold text-center">Sign In</h2>

        {error && (
          <p className="text-red-500 text-center mt-2">{error}</p>
        )}

        <form onSubmit={handleLogin} className="mt-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded mt-4"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleSignUp}
          className="w-full bg-green-600 text-white py-2 rounded mt-4"
        >
          Sign Up
        </button>

        <button
          onClick={handleGoogleSignIn}
          className="w-full border border-gray-300 text-gray-700 py-2 rounded mt-4"
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
