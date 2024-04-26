import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ROLES from "./utils/roles";
import PrivateRoute from "./components/common/PrivateRoute";


const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const LesseeLayout = lazy(() => import("./components/common/LesseeLayout"));
const LessorLayout = lazy(() => import("./components/common/LessorLayout"));
const Layout = lazy(() => import("./components/common/Layout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const PropertyPage = lazy(() => import("./pages/PropertyPage"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const OurServicesPage = lazy(() => import("./pages/OurServicesPage"));
const SuccessPayment = lazy(() => import("./components/reservation/SuccessPayment"));
const FavoritePropertiesPage = lazy(() => import("./pages/FavoritePropertiesPage"));
const BookingHistoryPage = lazy(() => import("./pages/BookingHistoryPage"));
const MainInfosPage = lazy(() => import("./pages/MainInfospage"));
const PointSystemPage = lazy(() => import("./pages/PointSystemPage"));
const BManagementPage = lazy(() => import("./pages/BManagementPage"));
const PManagementPage = lazy(() => import("./pages/PManagementPage"));
const AddListingPage = lazy(() => import("./pages/AddListingPage"));

const App = () => {
  return (
    <>
      {/* <Backdrop /> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route index element={<LandingPage/>} />
          <Route path="/services" element={<OurServicesPage/>} />
          <Route path="/sl" element={<HomePage />} />
          <Route path="/property/:propID" element={<PropertyPage/>} />
          <Route path="/ac" element={<BManagementPage/>} />
          <Route path="/ad" element={<PManagementPage/>} />
          <Route path="/ae" element={<AddListingPage/>} />

         
          {/* lessee routes */}
          <Route
            element={
              <PrivateRoute element={<LesseeLayout />} allowed={ROLES.lessee} />
            }
          >
            <Route path="/favourite" element={<FavoritePropertiesPage/>}/>
            <Route path="/history" element={<BookingHistoryPage/>}/>
            <Route path="/info" element={<MainInfosPage/>}/>

            <Route path="/success" element={<SuccessPayment />} />
            {/* <Route path="/canceled" element={<CanceledPayment />} /> */}
            {/* <Route path="/checkout" element={<PaymentIntegration><CheckoutPage /></PaymentIntegration>} /> */}

            
          </Route>

          {/* lessor routes */}
          <Route
            element={
              <PrivateRoute element={<LessorLayout />} allowed={ROLES.lessor} />
            }
          >
            <Route path="/ab" element={<PointSystemPage/>} />

            {/* <Route index element={<HomePage />} /> */}
            {/* <Route path="/history" element={<BookingHistoryPage/>}/> */}

          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
