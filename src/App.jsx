// App.jsx
import React, { Suspense, lazy, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./components/AuthProvider";

const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/register/Register"));
const Emailconfirm = lazy(() => import("./pages/emailConfirm/Emailconfirm"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Page404 = lazy(() => import("./pages/page404/Page404"));
const Userprofile = lazy(() => import("./pages/userprofile/Userprofile"));
const Plants = lazy(() => import("./pages/plants/Plants"));
const PlantDetail = lazy(() => import("./pages/plants/PlantDetails"));
const Soilphmodal = lazy(() => import("./components/modal/Soilphmodal"));
const Humiditymodal = lazy(() => import("./components/modal/Humiditymodal"));
const Nutrientlevel = lazy(() => import("./components/modal/Nutrientlevel"));

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Or a better loading indicator
  }

  return user ? children : <Navigate to='/' />;
};

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/confirm-mail' element={<Emailconfirm />} />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path='/userprofile'
            element={
              <PrivateRoute>
                <Userprofile />
              </PrivateRoute>
            }
          />
          <Route
            path='/plants'
            element={
              <PrivateRoute>
                <Plants />
              </PrivateRoute>
            }
          />
          <Route
            path='/plants/:id'
            element={
              <PrivateRoute>
                <PlantDetail />
              </PrivateRoute>
            }
          />
          <Route
            path='/soilphlevel'
            element={
              <PrivateRoute>
                <Soilphmodal />
              </PrivateRoute>
            }
          />
          <Route
            path='/humidity'
            element={
              <PrivateRoute>
                <Humiditymodal />
              </PrivateRoute>
            }
          />
          <Route
            path='/nutrientlevel'
            element={
              <PrivateRoute>
                <Nutrientlevel />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
