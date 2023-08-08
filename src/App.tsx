import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import FavouriteItems from './Components/Body/FavouriteItems';
import Items from './Components/Body/Items';
import Footer from './Components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Body/Home';
import Profile from './Components/Profile/Profile';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import { collection, addDoc } from 'firebase/firestore';
import { database } from './firebase';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState({ email: '', password: '' });
  const collectionRef = collection(database, 'user');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addDoc(collectionRef, {
      email: data.email,
      password: data.password,
    })
      .then(() => {
        console.log('Data added:', data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      {/* Pass isLoggedIn and handleLogout to the Header component */}
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page1" element={<Items/>} />
        <Route path="/page2" element={<FavouriteItems />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} handleLogin={handleLogin} />} />
        <Route path="/register" element={<Register isLoggedIn={isLoggedIn} handleLogin={handleLogin} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
