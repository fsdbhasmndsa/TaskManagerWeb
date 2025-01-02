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
import Layout from './User/Layout/Layout';
import TopStatistics from './User/views/TopStatistics';
import TableTask from './User/views/TableTask'
import Page404 from './User/views/Page404'
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

        <Route path='Task' element={<Layout></Layout>}>

        
        <Route path='' element={<TableTask></TableTask>}> </Route>
       

        
         





        </Route>
        <Route path='*' element={<Page404></Page404>}> </Route>

      </Routes>
      <ToastContainer autoClose={2500} pauseOnHover={false} />
    </BrowserRouter>

  );
}

export default App;
