import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./layouts/layout";
import HomePage from "./pages/home-page";
import AuthCallbackPage from "./pages/auth-callback-page";
import SearchPage from "./pages/search-page";
import UserProfilePage from "./pages/user-profile-page";
import ProtectedRoute from "./auth/protected-route";
import ManageRestaurantPage from "./pages/manage-restaurant-page";
import RestaurantDetailPage from "./pages/restaurant-detail-page";
import OrderStatusPage from "./pages/order-status-page";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHeroImage>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route
        path="/search/:city"
        element={
          <Layout showHeroImage={false}>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/detail/:restaurantId"
        element={
          <Layout showHeroImage={false}>
            <RestaurantDetailPage />
          </Layout>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/order-status"
          element={
            <Layout>
              <OrderStatusPage />
            </Layout>
          }
        />
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestaurantPage />
            </Layout>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
