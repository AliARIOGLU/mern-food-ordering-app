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
import HomeLayout from "./layouts/home-layout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route element={<Layout />}>
        <Route path="/search/:city" element={<SearchPage />} />
        <Route
          path="/detail/:restaurantId"
          element={<RestaurantDetailPage />}
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/order-status" element={<OrderStatusPage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
          <Route path="/manage-restaurant" element={<ManageRestaurantPage />} />
        </Route>
      </Route>
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
