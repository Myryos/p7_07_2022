import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,
Routes,
Route } from 'react-router-dom';
import './styles/css/index.css';
import App from './components/App';
import Accueil from './components/routes/Home'
import LogIn from './components/routes/LogIn'
import SignUp from './components/routes/SignUp'
import Forms from './components/routes/Forms-Publication'
import Publication from './components/routes/Publication'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<LogIn />} />
      <Route path="/home" element={<Accueil/>} />
      <Route path="/publication" element={<Publication />} />
      <Route path="/forms-publication" element={<Forms />}/> 
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
