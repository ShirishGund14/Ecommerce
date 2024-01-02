import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import AdminLogin from './AdminPages/AdminLogin';

function App() {
  return (
    < >
    <BrowserRouter>
    <Routes>
       <Route exact path='/adminlogin' element={<AdminLogin/>} />
    </Routes>
    </BrowserRouter>
         
    </>
  );
}

export default App;
