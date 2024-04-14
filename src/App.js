import React, { useEffect, useState } from 'react';
import './App.css';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Hero from './components/Hero/Hero';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginSponsor from './components/Login/LoginSponsor';
import LoginStudent from './components/Login/LoginStudent';
import RegisterSponsor from './components/Register/RegisterSponsor';
import RegisterStudent from './components/Register/RegisterStudent';
import { get_sponsor_details, get_student_details } from './api';
import StudentHome from './components/Student/StudentHome';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    handleAuth();
  }, []);

  const handleAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const accountType = localStorage.getItem('accountType');
    const res =
      accountType === 'student'
        ? await get_student_details(token)
        : await get_sponsor_details(token);
    if (res.error) {
      console.log(res.error);
      return;
    }
    setUser(res);
  };

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero user={user} />} />
          <Route
            path="/login-sponsor"
            element={<LoginSponsor handleAuth={handleAuth} user={user} />}
          />
          <Route
            path="/signup-sponsor"
            element={<RegisterSponsor handleAuth={handleAuth} user={user} />}
          />
          <Route
            path="/login-student"
            element={<LoginStudent handleAuth={handleAuth} user={user} />}
          />
          <Route
            path="/signup-student"
            element={<RegisterStudent handleAuth={handleAuth} user={user} />}
          />
          <Route path="/student" element={<StudentHome user={user} />} />
          <Route path="/sponsor" element={<div>Sponsor</div>} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
