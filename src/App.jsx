import React, { useContext,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import PetInfo from './pages/PetInfo';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { userContext } from './context/UserContextProvider';
import Reqeusts from './pages/Requests';
import Applicant from './pages/Applicant';
import Chat from './pages/Chat';
import DonateUs from './pages/DonateUs';
import { MainLayout } from './layout/MainLayout';

function App() {
  const { User, setUser } = useContext(userContext);
console.log("envsss ",import.meta.env.VITE_REACT_APP_SERVER_URL);
  const PublicRoute = ({ element }) => {
    return User ? <Navigate to="/" /> : element;
  };

  const PrivateRoute = ({ element }) => {
    return User ? element : <Navigate to="/login" />;
    // return element
  };


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/register" element={<PublicRoute element={<Registration />} />} />

        <Route path="/" element={<MainLayout/>}>
        <Route index element={<PrivateRoute element={<Home />} />} />
        <Route path="/pet/:id" element={<PrivateRoute element={<PetInfo />} />} />
        <Route path="/profile/:id" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/request/:id" element={<PrivateRoute element={<Reqeusts />} />} />
        <Route path="/applicant/:id" element={<PrivateRoute element={<Applicant />} />} />
        <Route path="/donate" element={<PrivateRoute element={<DonateUs/>} />} />
        </Route>
        <Route path="/chat/:id" element={<PrivateRoute element={<Chat/>} />} />
      </Routes>




      


    </Router>
  );
}

export default App;
