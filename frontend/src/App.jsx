import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ROLES from "./utils/roles";

import PrivateRoute from "./components/common/PrivateRoute";
import PaymentIntegration from "./components/reservation/PaymentIntegration";
import OurServices from "./pages/OurServices";

const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const LesseeLayout = lazy(() => import("./components/common/LesseeLayout"));
const LessorLayout = lazy(() => import("./components/common/LessorLayout"));
const Layout = lazy(() => import("./components/common/Layout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const SuccessPayment = lazy(() => import("./components/reservation/SuccessPayment"));
const CanceledPayment = lazy(() => import("./components/reservation/CanceledPayment"));

const App = () => {
  return (
    <>
      {/* <Backdrop /> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route index element={<LandingPage/>} />
          <Route path="/success" element={<SuccessPayment />} />
          <Route path="/canceled" element={<CanceledPayment />} />
          <Route path="/checkout" element={<PaymentIntegration><CheckoutPage /></PaymentIntegration>} />

          {/* lessee routes */}
          <Route
            path="lessee"
            element={
              <PrivateRoute element={<LesseeLayout />} allowed={ROLES.lessee} />
            }
          >
            <Route index element={<HomePage />} />
            
          </Route>

          {/* lessor routes */}
          <Route
            path="lessor"
            element={
              <PrivateRoute element={<LessorLayout />} allowed={ROLES.lessor} />
            }
          >
            <Route index element={<HomePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
