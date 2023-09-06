import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home';
import Navbar from './Component/Navbar';
import Feed from './Component/Feed';
import Post from './Component/Post';
import Comment from './Component/Comment';
import UserProfile from './Component/UserProfile';
import Register from './Pages/Register';
import Login from './Pages/Login';



const MyRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/navbar" element={<Navbar/>} />
    <Route path="/feed" element={<Feed/>} />
    <Route path="/post" element={<Post/>} />
    <Route path="/comment" element={<Comment/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/userprofile" element={<UserProfile/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/login" element={<Login/>} />







    </Routes>

    </BrowserRouter>
  )
}

export default MyRoutes