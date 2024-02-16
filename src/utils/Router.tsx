import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { STATIC_ROUTES } from "utils/constants";

// pages
import Layout from "components/Layout/Layout";
import SignUp from "pages/SignUp/SignUp";
import Home from "pages/Home/Home";
import EventForm from "pages/EventForms/EventForm";
import EditEventForm from "pages/EventForms/EditEventForm";
import ForgotPasswordForm from "pages/ForgotPassword/ForgotPasswordForm/ForgotPasswordForm";
import ForgotPasswordReset from "pages/ForgotPassword/ForgotPasswordReset/ForgotPasswordReset";
import Requests from "pages/Requests/Requests";
import Login from "pages/Login/Login";
import ChangePassword from "pages/ChangePassword/ChangePassword";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";
import ViewEvent from "pages/ViewEvent/ViewEvent";
import MyProfile from "pages/MyProfile/MyProfile";
import MyEvents from "pages/MyEvents/MyEvents";
import AdminPanel from "pages/AdminPanel/AdminPanel";
import ModalContextWrapper from "./ModalContextWrapper";

const Router = () => {
  return (
    <BrowserRouter>
      <ModalContextWrapper>
        <Routes>
          <Route path={STATIC_ROUTES.signup} element={<SignUp />} />
          <Route path={STATIC_ROUTES.login} element={<Login />} />
          <Route
            path={STATIC_ROUTES.forgotPassword}
            element={<ForgotPasswordForm />}
          />
          <Route
            path={`${STATIC_ROUTES.resetPassword}/:token`}
            element={<ForgotPasswordReset />}
          />

          <Route
            path={STATIC_ROUTES.home}
            element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path={`${STATIC_ROUTES.viewEvent}/:eventId`}
            element={
              <ProtectedRoute>
                <Layout>
                  <ViewEvent />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path={STATIC_ROUTES.changePassword}
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path={STATIC_ROUTES.createEvent}
            element={
              <ProtectedRoute>
                <Layout>
                  <EventForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path={`${STATIC_ROUTES.editEvent}/:eventId`}
            element={
              <ProtectedRoute>
                <Layout>
                  <EditEventForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path={`${STATIC_ROUTES.requests}`}
            element={
              <ProtectedRoute isRoleProtected>
                <Layout>
                  <Requests />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path={STATIC_ROUTES.adminPanel}
            element={
              <ProtectedRoute isRoleProtected>
                <Layout>
                  <AdminPanel />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path={STATIC_ROUTES.myProfile}
            element={
              <ProtectedRoute>
                <Layout>
                  <MyProfile />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path={STATIC_ROUTES.myEvents}
            element={
              <ProtectedRoute>
                <Layout>
                  <MyEvents />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer
          position="bottom-right"
          newestOnTop
          limit={2}
          autoClose={2000}
        />
      </ModalContextWrapper>
    </BrowserRouter>
  );
};
export default Router;
