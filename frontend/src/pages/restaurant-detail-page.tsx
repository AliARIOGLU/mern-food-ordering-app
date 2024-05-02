import { useState } from "react";
import { useParams } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { CartItem } from "@/types";
import { MenuItem } from "@/components/menu-item";
import { RestaurantInfo } from "@/components/restaurant-info";
import { useGetRestaurantDetail } from "@/lib/api/restaurant-api";
import { Card, CardFooter } from "@/components/ui/card";
import { OrderSummary } from "@/components/order-summary";
import { MenuItem as MenuItemType } from "@/types";
import { CheckoutButton } from "@/components/checkout-button";
import { UserFormData } from "@/forms/user-profile-form";
import { useCreateCheckoutSession } from "@/lib/api/order-api";
import { LoadingScreen } from "@/components/loading-screen";

const RestaurantDetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurantDetail, isLoading } = useGetRestaurantDetail(restaurantId);
  const { createCheckoutSession, isLoading: isCreateCheckoutSessionLoading } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(
    JSON.parse(sessionStorage.getItem(`cartItems-${restaurantId}`)!) ?? []
  );

  if (isLoading) {
    return <LoadingScreen isLoading />;
  }

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems: CartItem[] = [];

      if (existingItem) {
        updatedCartItems = prevItems.map((cartItem) => {
          if (cartItem._id === menuItem._id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
      } else {
        updatedCartItems = [
          ...prevItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (menuItem: MenuItemType) => {
    setCartItems((prevItems) => {
      const updatedCartItems = prevItems.filter(
        (cartItem) => cartItem._id !== menuItem._id
      );

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  const increaseQuantity = (id: string) => {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem._id === id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem._id === id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurantDetail) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurantDetail._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  return (
    <>
      {restaurantDetail && (
        <div className="flex flex-col gap-10">
          <AspectRatio ratio={16 / 5}>
            <img
              src={restaurantDetail.imageUrl}
              className="rounded-md w-full h-full object-cover"
            />
          </AspectRatio>
          <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
            <div className="flex flex-col gap-4">
              <RestaurantInfo restaurant={restaurantDetail} />
              <span className="text-2xl font-bold tracking-tight">Menu</span>
              {restaurantDetail.menuItems.map((menuItem) => (
                <MenuItem
                  key={menuItem._id}
                  menuItem={menuItem}
                  addToCart={() => addToCart(menuItem)}
                />
              ))}
            </div>

            <div>
              <Card>
                <OrderSummary
                  restaurant={restaurantDetail}
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                />
                <CardFooter>
                  <CheckoutButton
                    onCheckout={onCheckout}
                    disabled={cartItems.length === 0}
                    isLoading={isCreateCheckoutSessionLoading}
                  />
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantDetailPage;
