import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout.jsx';
import MainPage from './pages/MainPage.jsx';
import NotFound from './pages/NotFound.jsx';
import Pants from './pages/Pants.jsx';
import Tees from './pages/Tees.jsx';
import Accessories from './pages/Accessories.jsx';
import ItemPage from './pages/ItemPage.jsx';
import Profile from './pages/Profile.jsx';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';
import axios from 'axios';
import AdminMenu from './pages/Admin/AdminMenu.jsx';
import CreateProduct from './pages/Admin/CreateProduct.jsx';

if (import.meta.env.VITE_BACKEND_URL)
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
else
  console.error("No AXIOS Url for connection found!")

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<MainPage/>}/>
        <Route path='tees' element={<Tees/>}/>
        <Route path='pants' element={<Pants/>}/>
        <Route path='accessories' element={<Accessories/>}/>
        <Route path='store/:id' element={<ItemPage/>}/>
        <Route path='profile' element={<Profile/>}/>
        <Route path='cart' element={<Cart/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='admin' element={<AdminMenu/>}/>
        <Route path='admin/create' element={<CreateProduct/>}/>
      </Route>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
