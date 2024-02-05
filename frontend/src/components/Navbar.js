import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

import picture1 from "./others.png";

export default function Navbar() {
  const { isAuthenticated,setAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const isAuthResponse = await fetch('/api/isAuth');
            const isAuthData = await isAuthResponse.json();
           setAuthenticated(isAuthData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    fetchUserData();
  }, [setAuthenticated]);

  const loginUser = async (username, password) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const { token } = await response.json();

      // Update authentication status
     setAuthenticated(true);

      // Save token to local storage
      localStorage.setItem('token', token);

      // Redirect to the dashboard or home page
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/logout`, {
        method: 'POST',
      });

     setAuthenticated(false);
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className='sticky z-10 w-full top-0'>
      <div className='flex items-center px-2 py-2 font-bold bg-slate-900 text-white'>
        <button className='name mx-5 text-4xl'>WAKEFUL WORKFORCE</button>
        <button className='flex-grow'></button>
        <Link to="/" className='mx-10 text-1xl font-bold hover:text-cyan-400 transition ease-out duration-500'>HOME</Link>
        <Link to="/aboutus" className='mx-10 text-1xl font-bold hover:text-cyan-400 transition ease-out duration-500'>ABOUT US</Link>
        <Link to="/contactus" className='mx-10 text-1xl font-bold hover:text-cyan-400 transition ease-out duration-500'>CONTACT US</Link>
        {setAuthenticated ? (
          <>
            <button
              onClick={handleLogout}
              className="mx-4 text-1xl hover:bg-cyan-400 hover:text-slate-900 p-1 font-bold border-4 border-cyan-400 rounded-[26px] px-4 py-2 text-1xl transition ease-out duration-300"
            >
              LOGOUT
            </button>
            <Link
              to="/profile"
              className=" h-10 w-auto mr-6 overflow-hidden"
            >
              <img
                src={picture1}
                alt="Profile"
                className="rounded-full w-11 mx-2"
              />
            </Link>
          </>
        ) : (
          <Link
            to="/login"
            className="mx-4 text-1xl hover:bg-cyan-400 hover:text-slate-900 p-1 font-bold border-4 border-cyan-400 rounded-[26px] px-4 py-2 text-1xl transition ease-out duration-300"
          >
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  );
}
