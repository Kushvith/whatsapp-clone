import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Componets/HomePage';
import Status from './Componets/Status/Status';
import StatusViewer from './Componets/Status/StatusViewer';
import Signin from './Componets/Register/Signin';
import Signup from './Componets/Register/Signup';

function App() {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/status' element={<Status/>}></Route>
        <Route path='/status/:userId' element={<StatusViewer/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
