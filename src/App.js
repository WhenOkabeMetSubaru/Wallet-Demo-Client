import logo from './logo.svg';
import './App.css';

// import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserAuth from './features/providers/userAuthProvider';
import Home from './pages/home/Home';
import Login from './pages/authorizationnew/Login';
import PaymentSuccess from './pages/payment/success';
import PaymentFailure from './pages/payment/failure';
// import Login from './pages/authorization/Login';

function App ()
{
  return (
    
      <BrowserRouter>
      <UserAuth>
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/paymentsuccess" element={ <PaymentSuccess /> } />
          <Route path="/paymentfailure" element={ <PaymentFailure/> } />
        </Routes>
        </UserAuth>
      </BrowserRouter>
   
  );
}

export default App;
