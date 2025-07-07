import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./pages/UserAccount/login";
import PasswordChange from "./pages/UserAccount/passwordChange";
import {
  Dashboard,
  Team,
  Invoices,
  Contacts,
  Form,
  Bar,
  Line,
  Pie,
  FAQ,
  Geography,
  Calendar,
  Stream,
  Rentals,
  Maintenance,
  Tenants,
  Apartments,
  Inspections,
  TenantOnboarding,
  LeaseAgreement,
  AccessControl,
  SuccessPayment,
  CancelledPayment,
  
} from "./scenes";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/form" element={<Form />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/stream" element={<Stream />} />
          <Route path="/line" element={<Line />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/geography" element={<Geography />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/apartments" element={<Apartments />} />
          <Route path="/inspections" element={<Inspections/>}/>
          <Route path="/tenantOnboarding" element={<TenantOnboarding />} />
          <Route path="/leaseAgreement" element={<LeaseAgreement />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/passwordChange" element={<PasswordChange/>} />
          <Route path="/accessControl" element={<AccessControl />} />
          <Route path="/successPayment" element={<SuccessPayment/>} />
          <Route path="/cancelledPayment" element={<CancelledPayment/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
