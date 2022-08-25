import { Route, Routes } from 'react-router-dom';
import Header from './parts/Header'
import Home from './pages/Home';
import Login  from './pages/Login'
import SignUp from './pages/Signup'
import PublicationForms from './pages/publication_forms'
import Publication from './pages/publication'
import NoMatch from './pages/NoMatch'
import { RequiredAuth } from './parts/RequiredAuth';
import {AuthProvider} from '../contexts/Auth'

function App() {
  return (
    <AuthProvider>
      <Header/>
      <Routes>
        
        <Route path='/' element={<RequiredAuth><Home /></RequiredAuth>} />
        <Route path='/new-publication' element={<RequiredAuth><PublicationForms /></RequiredAuth>} />
        <Route path='/modify-publication/:id' element={<RequiredAuth><PublicationForms /></RequiredAuth>} />
        <Route path='/publication/:id' element={<RequiredAuth><Publication /></RequiredAuth>} />
        
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
