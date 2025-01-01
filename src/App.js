import logo from './logo.svg';
import './App.css';
import Home from './User/views/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeTemplate from './User/Layout/HomeTemplate';
import Login from './User/views/Login';
import Register from './User/views/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterNext from './User/views/RegisterNext';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<HomeTemplate></HomeTemplate>}>

        <Route index element={<Home></Home>}></Route>
        <Route path='login' element={<Login></Login>}></Route>
        <Route path='register' element={<Register></Register>}></Route>
        <Route path='registerNext' element={<RegisterNext></RegisterNext>}></Route>

        </Route>

      </Routes>
      <ToastContainer autoClose={2500} pauseOnHover={false} />
    </BrowserRouter>
   
  );
}

export default App;
