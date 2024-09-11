import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/user/Home';
import Login from './pages/user/Login';
import Deals from './pages/user/Deals';
import MyDeals from './pages/user/MyDeals';
import AdminLogin from './pages/admin/Login';
import AdminDeals from './pages/admin/Deals';
import Register from './pages/user/Register';
import DealsDO from './pages/dealOwner/Deals';
import MyProfile from './pages/user/MyProfile';
import MicroBlogs from './pages/user/MicroBlogs';
import Categories from './pages/admin/Categories';
import Payments from './pages/dealOwner/Payments';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DealDetails from './pages/user/DealDetails';
import Dashboard from './pages/dealOwner/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import StudentEmail from './pages/user/StudentEmail';
import DealOwnerLogin from './pages/dealOwner/Login';
import AdminOwnedDeals from './pages/admin/AdminDeals';
import AdminMicroBlogs from './pages/admin/MicroBlogs';
import AffiliateLinks from './pages/admin/AffiliateLinks';
import DoDealDetails from './pages/dealOwner/DealDetails';
import CreateMicroBlog from './pages/user/CreateMicroBlog';
import DealOwnerRegister from './pages/dealOwner/Register';
import ResetPassword from './pages/user/auth/ResetPassword';
import TermsAndConditions from './pages/TermsAndConditions';
import MicroBlogDetails from './pages/user/MicroBlogDetails';
import EmailUsToVerify from './pages/user/auth/EmailUsToVerify';
import ConfirmStudentEmail from './pages/user/ConfirmStudentEmail';
import PaymentStatus from './pages/dealOwner/payment/PaymentStatus';
import PaymentDetails from './pages/dealOwner/payment/PaymentDetails';
import ForgotPasswordForm from './pages/user/auth/ForgotPasswordForm';
import StudentEmailConfirmed from './pages/user/auth/StudentEmailConfirmed';
import StudentPlacements from './pages/user/StudentPlacements';

import PageNotFound from './pages/PageNotFound';

const App = () => {
  const routes = [
    { path: '/', component: <Home /> },
    { path: '/deals', component: <Deals /> },
    { path: '/login', component: <Login /> },
    { path: '/register', component: <Register /> },
    { path: '/deals/:id', component: <DealDetails /> },
    { path: '/student-email/:id', component: <StudentEmail /> },
    { path: '/student-email-confirmed', component: <StudentEmailConfirmed/> },
    { path: '/email-us-to-verify/:id', component: <EmailUsToVerify/>},
    { path: '/confirm-student-email/:id', component: <ConfirmStudentEmail /> },
    { path: '/micro-blogs', component: <MicroBlogs /> },
    { path: '/micro-blogs/:id', component: <MicroBlogDetails /> },
    { path: '/micro-blogs/create', component: <CreateMicroBlog /> },
    { path: '/forgot-password', component: <ForgotPasswordForm /> },
    { path: '/reset-password/:token', component: <ResetPassword /> },
    { path: '/terms-and-conditions', component: <TermsAndConditions /> },
    { path: '/privacy', component: <PrivacyPolicy /> },
    { path: '/my-profile', component: <MyProfile /> },
    { path: '/my-deals', component: <MyDeals /> },
    { path: '/student-placements', component: <StudentPlacements/> },
    
    // { path: '/do/payment/cancel', component: <Cancel /> },
    // { path: '/do/payment/success', component: <Success /> },
    { path: '/do', component: <Dashboard /> },
    { path: '/do/deals', component: <DealsDO /> },
    { path: '/do/payments', component: <Payments /> },
    { path: '/do/login', component: <DealOwnerLogin /> },
    { path: '/do/payment/status', component: <PaymentStatus /> },
    { path: '/do/register', component: <DealOwnerRegister /> },
    { path: '/do/payment-details', component: <PaymentDetails /> },
    { path: '/do/deal-details/:id', component: <DoDealDetails /> },

    { path: '/admin/login', component: <AdminLogin /> },
    { path: '/admin/deals', component: <AdminDeals /> },
    { path: '/admin/categories', component: <Categories /> },
    { path: '/admin/dashboard', component: <AdminDashboard /> },
    { path: '/admin-owned/deals', component: <AdminOwnedDeals /> },
    { path: '/admin/micro-blogs', component: <AdminMicroBlogs /> },
    { path: '/admin/affiliate-links', component: <AffiliateLinks /> },

    { path: '/*', component: <PageNotFound /> }, //must be last object
  ];

  return (
    <>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                exact
                path={route.path}
                element={route.component}
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;