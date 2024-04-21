import express from "express";

import restaurantController from "../controllers/restaurant-controller";
import {
  validateRestaurantCityParameter,
  validateRestaurantIdParameter,
} from "../middleware/validation";

const router = express.Router();

router.get(
  "/:restaurantId",
  validateRestaurantIdParameter,
  restaurantController.getRestaurant
);

router.get(
  "/search/:city",
  validateRestaurantCityParameter,
  restaurantController.searchRestaurants
);

export default router;
