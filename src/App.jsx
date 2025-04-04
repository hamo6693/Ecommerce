
import './App.css'
import { Route, Routes } from "react-router-dom";
import AuthLayout from './components/auth/layout';
import AdminLayout from './components/admin-view/layout';
import AdminDashboard from './pages/admin-view/dashboard';
import AdminOrders from './pages/admin-view/orders';
import AdminProducts from './pages/admin-view/products';
import ShoppingLayput from './components/shopping-view/layout';
import NotFound from './pages/not-found';
import ShoppingHome from './pages/shopping-view/home';
import ShoppingListing from './pages/shopping-view/listing';
import ShoppingCheckOut from './pages/shopping-view/checkout';
import ShoppingAccount from './pages/shopping-view/account';
import CheckAuth from './components/common/check-auth';
import UnauthPage from './pages/unauth-page';
import AuthLogin from './pages/auth/login';
import AuthRegister from './pages/auth/register';
import {  useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './srore/auth-slice';
import { useEffect } from 'react';
import PaypalReturnPage from './pages/shopping-view/paypal-return';
import PaymentSuccessPage from './pages/shopping-view/payment-success';
import Search from './pages/shopping-view/search';

function App() {
  const dispatch = useDispatch();



  const { user, isAuthenticated } = useSelector(
    (state) => state.auth) ;
  console.log(isAuthenticated);
  

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
  
        <div className="flex flex-col overflow-hidden bg-white">
          <Routes>
            <Route path='/' element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout/>
              </CheckAuth>
            }>
            <Route path='login'element={<AuthLogin/>}/>
            <Route path='register'element={<AuthRegister/>}/>
            </Route>


            <Route path='/admin' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}> 
              <AdminLayout/>
            </CheckAuth>}>

            <Route path='dashboard' element={<AdminDashboard/>}/>
            <Route path='orders' element={<AdminOrders/>}/>
            <Route path='products' element={<AdminProducts/>}/>
            </Route>


            <Route path='/shop'
             element={
             <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayput/>
            </CheckAuth>}>

            <Route path='home' element={<ShoppingHome/>}/>
            <Route path='listing' element={<ShoppingListing/>}/>
            <Route path='checkout' element={<ShoppingCheckOut/>}/>
            <Route path='account' element={<ShoppingAccount/>}/>

            <Route path='paypal-return' element={<PaypalReturnPage />}/>
            <Route path='paypal-success' element={<PaymentSuccessPage />}/>
            <Route path='search' element={<Search />}/>

            

                        

           
            </Route>


            <Route path='*' element={<NotFound/>} />
            <Route path='/unauth-page' element={<UnauthPage/>} />
          
            
          </Routes>
        </div>
  )
}

export default App
