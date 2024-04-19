import { ManageRestaurantForm } from "@/forms/manage-restaurant-form";
import {
  useCreateRestaurant,
  useGetRestaurant,
  useUpdateRestaurant,
} from "@/lib/api/restaurant-api";

const ManageRestaurantPage = () => {
  const { restaurant } = useGetRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateRestaurant();
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateRestaurant();

  const isEditing = !!restaurant;

  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
    />
  );
};

export default ManageRestaurantPage;
