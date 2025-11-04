import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes, Route, Navigate } from "react-router-dom"
import { AuthStore } from './store/AuthStore.js'
import { selectTheme } from './store/Themestore.js';
import { Loader } from "lucide-react";
import {Toaster} from "react-hot-toast";

import Homepage from "./pages/Homepage.jsx"
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from "./pages/ProfilePage.jsx"
import SignupPage from "./pages/SignupPage.jsx"

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, online_users } = AuthStore();
  const {theme} = selectTheme();
  useEffect(() => {
    checkAuth();
  }, []);
  console.log({authUser});
  console.log(online_users);

  if (!authUser && isCheckingAuth) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }


  return (
    <div data-theme = {theme}>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <Homepage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}
export default App