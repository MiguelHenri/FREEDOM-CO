import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout.jsx';
import MainPage from './pages/MainPage.jsx';
import NotFound from './pages/NotFound.jsx';
import Pants from './pages/Store/Pants.jsx';
import Tees from './pages/Store/Tees.jsx';
import Accessories from './pages/Store/Accessories.jsx';
import ItemPage from './pages/Store/ItemPage.jsx';
import Profile from './pages/User/Profile.jsx';
import Cart from './pages/User/Cart.jsx';
import Login from './pages/User/Login.jsx';
import axios from 'axios';
import AdminMenu from './pages/Admin/AdminMenu.jsx';
import CreateProduct from './pages/Admin/CreateProduct.jsx';
import DeleteProduct from './pages/Admin/DeleteProduct.jsx';
import Store from './pages/Store/Store.jsx';
import Signup from './pages/User/Signup.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import NotLogged from './components/NotLogged.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import Checkout from './pages/User/Checkout.jsx';

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
        <Route path='store' element={<Store/>}/>
        <Route path='store/:id' element={<ItemPage/>}/>

        <Route path='login' element={
          <NotLogged>
            <Login/>
          </NotLogged>
        }/>
        <Route path='signup' element={
          <NotLogged>
            <Signup/>
          </NotLogged>
        }/>
      </Route>

      <Route path='/' element={
        <ProtectedRoute>
          <Layout/>
        </ProtectedRoute>
      }>
        <Route path='profile' element={<Profile/>}/>
        <Route path='cart' element={<Cart/>}/>
        <Route path='checkout' element={<Checkout/>}/>
      </Route>

      <Route path='/admin' element={
        <AdminRoute>
          <Layout/>
        </AdminRoute>
      }>
        <Route index element={<AdminMenu/>}/>
        <Route path='create' element={<CreateProduct/>}/>
        <Route path='delete' element={<DeleteProduct/>}/>
      </Route>
      
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
