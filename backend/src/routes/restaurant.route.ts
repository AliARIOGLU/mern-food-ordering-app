import express from "express";

import restaurantController from "../controllers/restaurant-controller";
import { validateRestaurantCityParameter } from "../middleware/validation";

const router = express.Router();

router.get(
  "/search/:city",
  validateRestaurantCityParameter,
  restaurantController.searchRestaurants
);

export default router;
