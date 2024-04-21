import { Trash } from "lucide-react";

import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { CartItem, Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";

type OrderSummaryProps = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

export const OrderSummary = ({
  restaurant,
  cartItems,
  removeFromCart,
}: OrderSummaryProps) => {
  const getTotalCost = () => {
    const totalInPence = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalWithDelivery = totalInPence + restaurant.deliveryPrice;

    return (totalWithDelivery / 100).toFixed(2);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>£{getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((cartItem) => (
          <div key={cartItem._id} className="flex justify-between">
            <span>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
            <span className="flex items-center gap-1">
              <Trash
                className="cursor-pointer"
                color="red"
                size={20}
                onClick={() => removeFromCart(cartItem)}
              />
              £{((cartItem.price * cartItem.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>£{(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};