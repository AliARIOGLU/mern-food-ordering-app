import { ManageRestaurantForm } from "@/forms/manage-restaurant-form";
import {
  useCreateRestaurant,
  useGetRestaurant,
} from "@/lib/api/restaurant-api";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading } = useCreateRestaurant();
  const { restaurant } = useGetRestaurant();

  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={createRestaurant}
      isLoading={isLoading}
    />
  );
};

export default ManageRestaurantPage;
