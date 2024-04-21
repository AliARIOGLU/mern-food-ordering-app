import { ORDER_STATUS } from "@/constants/order-status";
import { Order } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getExpectedDelivery = (order: Order) => {
  const created = new Date(order.createdAt);

  created.setMinutes(
    created.getMinutes() + order.restaurant.estimatedDeliveryTime
  );

  const hours = created.getHours();
  const minutes = created.getMinutes();

  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${paddedMinutes}`;
};

export const getOrderStatusInfo = (order: Order) => {
  return ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0];
};

export const getOrderTime = (order: Order) => {
  const orderDateTime = new Date(order.createdAt);

  const hours = orderDateTime.getHours();
  const minutes = orderDateTime.getMinutes();

  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${paddedMinutes}`;
};
