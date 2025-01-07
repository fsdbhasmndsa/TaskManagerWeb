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
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TableProject from './User/views/TableProject';
import DashBoard from './User/views/DashBoard';
import PersonalPage from './User/views/PersonalPage';
import UnderDevelopmentPage from './User/views/UnderDevelopmentPage';
import ChangePassword from './User/views/ChangePassword';
function App() {
  return (
    <DndProvider backend={HTML5Backend}>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<HomeTemplate></HomeTemplate>}>

          <Route index element={<Home></Home>}></Route>
          <Route path='login' element={<Login></Login>}></Route>
          <Route path='register' element={<Register></Register>}></Route>
          <Route path='registerNext' element={<RegisterNext></RegisterNext>}></Route>
          <Route path='forgotpassword' element={<Register></Register>}></Route>
          <Route path='changepassword' element={<ChangePassword></ChangePassword>}></Route>

        </Route>

        <Route path='Task' element={<Layout></Layout>}>
        <Route path='dashboard' element={<DashBoard></DashBoard>}> </Route>
        <Route path='project' element={<TableProject></TableProject>}> </Route>
        <Route path='project/:id' element={<TableTask></TableTask>}> </Route>
        <Route path='personal' element={<PersonalPage></PersonalPage>}> </Route>
        <Route path='join' element={<UnderDevelopmentPage></UnderDevelopmentPage>}> </Route>
        <Route path='group' element={<UnderDevelopmentPage></UnderDevelopmentPage>}> </Route>
       

        
         





        </Route>
        <Route path='*' element={<Page404></Page404>}> </Route>

      </Routes>
      <ToastContainer autoClose={2500} pauseOnHover={false} />
    </BrowserRouter>
    </DndProvider>

  );
}

export default App;
