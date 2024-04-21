import { ManageRestaurantForm } from "@/forms/manage-restaurant-form";
import {
  useCreateRestaurant,
  useGetMyRestaurantOrders,
  useGetRestaurant,
  useUpdateRestaurant,
} from "@/lib/api/my-restaurant-api";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { OrderItemCard } from "@/components/order-item-card";

const ManageRestaurantPage = () => {
  const { restaurant } = useGetRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateRestaurant();
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateRestaurant();
  const { myRestaurantOrders } = useGetMyRestaurantOrders();

  const isEditing = !!restaurant;

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">
          {myRestaurantOrders?.length} active orders
        </h2>
        {myRestaurantOrders?.map((order) => (
          <OrderItemCard order={order} key={order._id} />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;
