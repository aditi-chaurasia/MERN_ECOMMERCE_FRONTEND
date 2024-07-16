import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/Faq';
import Pagenotfound from './pages/Pagenotfound';
import Register from '../src/pages/Auth/Register'
import Login from '../src/pages/Auth/Login'
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './components/Layout/Routes/Private';
import Dashboard from './pages/User/Dashboard';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoute from './components/Layout/Routes/AdminRoute';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Order from './pages/User/Order';
import Profile from './pages/User/Profile';
import Product from './pages/Admin/Product';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './components/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct'
import CartPage from './pages/CartPage';

function App() {
  return (
    <>
    <Toaster />
       <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/product/:slug' element={<ProductDetails/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/category/:slug' element={<CategoryProduct/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path ='/dashboard' element ={<PrivateRoute/>}>
            <Route path='user' element={<Dashboard/>}/>
            <Route path='user/orders' element={<Order/>}/>
            <Route path='user/profile' element={<Profile/>}/>
        </Route>
        <Route path ='/dashboard' element ={<AdminRoute/>}>
            <Route path='admin' element={<AdminDashboard/>}/>
            <Route path = "admin/create-category" element={<CreateCategory/>}/>
            <Route path = "admin/create-product" element={<CreateProduct/>}/>
            <Route path = "admin/products" element={<Product/>}/>
            <Route path = "admin/user" element={<Users/>}/>
            <Route path = "admin/product/:slug" element={<UpdateProduct/>}/>

        </Route>


        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/faq' element={<FAQ/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/*' element={<Pagenotfound/>}/>
        </Routes> 
        
    </>
  );
}

export default App;
