import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn.js';
import SignUp from './components/SignUp/SignUp.js';
import Account from './components/Account/Account.js';
import './App.css';
import { AuthContextProvider } from './contexts/Auth.js';
import { ThemeContextProvider } from './contexts/Theme.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import PasswordReset from './components/PasswordReset/PasswordReset.js';
import Nav from './components/Nav/Nav.js';
import Header from './components/Header/Header.js';
import Contact from './components/Contact/Contact.js';
import CardSetManager from './components/CardSetManager/CardSetManager.js';
import FAQ from './components/FAQ/FAQ.js';
import Home from './components/Home/Home.js';
import GitHub from './components/GitHub/GitHub.js';

function App() {

  return (
    <AuthContextProvider>
    <ThemeContextProvider>
    <div className='App'>
      <Header />

      <main>
        
          <Nav />
          <Routes>
            <Route path='/' element={
              <ProtectedRoute>
                <CardSetManager />
              </ProtectedRoute>
            } />
            <Route path='/account' element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            } />
            <Route path='/cardsets' element={
              <ProtectedRoute>
                <CardSetManager />
              </ProtectedRoute>
            } />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/reset' element={<PasswordReset />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/' element={<GitHub />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/*' element={<Navigate to="/" replace={true} />} />
          </Routes>
        
      </main>
      <footer></footer>
    </div>
    </ThemeContextProvider>
    </AuthContextProvider>
  );
}

export default App;

//12:13